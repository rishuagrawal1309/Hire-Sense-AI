from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from app.config import MODEL_NAME


model = SentenceTransformer(MODEL_NAME)


def get_embedding(text):
    return model.encode(text)


def calculate_similarity(job_description, resume_text):
    jd_embedding = get_embedding(job_description)
    resume_embedding = get_embedding(resume_text)

    similarity_score = cosine_similarity(
        [jd_embedding],
        [resume_embedding]
    )[0][0]

    return round(float(similarity_score) * 100, 2)