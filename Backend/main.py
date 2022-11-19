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
    try:
        taskObject = session.query(models.Tasks).all()
        return taskObject
    
    except SQLAlchemyError as e:
        return 'Something went wrong',  str(e.__doc__)

# Add a Task
@app.post('/')
def addTask(task : schemas.Tasks, session : Session = Depends(get_session)):
    try:
        taskObject = models.Tasks(current_task = task.current_task)
        session.add(taskObject)
        session.commit()
        session.refresh(taskObject)
        return taskObject  

    except SQLAlchemyError as e:
        return 'Something went wrong',  str(e.__doc__)

#Delete a Task
@app.delete('/{id}')
def deleteTask(id : int, session : Session = Depends(get_session)):
    try:
        taskObject = session.query(models.Tasks).get(id)
        session.delete(taskObject)
        session.commit()
        session.close()
        return 'Task has been deleted'
    
    except SQLAlchemyError as e:
        return 'Please enter correct task id'


# Mark as Completed
@app.put('/completed/{id}')
def completeATask(id : int, session : Session = Depends(get_session)):
    try:
        taskObject = session.query(models.Tasks).get(id)
        taskObject.completed_task = True
        session.commit()
        return taskObject
    
    except SQLAlchemyError as e:
        return 'Something went wrong',  str(e.__doc__)

# List of Completed Tasks
@app.get('/completed')
def completedTasks(session : Session = Depends(get_session)):
    try:
        taskObject = session.query(models.Tasks).filter(models.Tasks.completed_task == True).all()
        return taskObject
    
    except SQLAlchemyError as e:
        return 'Something went wrong',  str(e.__doc__)

# List of Pending Taks
@app.get('/pending')
def pendingTasks(session : Session = Depends(get_session)):
    try:
        taskObject = session.query(models.Tasks).filter(models.Tasks.completed_task == False).all()
        return taskObject

    except SQLAlchemyError as e:
        return 'Something went wrong',  str(e.__doc__)
