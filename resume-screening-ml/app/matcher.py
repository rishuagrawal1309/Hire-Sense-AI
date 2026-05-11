from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from app.config import MODEL_NAME


model = SentenceTransformer(MODEL_NAME)


def get_embedding(text):
    return model.encode(text)


def calculate_semantic_similarity(job_description, resume_text):

    jd_embedding = get_embedding(job_description)

    resume_embedding = get_embedding(resume_text)

    similarity_score = cosine_similarity(
        [jd_embedding],
        [resume_embedding]
    )[0][0]

    return round(float(similarity_score) * 100, 2)


def calculate_skill_match(jd_skills, resume_skills):

    if len(jd_skills) == 0:
        return 0

    matched_skills = set(jd_skills).intersection(set(resume_skills))

    score = (len(matched_skills) / len(jd_skills)) * 100

    return round(score, 2)


def calculate_final_score(semantic_score, skill_score):

    final_score = (
        0.7 * semantic_score
        +
        0.3 * skill_score
    )

    return round(final_score, 2)