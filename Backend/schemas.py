from pydantic import BaseModel

class Tasks(BaseModel):
    current_task : str