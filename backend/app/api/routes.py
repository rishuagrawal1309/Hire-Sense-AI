import os
import shutil

from fastapi import APIRouter, UploadFile, File

from app.services.resume_service import process_resumes
from app.config import MODEL_NAME
from app.services.resume_service import parse_resume_data


router = APIRouter()


UPLOAD_DIR = "data/resumes"
JD_DIR = "data/job_descriptions"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(JD_DIR, exist_ok=True)


@router.get("/")
def home():
    return {
        "message": "Resume Screening API Running"
    }


@router.post("/rank-resumes")
async def rank_resumes(
    jd: UploadFile = File(...),
    resumes: list[UploadFile] = File(...)
):

    jd_path = os.path.join(JD_DIR, jd.filename)

    with open(jd_path, "wb") as buffer:
        shutil.copyfileobj(jd.file, buffer)

    with open(jd_path, "r", encoding="utf-8") as file:
        job_description = file.read()

    resume_paths = []

    for resume in resumes:

        resume_path = os.path.join(
            UPLOAD_DIR,
            resume.filename
        )

        with open(resume_path, "wb") as buffer:
            shutil.copyfileobj(
                resume.file,
                buffer
            )

        resume_paths.append(resume_path)

    results = process_resumes(
        job_description,
        resume_paths
    )

    return {
        "rankings": results
    }

@router.get("/health")
def health_check():

    return {
        "status": "healthy",
        "service": "resume-backend"
    }


@router.get("/model-info")
def model_info():

    return {
        "model_name": MODEL_NAME,
        "service": "AI Resume Screening System"
    }

@router.post("/parse-resume")
async def parse_resume(
    resume: UploadFile = File(...)
):

    resume_path = os.path.join(
        UPLOAD_DIR,
        resume.filename
    )

    with open(resume_path, "wb") as buffer:
        shutil.copyfileobj(
            resume.file,
            buffer
        )

    result = parse_resume_data(resume_path)

    return result