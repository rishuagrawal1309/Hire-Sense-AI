import os
import json

from app.config import (
    RESUME_FOLDER,
    JD_FOLDER,
    OUTPUT_FOLDER
)

from app.parser import (
    extract_text_from_pdf,
    extract_email,
    extract_phone,
    extract_name
)

from app.matcher import calculate_similarity
from app.ranking import rank_resumes


def run_pipeline():

    jd_files = os.listdir(JD_FOLDER)

    if len(jd_files) == 0:
        print("No Job Description Found")
        return

    jd_path = os.path.join(JD_FOLDER, jd_files[0])

    with open(jd_path, "r", encoding="utf-8") as file:
        job_description = file.read()

    resumes = os.listdir(RESUME_FOLDER)

    results = []

    for resume in resumes:

        resume_path = os.path.join(RESUME_FOLDER, resume)

        resume_text = extract_text_from_pdf(resume_path)

        score = calculate_similarity(
            job_description,
            resume_text
        )

        candidate_data = {
            "resume": resume,
            "name": extract_name(resume_text),
            "email": extract_email(resume_text),
            "phone": extract_phone(resume_text),
            "score": score
        }

        results.append(candidate_data)

    ranked_results = rank_resumes(results)

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    output_path = os.path.join(
        OUTPUT_FOLDER,
        "ranked_resumes.json"
    )

    with open(output_path, "w") as json_file:
        json.dump(ranked_results, json_file, indent=4)

    print("\nResume Ranking Completed\n")

    for idx, candidate in enumerate(ranked_results, start=1):
        print(
            f"{idx}. {candidate['resume']} --> {candidate['score']}%"
        )