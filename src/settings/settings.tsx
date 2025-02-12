import {Devvit} from "@devvit/public-api";

const addSettings = () => {
    Devvit.addSettings([
        // Selection for Whitelist, Blacklist, or Both
        {
            type: 'select',
            name: 'list-preference',
            defaultValue: ['whitelist'], // Default option
            label: 'List Preference',
            helpText: 'Choose whether to use the whitelist, blacklist, or both.',
            options: [
                {label: 'Whitelist', value: 'whitelist'},
                {label: 'Blacklist', value: 'blacklist'},
                {label: 'Both', value: 'both'},
            ],
        },
        // Whitelist Settings
        {
            type: 'group',
            label: 'Whitelist',
            helpText: 'Posts on which the bot will act on.',
            fields: [
                {
                    type: 'string',
                    name: 'wl-title-regex',
                    label: 'Title Regex',
                    helpText: 'Regex pattern for titles to include in the whitelist.',
                    onValidate: (event) => validateRegex(event.value),
                },
                {
                    type: 'boolean',
                    name: 'wl-body-link',
                    label: 'Post body contains a link?',
                    helpText: 'Enable to require a link in the post body.',
                },
                {
                    type: 'paragraph',
                    name: 'wl-flairs',
                    label: 'Flairs',
                    helpText: 'Comma-separated flairs to whitelist (e.g., "Discussion, Announcement").',
                    onValidate: (event) => validateCommaSeparatedList(event.value),
                },
            ],
        },
        // Blacklist Settings
        {
            type: 'group',
            label: 'Blacklist',
            helpText: 'Posts on which the bot will NOT act on.',
            fields: [
                {
                    type: 'string',
                    name: 'bl-title-regex',
                    label: 'Title Regex',
                    helpText: 'Regex pattern for titles to exclude in the blacklist.',
                    onValidate: (event) => validateRegex(event.value),
                },
                {
                    type: 'boolean',
                    name: 'bl-body-link',
                    label: 'Post body contains a link?',
                    helpText: 'Enable to exclude posts with a link in the body.',
                },
                {
                    type: 'paragraph',
                    name: 'bl-flairs',
                    label: 'Flairs',
                    helpText: 'Comma-separated flairs to blacklist (e.g., "Meme, Off-topic").',
                    onValidate: (event) => validateCommaSeparatedList(event.value),
                },
            ],
        },
        {
            type: 'group',
            label: 'Reminder Comment',
            helpText: 'Settings for the reminder comment sent to the user.',
            fields: [
                {
                    type: 'boolean',
                    name: 'reminder-enable',
                    label: 'Enable Reminder?',
                    helpText: 'Enable to send a reminder comment if no link is provided.',
                },
                {
                    type: 'number',
                    name: 'reminder-delay',
                    label: 'Reminder Delay (minutes)',
                    helpText: 'Time (in minutes) to wait before sending the reminder.',
                    onValidate: (event) => {
                        if (event.value && event.value < 1) return 'Reminder delay must be a positive number.';
                    },
                },
                {
                    type: 'paragraph',
                    name: 'reminder-message',
                    label: 'Custom Reminder Message',
                    helpText: 'The message to send as a reminder (e.g., "Please add a link to your post.").',
                },
            ],
        },

        {
            type: 'group',
            label: 'Comment Requirements',
            helpText: 'Configure rules for comment requirements.',
            fields: [
                {
                    type: 'boolean',
                    name: 'accept-any-comment',
                    label: 'Accept Any Comment?',
                    helpText: 'Enable this to bypass all comment requirements and accept any comment.',
                },
                {
                    type: 'string',
                    name: 'comment-body-regex',
                    label: 'Comment Body Regex',
                    helpText: 'Regex pattern that comment bodies must match. Ignored if "Accept Any Comment" is enabled.',
                    onValidate: (event) => validateRegex(event.value), // Ensure valid regex
                },
                {
                    type: 'boolean',
                    name: 'comment-body-link',
                    label: 'Require a Link in Comment Body?',
                    helpText: 'Enable to enforce the presence of a link in comment bodies. Ignored if "Accept Any Comment" is enabled.',
                },
            ],
        },
        // Action to Take if No Link
        {
            type: 'group',
            label: 'Action on Missing Link',
            helpText: 'Settings for the action to take if no link is added.',
            fields: [
                {
                    type: 'select',
                    name: 'missing-link-action',
                    label: 'Action to Take',
                    helpText: 'Choose the action to take if no link is added.',
                    options: [
                        {label: 'Do Nothing', value: 'do_nothing'},
                        {label: 'Report Post', value: 'report'},
                    ],
                },
                {
                    type: 'number',
                    name: 'missing-link-delay',
                    label: 'Action Delay (minutes)',
                    helpText: 'Time (in minutes) to wait before taking the action.',
                    onValidate: (event) => {
                        if (event.value && event.value < 1) return 'Action delay must be a positive number.';
                    },
                },
            ],
        },
    ]);
}

/**
 * Check the correctness of a Regex pattern.
 */
function validateRegex(value: string | undefined) {
    const input = value ?? ""; // If value is undefined, use an empty string
    try {
        new RegExp(input); // Test the regex pattern
    } catch {
        return 'Invalid regex pattern.';
    }
}

/**
 * Check the correctness of a comma-seperated list of strings.
 */
function validateCommaSeparatedList(value: string | undefined) {
    const input = value ?? ""; // If value is undefined, use an empty string

    if (input && !/^[^,]+(,[^,]+)*$/.test(input)) {
        return 'Invalid format. Values must be comma-separated (e.g., "Value1, Value2").';
    }
}

export { addSettings };