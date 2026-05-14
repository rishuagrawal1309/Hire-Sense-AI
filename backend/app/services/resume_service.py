import os

from app.parser import (
    extract_text_from_pdf,
    extract_email,
    extract_phone,
    extract_name,
    extract_skills
)

from app.matcher import (
    calculate_semantic_similarity,
    calculate_skill_match,
    calculate_final_score
)

def parse_resume_data(resume_path):

    resume_text = extract_text_from_pdf(resume_path)

    return {
        "name": extract_name(resume_text),
        "email": extract_email(resume_text),
        "phone": extract_phone(resume_text),
        "skills": extract_skills(resume_text)
    }

def generate_resume_stats(results):

    total_candidates = len(results)

    average_score = round(
        sum(r["final_score"] for r in results) / total_candidates,
        2
    )

    return {
        "total_candidates": total_candidates,
        "average_score": average_score
    }


def process_resumes(job_description, resume_files):

    jd_skills = extract_skills(job_description)

    results = []

    for resume_path in resume_files:

        resume_text = extract_text_from_pdf(
            resume_path
        )

        resume_skills = extract_skills(
            resume_text
        )

        semantic_score = calculate_semantic_similarity(
            job_description,
            resume_text
        )

        skill_score = calculate_skill_match(
            jd_skills,
            resume_skills
        )

        final_score = calculate_final_score(
            semantic_score,
            skill_score
        )

        candidate_data = {
            "resume": os.path.basename(resume_path),
            "name": extract_name(resume_text),
            "email": extract_email(resume_text),
            "phone": extract_phone(resume_text),
            "skills": resume_skills,
            "semantic_score": semantic_score,
            "skill_match_score": skill_score,
            "final_score": final_score
        }

        results.append(candidate_data)

    ranked_results = sorted(
        results,
        key=lambda x: x["final_score"],
        reverse=True
    )

    return ranked_results