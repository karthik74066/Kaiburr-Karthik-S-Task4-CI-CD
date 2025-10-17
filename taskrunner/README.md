Kaiburr Assessment — Task 2: Kubernetes Deployment

---

Overview

This task extends the Task Runner application (from Task 1) by containerizing it with Docker and deploying it to a Kubernetes cluster.
The setup uses MongoDB as a backend database and fulfills the following key requirements:

Application and MongoDB run in separate pods.

MongoDB data is persisted via a Persistent Volume Claim (PVC).

The application uses environment variables for MongoDB connection details.

The application endpoints are accessible from the host machine via NodePort.

The PUT /api/tasks/{id}/executions endpoint dynamically creates a BusyBox pod in Kubernetes to execute commands.

---

Project Structure

TASKRUNNER/
├── .mvn/
├── Screenshots/
├── src/
│   ├── main/
│   │   ├── java/com/kaiburi/assessment/taskrunner/
│   │   │   ├── config/
│   │   │   │   └── CorsConfig.java
│   │   │   ├── controller/
│   │   │   │   └── TaskController.java
│   │   │   ├── model/
│   │   │   │   ├── Task.java
│   │   │   │   └── TaskExecution.java
│   │   │   ├── repository/
│   │   │   │   └── TaskRepository.java
│   │   │   └── service/
│   │   │       ├── CommandValidator.java
│   │   │       ├── TaskService.java
│   │   │       └── TaskRunnerApplication.java
│   │   ├── resources/
│   │   │   ├── static/
│   │   │   ├── templates/
│   │   │   └── application.properties
│   │   └── test/
│   └── target/
├── docker-compose.yaml
├── Dockerfile
├── HELP.md
├── mongo-deployment.yaml
├── mvnw
├── mvnw.cmd
├── pom.xml
├── README.md
└── taskrunner-deployment.yaml

---

Deployment Setup

1. Build Application

Run mvn clean package -DskipTests

Build Docker image: docker build -t taskrunner-app:latest .

2. Deploy to Kubernetes

Apply MongoDB resources: kubectl apply -f mongo-deployment.yaml

Apply TaskRunner app: kubectl apply -f taskrunner-deployment.yaml

Verify with: kubectl get pods,svc,pvc

3. Access Application

Use NodePort service to access API from the host system.

Example: http://localhost:30080/api/tasks

---

Name: Karthik S
Project: Kaiburr Task Runner API
Date: October 2025

---