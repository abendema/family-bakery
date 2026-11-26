from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.database import get_db
from app.routers import categories, products

app = FastAPI(title="Family Bakery API")

# Allow the Angular app running locally to access the backend API from the browser.
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(categories.router)

app.include_router(products.router)


# Test Root endpoint (/)
@app.get("/")
def home():
    return {"message": "Welcome to Family Bakery API"}


# Database connectivity check (/db-check)
@app.get("/db-check")
def health_db(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"database": "connected"}
