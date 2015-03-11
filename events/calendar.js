$(document).ready(function() {
  fillCalendarWithEvents();
});

var fillCalendarWithEvents = function() {
  var tooltip = configuredTooltip();

  $.ajax("/events", {
    success: function(response){
      $("#calendar").fullCalendar({
        events: response,

        eventClick: function(eventData, event, view) {
          tooltip.set({
            'content.text': displayContentFrom(eventData)
          })
          .reposition(event).show(event);
        }
      });
    }
  });
};

var displayContentFrom = function(eventData) {
  var content =
    '<h3>' + eventData.title + '</h3>' +
    '<br />' +
    '<h5>' + eventData.start_date + ' ' +
    '(' + eventData.start_time + '-' + eventData.end_time + ')' +
    '</h5>' +
    '<br/>' +
    '<p class="event-details"><b>Details: </b>' + eventData.details;

  return content;
}

var configuredTooltip = function() {
  var tooltip = $('<div/>').qtip({
    id: 'fullcalendar',
    prerender: true,
    content: {
      text: ' ',
      title: {
        button: true
      }
    },
    position: {
      my: 'bottom center',
      at: 'top center',
      target: 'event',
      viewport: $('#fullcalendar'),
      adjust: {
        mouse: false,
        scroll: false
      }
    },
    show: false,
    hide: false,
    style: 'qtip-blue'
  }).qtip('api');

  return tooltip;
}
