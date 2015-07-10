When I tried running Unit 16 originally, I got the following error in the console:

Uncaught SecurityError: Failed to execute 'replaceState' on 'History': A history state object with URL 'file://par-stg01/' cannot be created in a document with origin 'null'.

I Googled the error message and got various suggestions and one of them was running the coed from a server: hence transferring the code to the xampp/htdocs folder

Did this and had to load it as follows:

http://localhost:808/Unit_16_Workshop_1/

(and had to start xampp server, obviously)