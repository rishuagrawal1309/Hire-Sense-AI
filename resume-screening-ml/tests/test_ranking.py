from app.ranking import rank_resumes


data = [
    {"resume": "a.pdf", "score": 70},
    {"resume": "b.pdf", "score": 90},
    {"resume": "c.pdf", "score": 80}
]

print(rank_resumes(data))