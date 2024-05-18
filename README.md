# Blog-Post Website

Welcome to the Blog-Post Website project! This is a collaborative project implemented using the MERN stack (MongoDB, Express, React, Node.js) with TypeScript. This repository will serve as the central hub for all development activities, including code, issues, and documentation.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)
- [License](#license)

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

2. **Install dependencies for both client and server

```sh
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the Application

1. **Start the MongoDB server:**

Make sure MongoDB is running on your machine. If MongoDB is not installed locally, you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud database.

2. **Start the server:**

```sh
cd server
npm run dev
```

3. **Start the client:**

```sh
cd client
npm start
```

The server should be running on `http://localhost:5000` and the client on `http://localhost:3000`.

## Project Structure

```plaintext
blog-post-website/
├── client/             # React front-end
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.tsx
│       └── index.tsx
├── server/             # Express back-end
│   ├── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── app.ts
│   └── index.ts
├── .gitignore
├── README.md
└── package.json
```

## Development Workflow

### 1. Creating Branches for Features

Create a new branch for each feature you are working on to avoid conflicts:

```sh
git checkout -b feature/branch-name
```

### 2. Making and Committing Changes

Make changes in the branch and commit them with clear messages:

```sh
git add .
git commit -m "Add feature description"
```

### 3. Pushing Changes to GitHub

Push the changes to the remote repository under the branch name:

```sh
git push origin feature/branch-name
```

### 4. Creating Pull Requests

1. **Create a Pull Request (PR):**
   - Go to the GitHub repository.
   - Click on "Pull requests" > "New pull request".
   - Select the branch with your changes.
   - Compare and create a pull request.
   - Add a description and request reviews from team members.

2. **Review and Merge PR:**
   - Team members review the pull request, suggest changes, or approve it.
   - Once approved, the repository owner or the person assigned merges the pull request into the main branch.

### 5. Resolving Conflicts

If there are conflicts, resolve them before merging the pull request:

1. **Pull the latest main branch into your feature branch:**

```sh
git checkout main
git pull origin main
git checkout feature/branch-name
git merge main
```

2. **Resolve conflicts in your code editor and commit the resolved changes:**

```sh
git add .
git commit -m "Resolve merge conflicts"
git push origin feature/branch-name
```

## Contributing

We welcome contributions from all team members! Here are some guidelines to follow:

- **Frequent Pulls:** Regularly pull from the main branch to stay updated.
- **Descriptive Commits:** Write clear and descriptive commit messages.
- **Small Changes:** Make small, incremental changes to make reviews easier.
- **Code Reviews:** Review code thoroughly to maintain code quality.
- **Communication:** Use GitHub issues, pull request comments, and a communication tool (e.g., Slack) to coordinate and discuss changes.

