saraha-api

A RESTful Node.js / Express backend API for a Saraha-like anonymous messaging platform — users can sign up, manage their profiles, and receive anonymous messages securely.

🚀 Features

🔐 User Authentication: Signup, login, and email confirmation

👤 User Profile: View, update, and manage user profile & password

📨 Anonymous Messaging: Send/receive anonymous messages

🛡️ Role-based Access Control: Protect routes with roles

🚫 Account Freeze: Users can freeze (soft delete) their profiles

🧱 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Joi for input validation

dotenv for environment configuration

bcrypt + crypto-js for hashing & token security

🧩 Installation

Clone the repo

git clone https://github.com/abdomedht/saraha-api.git
cd saraha-api

Install dependencies

npm install

Environment variables

Create a .env file inside src/config/ (or copy .env.example) and set:

port=3000
DATABASE_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_HOST=…
EMAIL_USER=…
EMAIL_PASS=…

Run in development

npm run dev
📡 API Endpoints

Here is an overview of the main API routes:

🛠️ Auth
Method	Endpoint	Description
POST	/auth/signup	Register a new user
PATCH	/auth/confirm-email	Confirm email address
GET	/auth/login	Login & get JWT
👤 User
Method	Endpoint	Description
GET	/user/profile	Get your logged-in user profile
PATCH	/user/profile	Update your profile
PATCH	/user/profile/password	Update password
DELETE	/user/profile	Freeze (soft delete) account
GET	/user/profile/:userId	Share public profile by ID

All user routes are protected — JWT required.
Role based access control: Admin, User.

📌 Error Handling

A global error handler is applied — any unhandled route returns:

{ "message": "In-valid routing" }
📫 Testing

You can use tools like Postman to test the API endpoints. Create collections for Auth, User, and Messaging flows.

🧠 Notes

Root Route returns a welcome message:

{ "message": "Welcome in node.js project powered by express and ES6" }

Ensure your MongoDB server is up and .env variables are valid before starting.

📜 License
