/*
 * This script adds Google Meet to events created via Apple Calendar (and other 3rd party calendar clients)
 * It fetches events recently updated filtering via minutesFromLastUpdate.
 * Adds Google Meet link if an event has been created by you, has no conferenceData or is 'meet' and has at least one guest
 * Creates a trigger on event update
 * Uses the same Google Meet link for recurring appointments
 */

function checkForNewEvents() {
  const calendarId = 'primary';
  const now = new Date();
  const minutesFromLastUpdate = 10; // Looks back 10 mins to catch sync delays
  const updatedMin = new Date(now.getTime() - minutesFromLastUpdate * 60000);
  
  const events = Calendar.Events.list(calendarId, {
    timeMin: now.toISOString(),
    updatedMin: updatedMin.toISOString(),
    singleEvents: false, // Set to false to see the "Master" of recurring events
    orderBy: 'updated',
    maxResults: 20,
  });

  if (events.items && events.items.length > 0) {
    for (let i = 0; i < events.items.length; i++) {
      let event = events.items[i];

      // Skip if cancelled or an all-day event
      if (event.status === 'cancelled' || event.start.date) continue;

      // Check if we should add a Meet link:
      // Must be created by you, have no Meet link, and have attendees
      if (event.creator.self && !event.conferenceData && event.attendees) {

        // LOGIC: If it's a recurring event, we update the "Master" series
        // If it's a single event, we update that specific event.
        const targetId = event.id;

        try {
          // 1. Prepare the Meeting Request
          const resource = {
            conferenceData: {
              createRequest: {
                requestId: Utilities.getUuid(),
                conferenceSolutionKey: { type: 'hangoutsMeet' },
              },
            }
          };

          // 2. Trigger the Google Meet link generation
          let updatedEvent = Calendar.Events.patch(resource, calendarId, targetId, {
            conferenceDataVersion: 1,
            sendUpdates: 'externalOnly'
          });

          // 3. Extract the new link and push it to the Location field for Apple Calendar
          if (updatedEvent.conferenceData && updatedEvent.conferenceData.entryPoints) {
            const meetLink = updatedEvent.conferenceData.entryPoints[0].uri;

            // Only overwrite if location is empty or just says 'meet'
            if (!updatedEvent.location || updatedEvent.location.toLowerCase().match('meet')) {
              Calendar.Events.patch({ location: meetLink }, calendarId, targetId);
              Logger.log(`Added link to ${event.summary || 'Untitled'}: ${meetLink}`);
            }
          }
        } catch (e) {
          Logger.log('Error adding Meet link: ' + e);
        }
      }
    }
  }
}