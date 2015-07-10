The folders Unit_10_Workshop_1 and Unit_15_Workshop_1 were copied from my home directory to this folder.


Unit_10 uses XML and only works when it is run from a webserver, so using xampp to simulate this behaviour: run it as follows:

http://localhost:808/Unit_10_Workshop_1/

When I tried running Unit 15 originally, I got the following error in the console:

Uncaught SecurityError: Failed to execute 'replaceState' on 'History': A history state object with URL 'file://par-stg01/' cannot be created in a document with origin 'null'.

I Googled the error message and got various suggestions and one of them was running the coed from a server: hence transferring the code to the xampp/htdocs folder

Did this and had to load it as follows:

http://localhost:808/Unit_15_Workshop_1/