from app.matcher import calculate_similarity


jd = "Python developer with machine learning skills"

resume = "Experienced Python developer skilled in ML and AI"

score = calculate_similarity(jd, resume)

print(score)