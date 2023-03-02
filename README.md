# Videos Creator App

In this project I was asked for creating a full stack application from scratch, creating the backend and
frontend independently, and then, integrating both projects. 

This project is a “Videos Creator Platform” , where
new video creators can upload (video URL) new videos, sign up, list the available videos and video creators.
You’ll have the ability to like videos and follow other video creators.

## Technical Stack

![alt text](/doc/tech_stack.jpg)

## Running the system

Run the following command to start the database:
```bash
docker-compose up -d
```
Then run the following command to start the frontend:
```bash    
npm run dev
```
Then run the following command to start the backend:
```bash    
npm run dev
```
Seed the database with the following command:
```bash    
npm run seed
```
If you want to revert the database to the initial state, run the following command:
```bash    
npm run seed-undo
```
Then go to the following path to start the application flow:

[http://localhost:3000/register](http://localhost:3000/register)

