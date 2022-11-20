from fastapi import FastAPI, Depends, Response, status
from fastapi.middleware.cors import CORSMiddleware
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


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get All Tasks
@app.get('/')
def getTasks(response : Response, session : Session = Depends(get_session)):
    try:
        taskObject = session.query(models.Tasks).all()
        
        return {
            'success' : True,
            'data' : taskObject
          }
    
    except SQLAlchemyError as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
            'success' : False,
            'msg' : 'Something went wrong',
            'error' : str(e.__doc__)
        }
        

# Add a Task
@app.post('/')
def addTask(task : schemas.Tasks, response : Response, session : Session = Depends(get_session)):
    try:
        taskObject = models.Tasks(current_task = task.current_task)
        session.add(taskObject)
        session.commit()
        session.refresh(taskObject)

        response.status_code = status.HTTP_201_CREATED
        return {
            'success' : True,
            'data' : taskObject,
            
        }

    except SQLAlchemyError as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
            'success' : False,
            'msg' : 'Something went wrong',
            'error' : str(e.__doc__)
        }

#Delete a Task
@app.delete('/{id}')
def deleteTask(id : int,  response : Response ,session : Session = Depends(get_session)):
    try:
        taskObject = session.query(models.Tasks).get(id)
        
        if not taskObject:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {
                'success' : False,
                'error' : f"Task with id: {id} was not found"
            }
        
        session.delete(taskObject)
        session.commit()
        session.close()

        return {
            'success' : True,
            'msg' : 'Task has been deleted'
        }
    
    except SQLAlchemyError as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
            'success' : False,
            'msg' : 'Something went wrong',
            'error' : str(e.__doc__)
        }


# Mark as Completed
@app.put('/completed/{id}')
def completeATask(id : int, response : Response, session : Session = Depends(get_session)):
    try:
        taskObject = session.query(models.Tasks).get(id)

        if not taskObject:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {
                'success' : False,
                'error' : f"Task with id: {id} was not found"
            }
            
        taskObject.completed_task = True
        session.commit()
        
        return {
            'success' : True,
            'data' : taskObject,
        }
    
    except SQLAlchemyError as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
            'success' : False,
            'msg' : 'Something went wrong',
            'error' : str(e.__doc__)
        }

# List of Completed Tasks
@app.get('/completed')
def completedTasks(response : Response, session : Session = Depends(get_session)):
    try:
        taskObject = session.query(models.Tasks).filter(models.Tasks.completed_task == True).all()
        
        return {
            'success' : True,
            'data' : taskObject
          }
    
    except SQLAlchemyError as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
            'success' : False,
            'msg' : 'Something went wrong',
            'error' : str(e.__doc__)
        }

# List of Pending Taks
@app.get('/pending')
def pendingTasks(response : Response, session : Session = Depends(get_session)):
    try:
        taskObject = session.query(models.Tasks).filter(models.Tasks.completed_task == False).all()
        
        return {
            'success' : True,
            'data' : taskObject
          }

    except SQLAlchemyError as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
            'success' : False,
            'msg' : 'Something went wrong',
            'error' : str(e.__doc__)
        }
