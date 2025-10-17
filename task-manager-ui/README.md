---

Kaiburr Task Manager – Task 3 (Web UI)

---

Overview

---

This is the frontend UI for the Kaiburr Task Manager application, built using React 19, TypeScript, and Ant Design.
It connects to the backend API (from Task 1 / Task 2) to create, view, and delete task records.

---

Project Structure

TASK-MANAGER-UI/
├── public/
├── Screenshots/
└── src/
    ├── App.tsx
    ├── index.css
    └── index.tsx

---

Features

i. Create new tasks (ID, name, owner, command)
ii. View existing tasks
iii. Delete tasks
iv. Simple and responsive UI built with Ant Design

---

Tech Stack
Component	Technology
Framework	React 19
Language	TypeScript
UI Library	Ant Design
Backend API	Spring Boot (Task 2, NodePort 30080)

---

Setup and Run

1. Clone the repository
git clone https://github.com/karthik74066/task-manager-ui.git
cd task-manager-ui

2. Install dependencies
npm install

3. Start the application
npm start

The development server will run at http://localhost:3000

Ensure the backend (Task 2 Spring Boot service) is available at http://localhost:30080

---

Author

Karthik S
Completed as part of Kaiburr Assessment – Task 3
October 2025

---