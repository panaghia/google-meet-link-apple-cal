# Add Google Meet to events created via Apple Calendar

If you love Apple Calendar and don’t want to give up to Google Calendar, there’s an easy way to automatically add Google Meet conference link to an event.

It requires to run a tiny Google Script. This runs in the background, checks for new events with attendees and adds Google Meet if no other video conference option is available.

Here’s how:

1. Go to https://script.google.com/home
2. New Project
3. Under "Services", add "Google Calendar API"
4. Copy/Paste code and run
4. Add a Trigger of type “Calendar” (more below)

**How to create a Trigger:**

In the Script editor, click the "Triggers" icon (it looks like a clock).

Click "Add Trigger" in the bottom right corner.

Configure the trigger with these settings:
- Choose which function to run: Select the function (checkForNewEvents)
- Choose which deployment should run: Head
- Events: Choose "From calendar"
- Which event: Choose "On event update" or "Calendar updated"
- Calendar to watch: Select the specific calendar you want to monitor for updates
- Failure notification settings: (Optional) Configure how you want to be notified if the script fails
Click "Save"
