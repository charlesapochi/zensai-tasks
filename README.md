# **Zensai Todo List Application**

A full-stack Todo List application built with **Django REST Framework** for the backend and **React** for the frontend. It features a clean user interface and a RESTful API for efficient task management. Developed as part of the Zensai take-home challenge by **Charles Apochi**.

---

## ⚡️ **Features**
### **Frontend**
- **Add Tasks**: Add new tasks to the list via a form.
- **Edit Tasks**: Modify existing tasks with inline editing functionality.
- **Mark Completion**: Toggle tasks between "completed" and "pending".
- **Delete Tasks**: Remove tasks from the list.
- **Filter Tasks**: Filter tasks based on their completion status (All/Active).
- **Responsive Design**: Scales well for desktop and mobile devices.
- **User Feedback**: Toast notifications for actions such as adding, editing, or invalid inputs.

### **Backend**
- **CRUD API**: RESTful endpoints for managing todo items.
- **Validation**: Ensures proper data handling.
- **GraphQL**: Use Graphene Django for advanced querying.
- **Admin Panel**: Manage tasks through Django's built-in admin interface.

---

## 🔥 **Tech Stack**
- **Backend**: Django, Django REST Framework
- **Frontend**: React, React-Toastify
- **Database**: SQLite
- **Dependency Management**: Poetry for backend, npm for frontend

---

## 💻 **Getting Started**

### **Prerequisites**
- Python 3.10+
- Node.js 16+
- Poetry
- npm or yarn
- Git

---

### **Setup Instructions**

#### **Clone the Repository**
```bash
git clone https://github.com/charlesapochi/zensai-tasks.git
cd zensai-tasks
```

---

### **Backend Setup**

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies using Poetry**:
   ```bash
   poetry install
   ```

3. **Create a `.env` file** with the following:
   ```
   DEBUG=True
   SECRET_KEY=your-secret-key
   ALLOWED_HOSTS=localhost,127.0.0.1
   ```
4. **Run database migrations**:
   ```bash
   poetry run python manage.py migrate
   ```

5. **Create admin credentials**:
   ```bash
   poetry run python manage.py createsuperuser
   ```

6. **Start the Django development server**:
   ```bash
   poetry run python manage.py runserver
   ```

---

### **Frontend Setup**

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the React development server**:
   ```bash
   npm start
   ```

---

### **Accessing the App**
- Open your browser and navigate to: **[http://localhost:3000](http://localhost:3000)** for the frontend.
- Backend runs on: **[http://127.0.0.1:8000](http://127.0.0.1:8000)**. Navigate for more backend info.

---

## 🫧 **API Endpoints**

### **RESTful Endpoints**
| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| GET    | `/api/todos/`    | Retrieve all tasks      |
| POST   | `/api/todos/`    | Create a new task       |
| PUT    | `/api/todos/<id>`| Update a specific task  |
| DELETE | `/api/todos/<id>`| Delete a specific task  |

---


### **API Documentatioon**
For API documentatiin, access it at:
```
http://127.0.0.1:8000/api/docs
```

---

### **GraphQL Endpoint**
For GraphQL, access it at:
```
http://127.0.0.1:8000/graphql
```

---

## ✨ **Testing**

### **Backend Tests**
Run tests for the backend:
```bash
poetry run python manage.py test
```

### **Frontend Tests**
Run tests for the frontend:
```bash
npm test
```

---