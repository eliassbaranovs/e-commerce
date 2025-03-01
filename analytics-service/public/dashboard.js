document.addEventListener("DOMContentLoaded", function () {
  const pageViewCountEl = document.getElementById("page-view-count");
  const videoStartCountEl = document.getElementById("video-start-count");
  const videoCompleteCountEl = document.getElementById("video-complete-count");
  const completionRateEl = document.getElementById("completion-rate");
  const eventsTableBody = document.getElementById("events-table-body");
  const eventTypeFilter = document.getElementById("event-type-filter");
  const userFilter = document.getElementById("user-filter");
  const applyFiltersBtn = document.getElementById("apply-filters");

  let allEvents = [];

  // Fetch all events
  async function fetchEvents() {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      allEvents = data.events.filter((event) => event.id); // Filter out incomplete entries

      updateDashboard();
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  // Update dashboard with events data
  function updateDashboard() {
    // Count events by type
    const pageViews = allEvents.filter((event) => event.type === "page_view");
    const videoStarts = allEvents.filter(
      (event) => event.type === "video_start"
    );
    const videoCompletes = allEvents.filter(
      (event) => event.type === "video_complete"
    );

    // Update stats
    pageViewCountEl.textContent = pageViews.length;
    videoStartCountEl.textContent = videoStarts.length;
    videoCompleteCountEl.textContent = videoCompletes.length;

    const completionRate =
      videoStarts.length > 0
        ? ((videoCompletes.length / videoStarts.length) * 100).toFixed(1)
        : "0";
    completionRateEl.textContent = `${completionRate}%`;

    // Populate events table with most recent 20 events
    populateEventsTable(allEvents.slice(-20).reverse());
  }

  // Filter events
  function filterEvents() {
    const eventType = eventTypeFilter.value;
    const userId = userFilter.value.trim();

    let filtered = [...allEvents];

    if (eventType !== "all") {
      filtered = filtered.filter((event) => event.type === eventType);
    }

    if (userId) {
      filtered = filtered.filter(
        (event) => event.userId && event.userId.includes(userId)
      );
    }

    // Show the most recent 20 filtered events
    populateEventsTable(filtered.slice(-20).reverse());
  }

  // Populate events table
  function populateEventsTable(events) {
    eventsTableBody.innerHTML = "";

    if (events.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = '<td colspan="4">No events found</td>';
      eventsTableBody.appendChild(row);
      return;
    }

    events.forEach((event) => {
      const row = document.createElement("tr");

      const date = new Date(event.timestamp);
      const timeString = date.toLocaleTimeString();

      // Create details string based on event type
      let details = "";
      if (event.type === "video_start" || event.type === "video_pause") {
        details = `Video ID: ${event.metadata?.videoId || "N/A"}, Time: ${
          event.metadata?.currentTime?.toFixed(1) || "N/A"
        }s`;
      } else if (event.type === "video_complete") {
        details = `Video ID: ${event.metadata?.videoId || "N/A"}, Watch Time: ${
          event.metadata?.watchTime?.toFixed(1) || "N/A"
        }s`;
      } else if (event.type === "page_view") {
        details = `URL: ${event.url || "N/A"}`;
      }

      row.innerHTML = `
        <td>${timeString}</td>
        <td>${event.type}</td>
        <td>${event.userId}</td>
        <td>${details}</td>
      `;

      eventsTableBody.appendChild(row);
    });
  }

  // Add event listeners
  applyFiltersBtn.addEventListener("click", filterEvents);

  // Initialize
  fetchEvents();

  // Refresh data every minute
  setInterval(fetchEvents, 60000);
});
