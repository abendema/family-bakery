from fastapi import FastAPI

app = FastAPI(title="Family Bakery API")


# Test Root endpoint (/)
@app.get("/")
def home():
    return {"message": "Welcome to Family Bakery API"}


# Test endpoint (/test)
@app.get("/test")
def test():
    return {"status": "OK"}