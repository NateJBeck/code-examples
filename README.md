####Code Examples

Much of the code I use is tied into private repos, making it impossible to
see and review. This repo is intended to store a few interesting code samples
with explanations, either for review or for my ease of access.


####Events

A railsy controller and model. The controller uses `before_actions` to ensure
only admins have access to CREATE, UPDATE and DELETE actions. The model
incorporates Paperclip gem validations to attach files (in this case restricted to just
images) to objects. Image file storage done with Dropbox SDK.


####Gmaps

Based on Gmaps Javascript V3 documentation, refactored to allow for mapping of 
towns (say, if an admin wanted to see a map of towns where they were currently 
operating in) and of specific delivery addresses in each town. 

Styled using bourbon/neat, a SASS grid design gem from thoughtbot.
