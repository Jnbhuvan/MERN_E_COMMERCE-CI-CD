# 🚀 MERN E-Commerce Application - Setup Guide (Ubuntu VM)

This guide explains how to clone and run the **MERN E-Commerce Application** on an Ubuntu Virtual Machine using Docker.

---

## 📋 Prerequisites

- Ubuntu Virtual Machine
- Docker
- Docker Compose
- MongoDB Atlas account

---

## Step 1: Install Docker

Update the package list and install Docker.

```bash
sudo apt-get update
sudo apt-get install docker.io
```

Add your user to the Docker group.

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Verify that Docker is installed successfully.

```bash
docker ps
```

---

## Step 2: Clone the Repository

Clone this repository and navigate to the project directory.

```bash
git clone <YOUR_REPOSITORY_URL>
cd MERN_E_COMMERCE-CI-CD
```

---

## Step 3: Configure Environment Variables

Navigate to the backend folder.

```bash
cd backend
```

Create or edit the `.env` file.

```bash
nano .env
```

Add the following variables:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=mysupersecret
```

### MongoDB Setup

1. Create a free cluster on **MongoDB Atlas**.
2. Create a database user.
3. Allow your VM's IP address (or `0.0.0.0/0` for testing).
4. Copy the connection string and paste it into `MONGODB_URI`.

Save the file and exit.

---

## Step 4: Return to the Project Root

```bash
cd ..
```

---

## Step 5: Build and Start the Application

Run the following command:

```bash
docker compose up --build -d
```

This command will:

- Build all Docker images
- Create the required containers
- Start the application in detached mode

---

## Step 6: Access the Application

Open your browser and visit:

```
http://<YOUR_VM_IP_ADDRESS>
```

Example:

```
http://192.168.1.100
```

---

## ⚠️ Important

If the application is not accessible:

- Make sure the VM is running.
- Verify your cloud provider's **Security Group** settings.
- Ensure the required **Inbound Rules** are enabled (HTTP/Port 80 or the port your application uses).
- Check that Docker containers are running.

```bash
docker ps
```

---

## Useful Docker Commands

View running containers:

```bash
docker ps
```

View application logs:

```bash
docker compose logs
```

Stop the application:

```bash
docker compose down
```

Restart the application:

```bash

Your MERN E-Commerce application should now be running successfully on your Ubuntu VM.docker compose up -d
## 🎉 You're Done!
```


---
Rebuild the application:
```
```bash
docker compose up --build -d


