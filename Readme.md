<div align="center">

<!-- 3D Title Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=College%20Connect&fontSize=60&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Where%20Student%20Questions%20Find%20Real%20Answers&descAlignY=60&descSize=18" width="100%"/>

<br/>

<!-- Status badges -->
<img src="https://img.shields.io/badge/🏆_WebSprint_2026-College_Hackathon_|_1st_Place-FFD700?style=for-the-badge&labelColor=1a1a2e" />
&nbsp;
<img src="https://img.shields.io/badge/Team_Size-4_Members-blueviolet?style=for-the-badge&labelColor=1a1a2e" />
&nbsp;
<img src="https://img.shields.io/badge/Status-Live_🟢-00d26a?style=for-the-badge&labelColor=1a1a2e" />

<br/><br/>
<div align="center">
  <a href="https://web-sprint-omega.vercel.app/" target="_blank">
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="70" />
  </a>
  <h2><b><a href="https://web-sprint-omega.vercel.app/" target="_blank">✨ VIEW LIVE DEPLOYMENT ✨</a></b></h2>
  <p><i>Click the rocket to launch the live application!</i></p>
  <br />
</div>

<!-- Tech stack icons -->
<img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,js,tailwind,git,vercel&theme=dark&perline=8" />

<br/><br/>

---

</div>

## 🧠 What is College Connect?

> **College Connect** is a community-driven Q&A platform built exclusively for students — a place to ask college-related questions, share knowledge with peers, upload resources, and get rewarded through a karma-based system.

Built in a **high-pressure hackathon environment** at WebSprint 2026, College Connect tackles a real problem every student faces — *where do I get reliable answers to college-related queries?*

<br/>

---

## ✨ Key Features

<table>
  <tr>
    <td>

### 🙋 For Students
- ❓ Post questions on any college topic
- 💬 Reply to questions from peers
- 📎 Upload files & share resources in posts/replies
- ✅ Accept the best reply as the answer
- 🔗 Add LinkedIn profile to your account
- 🔎 Browse all posts on the platform

  </td>
    <td>

### 🛡️ Platform Highlights
- 🔐 Secure user authentication
- ⚡ Fast, responsive React frontend
- ☁️ Cloud-ready REST API backend
- 📱 Fully responsive on all devices
- 🗂️ Clean, intuitive UI

  </td>
  </tr>
</table>

<br/>

---

## 🏗️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---:|:---:|:---|
| 🎨 **Frontend** | React.js | Dynamic, component-based UI |
| ⚙️ **Backend** | Node.js + Express.js | REST API server |
| 🗄️ **Database** | MongoDB + Mongoose | NoSQL document storage |
| 📁 **File Uploads** | Multer | Resource sharing & attachments |
| 🔐 **Auth** | JWT + bcrypt | Secure authentication |
| 🚀 **Deployment** | Vercel (Frontend) | Fast global delivery |

</div>

<br/>

---

## 🏆 Hackathon Achievement

<div align="center">

```
╔══════════════════════════════════════════════════╗
║       🏆  WebSprint 2026 — College Hackathon  🏆 ║
║                                                  ║
║         1st Place  |  20+ Competing Teams        ║
║                                                  ║
║   Built a complete full-stack product in         ║
║   hours under real hackathon pressure            ║
╚══════════════════════════════════════════════════╝
```

<a href="https://docs.google.com/presentation/d/1Z6t-LGzZEfspXrrLyUVMXsB2y4woWoKkAyBnHd2tLh8" target="_blank">
  <img src="https://img.shields.io/badge/🎖️_View_Certificate-Click_Here-FFD700?style=for-the-badge&labelColor=1a1a2e" height="38"/>
</a>

</div>

<br/>

---

## 🗂️ Project Structure

```
WebSprint/
│
├── 📁 frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level page components
│   │   ├── store/             # Redux state management
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── 📁 backend/
│   ├── controllers/           # Business logic
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API route definitions
│   ├── middleware/            # Auth & error middleware
│   ├── uploads/               # Multer file storage
│   ├── app.js
│   └── index.js
│
├── README.md
└── package.json
```

<br/>

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 18
- npm
- MongoDB (local or Atlas)
- Git

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/anshsingh1032/WebSprint.git
cd WebSprint
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ Open the App

```
http://localhost:5173
```

<br/>

---

## 📡 API Endpoints

<div align="center">

| Method | Endpoint | Description | Access |
|:---:|:---|:---|:---:|
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login & get JWT | Public |
| `GET` | `/api/posts` | Fetch all posts/questions | Public |
| `POST` | `/api/posts` | Create a new post (file upload supported) | Private |
| `GET` | `/api/posts/:id` | Get a single post | Public |
| `POST` | `/api/posts/:id/replies` | Add a reply to a post (file upload supported) | Private |
| `PUT` | `/api/posts/:id/accept` | Accept a reply/request | Private |
| `GET` | `/api/users/:id` | Get user profile + their posts | Public |
| `PUT` | `/api/users/:id/linkedin` | Update user's LinkedIn URL | Private |

</div>

<br/>

---

## 👨‍💻 Author

<div align="center">

| Role | |
|:---:|:---:|
| 👑 **Team Lead** | Ansh Singh |
| 👥 **Team Size** | 4 Members |

<br/>

[![GitHub](https://img.shields.io/badge/Ansh_Singh-GitHub-24292e?style=for-the-badge&logo=github)](https://github.com/anshsingh1032)
[![LinkedIn](https://img.shields.io/badge/Ansh_Singh-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/anshsingh-dev)

</div>
## 🤝 Contributing

Contributions are always welcome!

```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "feat: add amazing feature"

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

<br/>

---

## 📄 License

This project is licensed under the **MIT License**.

<br/>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer&animation=twinkling" width="100%"/>

**⭐ If you found this project helpful, consider starring the repository!**

<br/>

Made with ❤️ by **Ansh Singh** | WebSprint 2026 🏆

</div>