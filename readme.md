# Add Google Meet to events created via Apple Calendar

Events created via Apple Calendar – using a Google Workspace or Gmail account - do not include Google Meet link for video conferences (apparently due to a [change in Google Calendar API](https://www.reddit.com/r/gsuite/comments/lnimfi/automatically_adding_google_meet_invite_to_apple/)).

This is a Google Script that runs in the background, checks for new events with attendees and adds Google Meet if no other video conference option is available.

How to:

- Go to https://script.google.com/home
- New Project
- Copy/Paste code and run
- Create a Trigger -> `From calendar` - `Calendar updated` [Doc](https://developers.google.com/apps-script/guides/triggers/installable#managing_triggers_manually)
