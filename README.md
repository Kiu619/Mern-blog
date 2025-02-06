# 📝 MERN Blog

**MERN Blog** is a full-featured blogging platform where users can read, search, and comment on blog posts, while admins have full control over posts, users, and comments.

---

## ✨ Features
**👤 Users**
✅ View a list of blog posts   
✅ Search for articles   
✅ Read blog posts   
✅ Register & log in   
✅ Comment on posts   

**🛠 Admin**
✅ Create new posts   
✅ Edit & delete blog posts   
✅ Manage users   
✅ Moderate comments   

---

## 🛠 Tech Stack 

✅ **Frontend**: **React, Redux, TailwindCss**  
✅ **Backend: Node.js, Express.js**  
✅ **Database: MongoDB**  
✅ **State Management: Redux Toolkit**  
✅ **Authentication: JWT**  

---

## 📄 API Documentation
| Endpoint        | Method | Description                   |
|---------------|:------:|------------------------------|
| `/auth/register` | POST   | Register a new user          |
| `/auth/login`    | POST   | Log in to the system         |
| `/posts`        | GET    | Get all blog posts           |
| `/posts/:id`    | GET    | Get post details             |
| `/posts`        | POST   | Admin creates a new post     |
| `/posts/:id`    | PUT    | Admin edits a post          |
| `/posts/:id`    | DELETE | Admin deletes a post        |
| `/comments/:postId` | GET | Get comments for a post     |
| `/comments/:postId` | POST | Add a comment to a post   |
| `/users`        | GET    | Admin views all users        |
..............

---

## 📂 Installation & Setup

```bash
# Clone project
git clone https://github.com/Kiu619/Mern-blog.git
cd Mern-blog

# Install and run (Frontend)
cd frontend
npm install
npm run dev

# Install and run (Frontend)
cd backend
npm install
npm run dev 
