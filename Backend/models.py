from sqlalchemy import Column, Integer, String, DateTime
from database import Base
import datetime

class Tasks(Base):  # Tasks Class Inherits from Base Class
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key = True)
    current_task = Column(String(256))
    created_date = Column(DateTime, default = datetime.datetime.utcnow)


