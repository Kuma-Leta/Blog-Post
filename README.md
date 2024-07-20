# Blog-Post Website

Welcome to the Blog-Post Website project! This is a collaborative project implemented using the MERN stack (MongoDB, Express, React, Node.js) with TypeScript. This repository will serve as the central hub for all development activities, including code, issues, and documentation.

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your local development machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository:**

```sh
git clone https://github.com/username/blog-post-website.git
cd blog-post-website
```

2. **Install dependencies for both client and server**

```sh
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the Application

1. **Configure the environment variables:**

You can toggle between using a local or remote MongoDB database by updating the `CONNECTION_STRING` in the `.env` file located in the `server` directory:

```env
NODE_ENV=development
PORT=5000
CONNECTION_STRING=mongodb://localhost:27017/blog
# CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster1.mongodb.net/blog
JWT_SECRET=your_secret_key_here

EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_USERNAME=your_username_here
EMAIL_PASSWORD=your_password_here
EMAIL_PORT=2525
JWT_EXPIRES_IN=90d

# Alternative email settings
# EMAIL_HOST=live.smtp.mailtrap.io
# EMAIL_USERNAME=api
# EMAIL_PASSWORD=your_alternative_password_here
# EMAIL_PORT=587
# JWT_EXPIRES_IN=90d
```

- For a local database, ensure `CONNECTION_STRING=mongodb://localhost:27017/blog` is uncommented.
- For a remote database, uncomment and set `CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster1.mongodb.net/blog` with your actual MongoDB Atlas credentials.

2. **Start the MongoDB server:**

Make sure MongoDB is running on your machine. If MongoDB is not installed locally, you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud database.

3. **Start the server:**

```sh
cd server
npm run dev
```

4. **Start the client:**

```sh
cd client
npm run build
npm run preview
```

The server should be running on `http://localhost:5000` and the client on `http://localhost:3000`.

---

## Admin Dashboard Setup

To access the admin dashboard:

1. **Navigate to the Admin Login Page:**
   Open `http://localhost:5000/admin/login` in your browser.

2. **Add Admin Credentials:**
   Manually add admin credentials to the database:

   - Go to the `users` collection in your MongoDB database.
   - Insert a new user document with the following fields:
     - `name`: Admin's name
     - `email`: Admin's email address
     - `password`: Admin's hashed password (see below for hashing instructions)
     - `gender`: Admin's gender
     - `role`: `admin`

3. **Hash Admin Password:**
   To hash the password, use the `hashPassword.js` file located in the `server` directory. Update the password directly in the file before running it:

   ```javascript
   const bcrypt = require("bcrypt");

   const saltRounds = 10;
   const plainPassword = "admin123"; // Replace with your password

   bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
     if (err) {
       console.error("Error hashing password:", err);
     } else {
       console.log("Hashed password:", hash);
     }
   });
   ```

   1. Edit the `plainPassword` variable in the `hashPassword.js` file to the desired password.
   2. Run the script:

   ```sh
   cd server
   node hashPassword.js
   ```

   This command will output the hashed password. Copy this hashed password and use it in the `password` field for the admin user document.

4. **Create Admin User:**
   Add the hashed password and other details into the `users` collection. Your admin user document should look something like this:

   ```json
   {
     "name": "Admin Name",
     "email": "admin@example.com",
     "password": "<hashed-password>",
     "gender": "Male",
     "role": "admin"
   }
   ```

Once these steps are completed, you should be able to log in to the admin dashboard using the credentials you set up.
