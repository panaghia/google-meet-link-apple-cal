/*
 * This script adds Google Meet to events created via Apple Calendar (and other 3rd party calendar clients)
 * It fetches events recently updated filtering via updatedMin.
 * Adds Google Meet link if an event has been created by you, has no conferenceData and has at least one guest
 * Creates a trigger on event update
 */

function checkForNewEvents() {
  const calendarId = 'primary';
  const now = new Date();
  const minutesFromLastUpdate = 5;
  const updatedMin = new Date(now.getTime() - minutesFromLastUpdate * 60000);
  const events = Calendar.Events.list(calendarId, {
    timeMin: now.toISOString(),
    updatedMin: updatedMin.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 5,
  });

  if (events.items && events.items.length > 0) {
    for (let i = 0; i < events.items.length; i++) {
      let event = events.items[i];
      if (event.status !== 'cancelled' && !event.start.date) {
        const start = new Date(event.start.dateTime);
        if (
          event.creator.self &&
          event.conferenceData == null &&
          event.attendees
        ) {
          event.conferenceData = {
            createRequest: {
              requestId: Utilities.getUuid(),
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          };
          try {
            event = Calendar.Events.update(event, calendarId, event.id, {
              conferenceDataVersion: 1,
              sendUpdates: 'externalOnly', // notify non Google user
            });
          } catch (e) {
            Logger.log('Fetch threw an exception: ' + e);
          }
        }
      }
    }
  } else {
    // do nothing
  }
}
