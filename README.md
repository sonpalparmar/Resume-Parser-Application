# Resume Parser

## Overview

Resume Parser is a web application that allows users to upload resume files (PDF or DOCX) and parse them to extract structured information. The application consists of a React frontend and a Python backend, both containerized using Docker for easy deployment and scalability.

## Features

- Upload resume files (PDF or DOCX format)
- Parse resumes to extract structured information
- Display parsed data in a user-friendly format
- Real-time parsing progress indicator

## Technologies Used

### Frontend
- React.js
- Docker

### Backend
- Python
- FastAPI
- Docker

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Docker and Docker Compose installed on your machine
- Git for version control

## Getting Started

To get Resume Parser running on your local machine, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/resume-parser.git
   cd resume-parser
   ```

2. Create a `.env` file in the root directory with the following content:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```
   Replace `your_google_api_key_here` with your actual Google API key.

3. Create a `.env` file in the `resume-parser-frontend` directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:8080
   ```

4. Build and start the Docker containers:
   ```
   docker compose up --build
   ```

5. Access the application by navigating to `http://localhost:3000` in your web browser.

## Usage

1. Open your web browser and go to `http://localhost:3000`.
2. Click on the "Choose a file" button to select a resume file (PDF or DOCX).
3. Click the "Parse Resume" button to start the parsing process.
4. Wait for the parsing to complete. You'll see a progress indicator during this process.
5. Once parsing is complete, the extracted information will be displayed on the screen.

## Project Structure

```
resume-parser/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   └── ...
│   ├── Dockerfile
│   └── requirements.txt
├── resume-parser-frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── ResumeParser.js
│   │   ├── index.js
│   │   └── ...
│   ├── Dockerfile
│   ├── package.json
│   └── .env
├── docker-compose.yml
├── .env
└── README.md
```

## Contributing

Contributions to Resume Parser are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

If you want to contact me, you can reach me at `your. sonpalparmar20@gmail.com`.

## Acknowledgements

- [React](https://reactjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Docker](https://www.docker.com/)
