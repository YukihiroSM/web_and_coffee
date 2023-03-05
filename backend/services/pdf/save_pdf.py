import pdfkit
from fastapi import APIRouter, Request
from fastapi.responses import FileResponse

from schemas import ResumeItem

router = APIRouter(prefix='/api/file')


@router.post('/save')
def save_pdf(resume: ResumeItem):
    pdf = pdfkit.from_string(resume.about, 'cv.pdf')
    return FileResponse(pdf,
                        media_type="application/pdf",
                        filename="cv.pdf")
