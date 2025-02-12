# Link Navi

Have you ever had to remind someone to make a comment under their post and
then check if they have actually done it? No? - well, this is an app that
does just that, as niche as it is.

[post_requirements]: https://i.imgur.com/3nPelHo.png

[comment_requirements]: https://i.imgur.com/Gbne9aN.png

[reminder]: https://i.imgur.com/c9SNuPe.png

[action]: https://i.imgur.com/vhSqUFU.png

# What's New?

### New Post Requirements: Post Body Regex

You can now set a post body Regex requirements for the White/Black lists.

### Reminder Comment Delay Fix

It seems that tasks (reminders, reminder removals, actions) with short 
delays (under 10-15 minutes) can sometimes fail to execute. This might not 
be an issue for smaller/less active subreddits, but if you are experiencing 
problems, try a larger delay.

To somehow alleviate this, reminders with a delay of under 10 minutes will 
instead be sent immediately.

### Archive ModMail Option

If using the remove and notify via ModMail action, you can now set a toggle 
to automatically archive the conversation.

# How It Works?

In the simplest of terms, this app acts like a delayed AutoModerator rule
for comments - when a user makes a post, it waits a bit before checking if a
comment has been made - what posts the bot looks for and what the comment
should be can be configured in the settings of the app.

# Configuration

Currently, the app settings consist of roughly three sections:

1) What posts the app should (and shouldn't) act on?
2) What comment should be made in the post?
3) Should a reminder be sent to the OP to change their post or add a comment?
4) What should be done if the OP doesn't change their post or a comment
   isn't added?

## 1. Post Requirements (White and Black List)

![post_requirements]

The Whitelist lets you pick what posts you want the app to act on, the
Blacklist does the opposite - select what posts the app should ignore. You
can use either one, both or none if you want to disable the app.

Optionally, you can choose to ignore removed and or filtered posts. Deleted
posts are always ignored.

Currently, you can set:

- **a Regex pattern the post title must match.**
	- refer to your favourite Regex editor (e.g. https://regexr.com/).
- **a requirement for a link in the post body.**
	- This mainly applies to text posts that contain links - Link/Image posts
	  don't count.
	- Gallery/Multi-image posts are their own can of worms but long story
	  short, this also doesn't apply to the Caption and URL fields of those.
- **a requirement for a minimum/maximum post body length.**
- **a list of post flairs, one of which the post must have.**
	- Text or Flair Template ID
- **a list of user flairs, one of which the user must have.**
	- Text or Flair Template ID
	- Note that due to technical constraints, the user flair is checked
	  **only** once when the post is first created - unlike other
	  options, the app won't know if the user flair has been changed after a
	  reminder is given and/or before an action is taken.

## 2. Comment Requirements

![comment_requirements]

If a post matches the White/Blacklist, next the app would look for a comment
matching certain criteria before sending a reminder or doing an action as
described in the following sections.

Optionally, you can choose to ignore removed and or filtered comments.
Deleted comments are always ignored.

Currently, you can set:

- **a "check non-top-level comments" toggle if you want the app to check
  comments made in reply to top-leve-comments.**
- **a "check non-op comments" toggle if you want the app to check
  comments made by users other than the OP.**
	- An Ignore List of users can be given, with comments made by the app
	  being ignored by default.
- **an "accept all comments" overwrite that would tell the app to accept any
  comment, bypassing all comment requirements (except the above)**
- **a Regex pattern the comment body must match.**
- **a requirement for a link in the comment body.**

If such a comment is not found, the app is going to send a reminder comment
and/or take the given action.

## 3. Reminder Comment

![reminder]

You can use this feature if you want the app to make a comment to remind the
user to update their post or make a comment to match the requirements. The
app checks the post and comments both before scheduling the reminder and before
sending the comment. Reminders are locked by default.

Some placeholders have been implemented:

-
Most [AutoModerator placeholders](https://www.reddit.com/r/reddit.com/wiki/automoderator/full-documentation/)
have been added except media placeholders,
match placeholders and ``{{author_flair_template_id}}``.
- ``{{random}}`` can be used to choose a random value from multiple given
  ones.

Currently, you can set:

- **the delay before sending the reminder (in minutes).**
  - It seems that tasks (reminders, reminder removals, actions) with short 
delays (under 10-15 minutes) can sometimes fail to execute. This might not 
be an issue for smaller/less active subreddits, but if you are experiencing 
problems, try a larger delay. 
  - To somehow alleviate this, reminders with a delay of under 10 minutes 
    will instead be sent immediately.
- **the delay before removing the reminder (in minutes).**
- **the contents of the comment.**
- **whether the reminder should be stickied or/and distinguished.**

## 4. Action on Missing Link/Comment

![action]

Here you decide what the app should do if the OP doesn't update their posts
or a comment isn't made to match the requirements. The app checks the post and
comments both before scheduling the action and before executing it.

Currently, you can set:

- **the type of action you want the app to take.**
	- Report Post: a custom report reason can be given.
	- Change Post Flair: a flair template ID is required.
	- Remove Post: a name of a removal reason can be given, and the user can
	  be notified via a comment or modmail.
		- Some placeholders are supported: `{community_name}`,
		  `{community_link}`,
		  `{community_rules_url}`
		- `{community_description}` seems to be giving the Old Reddit sidebar
		  instead, which may be a bug.
- **the delay before taking the action (in minutes).**
  - It seems that tasks (reminders, reminder removals, actions) with short 
delays (under 10-15 minutes) can sometimes fail to execute. This might not 
be an issue for smaller/less active subreddits, but if you are experiencing 
problems, try a larger delay. 

The post will be reported instead if an invalid Flair Template ID or Removal
Reason Name is given.

# What's To Come 

At this point, the app does pretty much all I wanted it to do - the stuff
below are possible ideas that I feel are either *messy* to implement or
counterintuitive, but if it's something you need for your use case, let me know!

### Maybe at some point (let me know if you want any of these):

- **check the original post for crossposts**
- **check posts when updated**: currently, the app only checks newly-created
  posts, but it could be useful to let it checks that have been updated (new
  flair, body text, etc.) - it would take some extra work to make it happen,
  though, so I am keeping that shelved for the time being.
- **extract information from a comment and pin it/link to it in a thread**

# Feedback

You can contact me (u/EternalGreenX) if you have any feedback or suggestions.

# Changelog

* v0.1: Basic functionality implemented.
* v0.2: the "*getting there*" update:
	* Option to Disable the App
	* Option to Ignore Removed/Filtered Posts/Comments
	* New Post Requirement: Post Body Character Length and Flair ID
	* Reminder Placeholders
		* Most AutoModerator placeholders have been added except media
		  placeholders,
		  match placeholders and ``{{author_flair_template_id}}``.
		* ``{{random}}`` can be used to choose a random value from multiple
		  given
		  values.
	* Reminder Mod Options - reminders are locked by default, option
	  to set them as sticky/distinguished.
* v1.0: the "*big one*":
	* New Actions:
		* Change Flair (via flair template ID)
		* Remove (removal reason and notifying via comment or modmail)
		* Report (custom report reason)
	* Option to Check Non-Top-Level and Non-OP Comments
	* Reminder Auto-Removal
	* New Post Requirements: User Flair Text and ID
	* Regex Case Sensitivity: all Regex is now case-insensitive by default - a
	  toggle is provided for all Regex fields to change that behaviour.
* v1.1: the "*delayed*" update:
  * New Post Requirement: Post Body Regex
  * Reminder Comment Delay Fix: reminders with a delay of under 10 minutes will 
instead be sent immediately.
  * Archive ModMail Option