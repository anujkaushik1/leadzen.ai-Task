from fastapi import FastAPI, Depends
import schemas
import models

from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

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
def addTask(task : schemas.Tasks, session : Session = Depends(get_session)):
    taskObject = models.Tasks(current_task = task.current_task)
    session.add(taskObject)
    session.commit()
    session.refresh(taskObject)
    return taskObject   

#Delete a Task
@app.delete('/{id}')
def deleteTask(id : int, session : Session = Depends(get_session)):
    try:
        itemObject = session.query(models.Tasks).get(id)
        session.delete(itemObject)
        session.commit()
        session.close()
        return 'Task has been deleted'
    
    except SQLAlchemyError as e:
        return 'Please enter correct task id'



