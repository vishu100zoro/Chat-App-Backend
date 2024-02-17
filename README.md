# Chat-APP

The aim of this project is to develop a real-time chat application using React.js for the frontend and Node.js for the backend. The application aims to provide an intuitive and responsive chat room interface where users can join, engage in real-time conversations, and benefit from features such as user authentication, WebSocket-based communication, and persistent storage of user information and chat messages in a MongoDB database.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Install Dependencies](#install-dependencies)
3. [Run the Project](#run-the-project)
4. [System Design](#system-design)
5. [Features Implemented](#features-implemented)

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)


## Install Dependencies

Navigate to the `frontend` and `backend` directories and run the following command to install dependencies:
**For Backend** - `npm install`
**For Frontend** - `npm install`

## Run the Project

Navigate to the `frontend` and `backend` directories and run the following command to Run Project:
**For Run Backend** - `npm start`
**For Run Frontend** - `npm start`

## System Design

The chat application consists of a React.js frontend and a Node.js backend. Real-time communication is achieved using the WebSocket protocol (Socket.io). User data and chat messages are stored in a MongoDB database.

**Frontend Architecture (React.js)**
The React.js frontend is organized into modular components to enhance code readability and maintainability. The main components include:
1) ChatRoom Component:
Manages the overall chat room interface, including the chat window, input field for messages, and the user list.
Utilizes React state to dynamically update and display real-time messages and active users.
Ensures responsiveness for a seamless user experience across various devices.

2) MessageInput Component:
Handles user input for messages and sends them to the server.
Utilizes React state to manage the message input field.

3) UserList Component:
Displays the list of active participants in the chat room.
Dynamically updates as users join or leave the chat.

**Backend Architecture (Node.js)**
The Node.js backend is responsible for managing client-server communication, user authentication, and data storage. Key components and functionalities include:

1) WebSocket Server (Socket.io):
Establishes a bidirectional communication channel between clients and the server for real-time messaging.
Listens for events such as user connection, message sending, and disconnection.

2) Express.js Server:
Handles HTTP requests for user authentication, joining the chat room, and retrieving chat history.
Integrates with the WebSocket server to enable real-time communication.

3) User Authentication and Authorization:
Implements authentication mechanisms to ensure that only authenticated users can join the chat room and send messages.
Uses tokens or sessions to manage user authorization.

4) MongoDB Database:
Stores user information, including authentication details, and chat messages persistently.
Utilizes a schema to organize and manage data efficiently.

## List of Features

1) Chat room interface with real-time messaging.
2) User authentication and authorization.
3) WebSocket-based bidirectional communication.
4) User list displaying active participants.
5) Responsive design for various screen sizes.

 
**Advanced Features**:
1) User avatars or profile pictures.
2) Private messaging between users.

 
## Author
**LinkedIn** Click [Here](https://www.linkedin.com/in/vishal-singh-32b213244/) **@Vishal Singh**
