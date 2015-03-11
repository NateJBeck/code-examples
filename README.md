####Code Examples

Much of the code I use is tied into private repos, making it impossible to
see and review. This repo is intended to store a few interesting code samples
with explanations, either for review or for my ease of access.


####Events

From an admin event panel. The controller uses `before_actions` to ensure
only admins have access to CREATE, UPDATE and DELETE actions. The model
incorporates Paperclip size and content validations for attached event photos,
with storage via Dropbox SDK. Uses FullCalendar (calendar.js) to display events
with details on click.


####Gmaps

Based on Gmaps Javascript V3 documentation, refactored to allow for mapping of 
towns (say, if an admin wanted to see a map of towns where they were currently 
operating in) and of specific delivery addresses in each town. 

Styled using bourbon/neat, a SASS grid design gem from thoughtbot.
