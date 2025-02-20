# Todo App

A simple and efficient Todo App built with Next.js. This app allows users to add, edit, delete, and change the status of the task. The app uses MongoDB Atlas to store and persist tasks across sessions, ensuring reliable and scalable data management.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Acknowledgments](#acknowledgments)

## Features

- **Add Tasks**: Users can add new tasks with a title and optional due date.
- **Edit Tasks**: Users can edit the text of existing tasks (due date editing might be included).
- **Delete Tasks**: Tasks can be deleted when no longer needed.
- **Change Status**: Users have the flexibility to update the status of their tasks, with clear visual cues indicating progress.
- **Persistent Storage**: Tasks are securely stored in MongoDB Atlas, ensuring they persist across sessions and can be accessed from any device.

## Project Structure

- **MainComponent**: The main container that manages the state of the entire application and handles adding, editing, deleting, and completing tasks.
- **AddComponent**: A form component for adding new tasks.
- **ListComponent**: Displays a list of tasks.
- **TaskItem**: A single task item that supports editing, deletion, and marking as complete.

## Technologies Used
- **Next.js: React framework for building the user interface with server-side rendering and static site generation
- **ESLint:** Ensuring code quality
- **Tailwind CSS: Utility-first CSS framework for styling components efficiently
- **Vercel:** Deployment platform for hosting the application with ease

## Installation

### Prerequisites
- Node.js and npm installed on your local machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/behnam-nbt/todo-app.git
   cd todo-app
   npm install
## Usage
- **Adding a Task:** Enter a task description and optional due date in the input fields and click "Add Task".
- **Editing a Task:** Click "Edit" next to a task to change its text.
- **Deleting a Task:** Click "Delete" to remove a task.
- **Change Status**: Users have the flexibility to update the status of their tasks, with clear visual cues indicating progress.
- **Persistent Tasks:** The tasks you add or modify are saved to local storage, so they'll be there when you return to the app later.

## Acknowledgments
- **Next.js: React framework for building the user interface with server-side rendering and static site generation
