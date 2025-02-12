import { JobContext } from "@devvit/public-api";
import { checkComments, checkPost } from "../list_check/list_check.js";
import { getCommentIgnorePreference, getCommentSettings } from "../settings/getters.js";
import { DateTime } from "ts-luxon";

/**
 * Send a reminder comment,
 * - check if the post still matches the requirements and no comments that match the comment requirements have been made.
 * - schedule a reminder removal if needed.
 */
export async function sendReminder(context: JobContext, postId: string, removeDelay: number, message: string,
                                   rawOptions: string[], userFlairText: string, userFlairID: string): Promise<void> {
	console.log("Processing reminder...");

	const startTime = performance.now()
	const post = await context.reddit.getPostById(postId.toString());

	// Check if the post still matches the requirements and no comments that match the comment requirements have been made.
	if (!(await checkPost(context, post, userFlairText, userFlairID)) || await checkComments(context, post,
		await getCommentSettings(context), await getCommentIgnorePreference(context))) {
		return;
	}

	const endTime = performance.now()
	console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

	console.log("Sending reminder...");

	const comment = await post.addComment({
		text: message
	});

	// Get comment mod options, lock by default
	const options = rawOptions;
	await comment.lock();

	// Set mod options
	if (options.length > 0) {
		if (options.includes("sticky")) {
			await comment.distinguish(true);
		} else if (options.includes("distinguish")) {
			await comment.distinguish(false);
		}
	}

	// Auto-remove reminder
	if (removeDelay > 0) {
		const now = DateTime.now();

		const jobId = await context.scheduler.runJob({
			name: "reminder-removal", data: {
				commentID: comment.id.toString()
			}, runAt: now.plus({minutes: removeDelay}).toJSDate()
		});
	}
}