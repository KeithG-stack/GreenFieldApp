# GreenFieldApp

GreenFieldApp is a college management web application for Greenfield University. It provides features for students, faculty, and administrators, including registration, login, dashboards, notifications, calendar, and more.

## Features

- Student, Faculty, and Admin registration and login
- Dashboards for each user type
- Notifications and inbox system
- Calendar integration
- Course and assignment management
- Secure authentication with JWT
- PostgreSQL database with Sequelize ORM

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS templates, Bootstrap, FullCalendar
- **Database:** PostgreSQL (via Neon), Sequelize ORM
- **Authentication:** JWT
- **Other:** dotenv, bcryptjs, body-parser, method-override, cookie-parser

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm
- PostgreSQL database (Neon or local)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/GreenFieldApp.git
    cd GreenFieldApp-1
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the root directory and add:

    ```
    DATABASE_URL='your_postgres_connection_string'
    JWT_SECRET='your_jwt_secret'
    DATABASE_DIALECT=postgres
    ```

4. **Run database migrations (if any):**
    > _Optional: Add Sequelize CLI or migration instructions here if you use them._

5. **Start the application:**
    ```bash
    npm start
    ```
    or
    ```bash
    node app.js
    ```

6. **Visit the app:**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

```
/Config         # Database and other configs
/Middleware     # Express middleware (auth, login, register, etc.)
/Models         # Sequelize models
/routes         # Express route handlers
/views          # EJS templates
/public         # Static assets (CSS, images, JS)
app.js          # Main application entry point
.env            # Environment variables
```

## Usage

- Register as a student, faculty, or admin.
- Login to access your dashboard.
- View notifications, manage courses, assignments, and more.

## License

MIT

---

**GreenFieldApp** &copy; 2025 Greenfield University