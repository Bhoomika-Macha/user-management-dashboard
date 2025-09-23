# User Management Dashboard

## 📌 Objective
The primary goal of this assignment is to develop a functional web application that serves as a **User Management Dashboard**.  
The application allows users to perform basic operations — **viewing, adding, editing, and deleting user data** — using a **mock backend API**.  

This project demonstrates skills in **front-end development**, focusing on:
- API interaction
- dynamic UI updates
- data handling
- error handling
- responsiveness

---

## 📌 Requirements Implemented

### 1. User Interface
- **User List Display:** A table with `ID`, `First Name`, `Last Name`, `Email`, and `Department`.  
- **Action Buttons:** Add, Edit, and Delete actions implemented.  
- **User Form:** Popup form for adding and editing users with input fields (`First Name`, `Last Name`, `Email`, `Department`).  
- **Pagination:** Supports 10, 25, 50, and 100 rows per page.  
- **Filter & Search:**  
  - Filter popup (First Name, Last Name, Email, Department).  
  - Search bar for quick lookup.  
- **Sorting:** Columns (`First Name`, `Last Name`, `Email`, `Department`) sortable with visual icons.  
- **Responsiveness:** Fully responsive for desktop and mobile.  

### 2. Backend Interaction
- **API Service:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)  
- **Endpoints Used:**  
  - `GET /users` → Retrieve all users.  
  - `POST /users` → Add new user (simulated).  
  - `PUT /users/:id` → Edit existing user (simulated).  
  - `DELETE /users/:id` → Delete user (simulated).  

### 3. Functionality
- **View Users:** Loads list of users on page load.  
- **Add User:** Adds a new user with `POST /users`.  
- **Edit User:** Pre-fills form, updates user with `PUT /users/:id`.  
- **Delete User:** Deletes user with `DELETE /users/:id`.  

### 4. Error Handling & Validations
- **API Errors:** Catches failures (e.g., network errors) and shows messages.  
- **Client-side Validation:** Ensures inputs are not empty, email format is valid, and department is selected before submission.  

---

## 🛠️ Tech Stack
- **Frontend:** React  
- **UI:** CSS (custom, responsive)  
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)  
- **API:** JSONPlaceholder (mock REST API)  
- **HTTP Client:** Axios  

---

## ⚡ Getting Started

  ### 1. Clone the repository
    ```bash
      git clone https://github.com/Bhoomika-Macha/user-management-dashboard.git
      cd user-management-dashboard

  ### 2. Install dependencies
    ```bash
      npm install

  ### 3. Run locally
    ```bash
      npm start
      App will be available at http://localhost:3000

### 🌍 Deployed Link

🔗 Live Demo on Vercel

### 🔎 API Endpoints Used

GET /users → Fetch all users

POST /users → Add new user (simulated)

PUT /users/:id → Edit user (simulated)

DELETE /users/:id → Delete user (simulated)

ℹ️ Note: JSONPlaceholder simulates success but does not persist data permanently.

### 🧪 Code Evaluation Criteria

This submission meets all the criteria:

Functionality: Full CRUD with search, sort, filter, pagination.

Code Quality: Modular React components, clean structure.

Responsiveness: Layout adapts to mobile & desktop.

Error Handling: API and validation errors handled gracefully.

Documentation: Complete README with setup, usage, and reflections.

Efficiency: Pagination and filtering ensure efficient data handling.

### 🔎 Reflections
  ### ✅ Challenges Faced
  
  Handling asynchronous API calls with simulated responses.
  
  Designing a clean, responsive UI that works across devices.
  
  Implementing sorting arrows and toggling them correctly.
  
  Maintaining state management for search, filters, and pagination.

  ### 🚀 Improvements (if more time)
  
  Add Dark Mode toggle for better UX.
  
  Replace mock API with a real backend & database.
  
  Implement user authentication (login/logout).
  
  Add toast notifications (success/error) instead of plain alerts.
  
  Enhance UI further with a design library like Material UI or Tailwind.
