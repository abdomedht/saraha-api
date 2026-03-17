# Saraha Clone API 💬

A secure backend for an anonymous messaging application, inspired by "Saraha". This API focuses on user privacy, secure message transmission, and efficient data handling.

## 🌟 Key Features
* **Anonymity**: Engineered for secure, anonymous messaging between users.
* **Advanced Security**: 
    * Secure **JWT-based** authentication routes.
    * Password encryption using **Bcrypt**.
    * Protected routes for viewing messages.
* **Validation**: Strict request body validation using **Joi** / **Express-validator**.
* **Message Management**: Full CRUD for receiving, viewing, and deleting anonymous feedback.
* **Profile Access**: Public profile links to receive messages without revealing user identity.

## 🛠️ Tech Stack
* **Backend**: Node.js & Express.js
* **Database**: MongoDB & Mongoose
* **Security**: JWT, Bcrypt, Helmet (optional/if used)

## 📁 Folder Structure
* `models/`: Database schemas (User, Message).
* `controllers/`: Logic for handling requests.
* `routes/`: API endpoint definitions.
* `middlewares/`: Authentication and error handling.

## 🚀 Installation
1. Clone the repo: `git clone https://github.com/abdomedht/saraha-api.git`
2. Install packages: `npm install`
3. Configure environment variables in `.env`.
4. Run the app: `npm run dev`

## 🔌 Core Endpoints
* `POST /user/signup` - Create an account
* `POST /message/send` - Send an anonymous message
* `GET /message/all` - View received messages (Auth required)
