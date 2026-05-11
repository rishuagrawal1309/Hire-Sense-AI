import fitz
import re

from app.utils import clean_text
from app.skills import SKILLS


def extract_text_from_pdf(pdf_path):
    text = ""

    doc = fitz.open(pdf_path)

    for page in doc:
        text += page.get_text()

    return clean_text(text)


def extract_email(text):
    pattern = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"

    match = re.search(pattern, text)

    if match:
        return match.group(0)

    return "Not Found"


def extract_phone(text):
    pattern = r"\+?\d[\d -]{8,12}\d"

    match = re.search(pattern, text)

    if match:
        return match.group(0)

    return "Not Found"


def extract_name(text):
    words = text.split()

    if len(words) >= 2:
        return words[0].title() + " " + words[1].title()

    return "Not Found"


def extract_skills(text):

    text = text.lower()

    found_skills = []

    for skill in SKILLS:
        if skill.lower() in text:
            found_skills.append(skill)

    return list(set(found_skills))