# Blogsy - A Modern Blogging Platform


## Features

- 🎨 Modern and responsive UI with Tailwind CSS
- ✍️ Rich text editor for blog posts
- 🔐 User authentication and authorization
- 📱 Mobile-friendly design
- 🚀 Fast and efficient performance
- 🔍 Search and filter functionality
- 💬 Comment system
- 📊 Analytics dashboard

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Project Structure

```
blogsy/
├── client/             # Frontend React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/     # Page components
│   │   ├── lib/       # Utility functions and API services
│   │   └── ...
│   └── ...
└── server/            # Backend Express application
    ├── controllers/   # Route controllers
    ├── models/       # Database models
    ├── routes/       # API routes
    └── ...
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Rajeshstark2/zidio-project.git
cd zidio-project
```

### 2. Set Up the Backend

```bash
cd server

# Install dependencies
npm install

# Create a .env file
cp .env.example .env

# Update the .env file with your configuration
# Required environment variables:
# - PORT=5000
# - MONGODB_URI=your_mongodb_uri
# - JWT_SECRET=your_jwt_secret

# Start the server
npm start
```

The server will start running on http://localhost:5000

### 3.Frontend

```bash
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The client will start running on http://localhost:5173

## Team Collaboration Guide

### For New Team Members

1. **Initial Setup**
   - Clone the repository
   - Set up both frontend and backend as described above
   - Create your own branch for development

2. **Creating Your Development Branch**
   ```bash
   git checkout -b your-name/feature-name
   ```

### Daily Development Workflow

1. **Before Starting Work**
   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch-name
   git merge main
   ```

2. **Making Changes**
   - Make your code changes
   - Test thoroughly in your local environment
   - Commit your changes with clear messages

3. **Pushing Changes to GitHub**
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin your-branch-name
   ```

4. **Creating Pull Requests**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Add description of changes
   - Request review from team members

### Best Practices

1. **Code Updates**
   - Always pull the latest changes before starting work
   - Keep your branch up to date with main
   - Resolve conflicts locally before pushing

2. **Commit Messages**
   - Use clear, descriptive commit messages
   - Reference issue numbers if applicable
   - Example: "Add user authentication feature #123"

3. **Testing**
   - Test all changes locally before pushing
   - Ensure both frontend and backend work together
   - Check for any console errors

4. **Communication**
   - Update team members about major changes
   - Document any new environment variables or setup requirements
   - Report any issues in the GitHub issues section

## Available Scripts

### Backend (server directory)

- `npm start` - Start the server
- `npm run dev` - Start the server in development mode with hot reload
- `npm test` - Run tests

### Frontend (client directory)

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```


    