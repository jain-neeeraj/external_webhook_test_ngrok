A boilerplate code for the use of ngrok with NodeJS for the purpose of testing the webhooks. This helps solve the problem of testing when your application is supposed to push to a webhook and you would want to automate the tests for it.

The boilerplate code has two parts
1. A webserver exposing an always listening end point over the internet. The endpoint will store the data posted to it and can return the same on accessing the same end point on GET method
2. A sample script that is pushing to the above exposed end point


How to try:
1. Clone the repo
2. install dependencies using 
    ```npm install```
   
3. Run the sample scrip using 
```npm test```
   
