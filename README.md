# ToDo Application

A application built in **NodeJS**, **ExpressJS**, **MongoDB**, **Socket.io**, and **ReactJS** to manage day to day tasks. Feature to add a task at a particular date and time to todo list, can edit or delete the task. 
Admin can see all the task added by different user in real time.


## Getting Started

### Get Project Running
1. Clone the project from github.

2. Install dependencies.
```bash
cd todo-app
npm install
npm run client-install
```
3. Setup environment variables. 
- Rename `.env.sample` to `.env`.

 ```bash
mv .env.sample .env
```
- Update the `.env` file with your values.

4. To create a admin user
- Create a new user by registering
- Manually update the role of newly created user to **admin**

### Running the server locally.
```bash
npm run dev
```
### Running the server as production.
```bash
cd client
npm run build
cd ../
npm run start
```
