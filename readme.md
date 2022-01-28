# Add Google Meet to events created via Apple Calendar

Events created via Apple Calendar – using a Google Workspace or Gmail account - do not include Google Meet link for video conferences (apparently due to a [change in Google Calendar API](https://www.reddit.com/r/gsuite/comments/lnimfi/automatically_adding_google_meet_invite_to_apple/)).

This is a Google Script that runs in the background, checks for new events and adds Google Meet to new events without video conference option.

How to:

- Go to https://script.google.com/home
- New Project
- Copy/Paste code and run
