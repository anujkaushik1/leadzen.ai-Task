from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def getTasks():
    return 'Hello World'