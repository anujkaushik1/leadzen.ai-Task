from fastapi import FastAPI, Depends
import schemas
import models

from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session

# create database if not created
Base.metadata.create_all(engine)

def get_session():
    session = SessionLocal()
    try:
        yield session
    
    finally:
        session.close()

app = FastAPI()

# Get All Tasks
@app.get('/')
def getTasks(session : Session = Depends(get_session)):
    taskObject = session.query(models.Tasks).all()
    return taskObject

# Add a Task
@app.post('/')
def addTasks(task : schemas.Tasks, session : Session = Depends(get_session)):
    taskObject = models.Tasks(current_task = task.current_task)
    session.add(taskObject)
    session.commit()
    session.refresh(taskObject)
    return taskObject   


