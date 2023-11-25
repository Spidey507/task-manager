# Task Manager
## Scenario
Develop a Task Management application to enable users to efficiently organize and track tasks. The application must offer comprehensive functionalities, including task creation, viewing, editing, and deletion, while ensuring user authentication for security.
### Functional Requirements:
- Task Creation: Users can create new tasks by specifying a title, description, and due date.
- Task Display: All tasks should be viewable, providing detailed information about each task.
- Task Editing: Allow users to modify existing tasks, including title, description, and due date.
- Task Deletion: Enable users to delete tasks they no longer need.
- User Authentication: Implement secure user authentication mechanisms, enabling login and logout functionalities.
All changes to tasks must be reflected in real time. 
### Technical Specifications:
- Database: Utilize a database to store and manage task data efficiently.
- Backend Development: Develop a RESTful API to handle CRUD operations for tasks.
- Frontend Development: build an intuitive user interface, interacting with the backend API.
- Input Validation: Ensure proper validation of user inputs, including mandatory fields and appropriate data formats.
- Security: Implement user authentication using JSON Web Tokens (JWT) for secure access to functionalities, all credentials must be hashed.
- Code Quality: Write clean, well-commented code and employ Git for version control, providing a GitHub repository link for assessment.
### Bonus Features (Optional):
- Pagination: Implement pagination for task listing to enhance user experience.
- Sorting & Filtering: Add options for sorting and filtering tasks based on various parameters.
- Error Handling: Implement robust error handling with clear and informative error messages.


You are free to use any of the following technologies when creating this application.
## BACK-END
- NodeJs (preferred)
- Python
- Java
- Ruby
- C#
## FRONT-END
- Vue (preferred)
- React
- NextJs
- Angular
## Database
- MongoDB (preferred)
- MySQL
- PostgreSQL
- Oracle
- MS SQL

# Installation steps
## Install Node
### Install curl
`sudo apt-get install curl`
`curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -`

### Install nodejs
`sudo apt-get install nodejs`

### Check nodejs and npm versions
`node -v`
`npm -v`

Make sure that the node version is 20.10.0.

## Install mongodb
`sudo apt-get install -y mongodb-org`

`echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list`

`curl -fsSL https://pgp.mongodb.com/server-7.0.asc |    sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg    --dearmor`

`sudo apt-get update`

`sudo apt-get install -y mongodb-org`

`sudo mkdir -p /data/db`

`sudo systemctl start mongod`

`sudo systemctl status mongod`


## Install Vue
`npm install -g @vue/cli`

# Run application
## Run MongoDB
Run in console `mongod` or `mongosh`. Make sure to not close the console while the application is running.

## Run backend
Make sure to install all dependencies.
1. access the backend directory `cd backend`
2. `npm install`
3. `npm start`

## Run Vue
Install all dependencies before running the frontend.
1. access task-manager-ui directory `cd task-manager-ui`
2. `npm install`
3. `npm run serve`


