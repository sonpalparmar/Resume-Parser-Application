# 📄 Resume Parser 🤖

## 🌟 Overview 

**Resume Parser** is an intelligent web application designed to streamline the resume parsing process. By leveraging modern web technologies and AI-powered parsing, this tool helps professionals and recruiters extract structured information from resume files quickly and efficiently.

## ✨ Key Features

- 📤 **File Upload Support**
  - Accept PDF and DOCX resume formats
  - Seamless file selection interface

- 🧠 **Smart Parsing**
  - Advanced AI-powered information extraction
  - Structured data output
  - Real-time parsing progress tracking

- 🖥️ **Modern Tech Stack**
  - Robust React.js frontend
  - Powerful Python FastAPI backend
  - Containerized with Docker for easy deployment

## 🛠️ Technologies Ecosystem

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

## 📋 Prerequisites

Before you begin, ensure you have:

- 🐳 Docker and Docker Compose
- 🌐 Git
- 🔑 Google API Key

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/resume-parser.git
cd resume-parser
```

### 2. Configuration

#### Backend Configuration
Create `.env` in root directory:
```env
GOOGLE_API_KEY=your_google_api_key_here
```

#### Frontend Configuration
Create `.env` in `resume-parser-frontend`:
```env
REACT_APP_API_URL=http://localhost:8080
```

### 3. Launch Application
```bash
docker compose up --build
```

🌐 Access the app at: `http://localhost:3000`

## 🎯 Usage Workflow

1. 📂 Select Resume File (PDF/DOCX)
2. 🖱️ Click "Parse Resume"
3. ⏳ Watch Real-time Progress
4. 📊 View Extracted Information

## 🗂️ Project Structure

```
resume-parser/
├── 🖥️ backend/
│   ├── 📜 app/
│   │   ├── main.py
│   │   └── ...
│   ├── 🐳 Dockerfile
│   └── 📦 requirements.txt
├── 🌐 resume-parser-frontend/
│   ├── 🏠 public/
│   ├── 💻 src/
│   │   ├── App.js
│   │   ├── ResumeParser.js
│   │   └── ...
│   ├── 🐳 Dockerfile
│   └── 📦 package.json
└── 🐳 docker-compose.yml
```

## 🤝 Contributing

Contributions are welcome! 

### How to Contribute
1. 🍴 Fork the repository
2. 🌿 Create a new branch
3. 🔨 Make your changes
4. 🧪 Test thoroughly
5. 📤 Submit a Pull Request

## 📜 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📞 Contact

- 📧 Email: sonpalparmar20@gmail.com
- 🐙 GitHub: [https://github.com/sonpalparmar]

## 🙌 Acknowledgements

- [React](https://reactjs.org/) - Frontend Framework
- [FastAPI](https://fastapi.tiangolo.com/) - Python Web Framework
- [Docker](https://www.docker.com/) - Containerization Platform
- [GenAI](https://python.langchain.com/api_reference/google_genai/) - AI Integration

---

**Made with ❤️ by Sonpal Parmar**
