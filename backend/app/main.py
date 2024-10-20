from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from langchain_google_genai import ChatGoogleGenerativeAI
from PyPDF2 import PdfReader
from dotenv import load_dotenv
from docx import Document  # Ensure this is the correct import from python-docx
import os
import json
import shutil
import re
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
# Initialize Google LLM
llm = ChatGoogleGenerativeAI(
    google_api_key=GOOGLE_API_KEY,
    model='gemini-1.5-pro',
    temperature=0.7,
    handle_parsing_errors=True
)

def extract_text_from_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

# Function to extract text from DOCX
def extract_text_from_docx(file_path):
    doc = Document(file_path)
    text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
    return text

# Function to handle text extraction based on file type
def extract_text_from_file(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    if ext == '.pdf':
        return extract_text_from_pdf(file_path)
    elif ext == '.docx':
        return extract_text_from_docx(file_path)
    else:
        raise ValueError(f"Unsupported file format: {ext}")

def extract_json_from_text(text):
    # Try to find JSON-like content within the text
    match = re.search(r'\{.*\}', text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group())
        except json.JSONDecodeError:
            return None
    return None

@app.post("/upload_resume/")
async def upload_resume(file: UploadFile = File(...)):
    try:
        # Save the uploaded file temporarily
        file_location = f"temp_{file.filename}"
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract text from the uploaded file
        resume_text = extract_text_from_file(file_location)
        os.remove(file_location)

        # Prepare prompt
        prompt = f"""
        Please extract the following details from the given resume text in JSON format:

        - Full Name
        - Email Address
        - Phone Number
        - Education details (degree, institution name, graduation year)
        - Work Experience (job title, company, start and end dates, description of responsibilities)
        - Skills (list the skills in bullet points)
        - Certifications (if any, with issuing authority and dates)
        - Any additional information like awards, publications, or interests

        Ensure the output is in valid JSON format. Here's an example of the expected format:

        {{
          "name": "John Doe",
          "email": "johndoe@example.com",
          "phone": "555-1234",
          "education": [
            {{
              "degree": "B.Sc. Computer Science",
              "institution": "University of Example",
              "graduation_year": "2020"
            }}
          ],
          "experience": [
            {{
              "job_title": "Software Engineer",
              "company": "TechCorp",
              "start_date": "2021-01",
              "end_date": "2023-05",
              "responsibilities": "Developed web applications and managed databases."
            }}
          ],
          "skills": [
            "Python",
            "JavaScript",
            "Machine Learning"
          ],
          "certifications": [
            {{
              "name": "Certified Kubernetes Administrator",
              "issuing_authority": "Linux Foundation",
              "date": "2022"
            }}
          ],
          "additional_info": [
            "Published research paper on AI in healthcare."
          ]
        }}

        Resume Text: {resume_text}

        Please provide only the JSON output, without any additional text or explanations.
        """

        # Invoke LLM to parse the resume
        parsed_resume = llm.invoke(prompt)
        # print("LLM Response: ", parsed_resume.content)  # Debugging: check LLM response

        # Try to parse LLM response as JSON
        try:
            parsed_data = json.loads(parsed_resume.content)
        except json.JSONDecodeError as e:
            print("JSON Decoding Error: ", e)  # Debugging: handle JSON errors
            
            # Attempt to extract JSON from the text response
            extracted_json = extract_json_from_text(parsed_resume.content)
            if extracted_json:
                parsed_data = extracted_json
            else:
                raise HTTPException(status_code=500, detail="Failed to parse LLM response as JSON")
        # print(parsed_data)
        return JSONResponse(content=parsed_data)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        print("General Error: ", e)  # Debugging: catch general errors
        raise HTTPException(status_code=500, detail="An error occurred while processing the file.")