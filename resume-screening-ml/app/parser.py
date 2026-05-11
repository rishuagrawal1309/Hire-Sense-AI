import fitz
import re
from app.utils import clean_text


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
    lines = text.split()

    if len(lines) >= 2:
        return lines[0].title() + " " + lines[1].title()

    return "Not Found"