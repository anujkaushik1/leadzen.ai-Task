import React, { useEffect, useState } from 'react'
import { getTasks } from '../redux/actions/getTasksActions';
import './AllTasks.css'
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';


function AllTasks() {

    const [createdDate, setCreatedDate] = useState([]);
    const [text, setText] = useState('');

    const dispatch = useDispatch();
    const getTask = useSelector(state => state.getTasks);
    const {loading, tasks, error} = getTask;
    

    const deleteTaskButton = async(task, idx) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/${task.id}`);
            dispatch(getTasks());
            alert(response.data.msg)
        } catch (error) {
            alert(error.message)
            console.log(error.message);
        }
    }

    const addTask = async() => {
        if(text === ''){
            return ;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/', {current_task: text});
            dispatch(getTasks());
            setText('')
            alert('Task has been added')
        } catch (error) {
            console.log(error.message);
            alert(error.message)   
        }
    }

    useEffect(()=> {
        dispatch(getTasks())

    }, [dispatch])


    useEffect(()=> {
        if(tasks.length !== 0){
            let arr = [];
            tasks.map((task) => {
                let completeDate = task.created_date;
                let date = completeDate.split('T');
                arr.push(date[0]);
            })
            setCreatedDate(arr)
        } 
       
    }, [tasks])


    return (    
        <div className='alltasks-main'>

            <div className='addtask'>

                <input onChange={(e) => setText(e.target.value)} value = {text} type="text" placeholder='Add Task' />
                <button onClick={addTask}><span style={{fontWeight : 'bold', fontSize : '17px'}}>+</span></button>

            </div>

            <div className="col-lg-6 mt-4" >
                <div className="row">
                    <input type="text" className="input-group-text col" placeholder="Search" />
                    <input type="number" className="input-group-text col" placeholder="Rows Count" />
                </div>

                <div className="row">
                    <table class="table">
                        <thead >
                            <tr>
                                <th scope='col'>S.No.</th>
                                <th scope="col" style={{ paddingLeft: '5rem' }}>Task</th>
                                <th scope="col" ><i class="fas fa-sort-up" />Created At<i class="fas fa-sort-down"> </i></th>
                            </tr>
                        </thead>
                        {
                            tasks.length !== 0 &&
                            <tbody>
                                {
                                    tasks.map((task, idx) => (
                                        <tr key={idx}>
                                            <td>{task.id}</td>
                                            <td style={{ paddingLeft: '5rem' }}>{task.current_task}</td>
                                            <td style={{ paddingLeft: '20px' }}>{createdDate[idx]}</td>
                                            <td style={{ position: 'relative', bottom: '4px' }}><button type="button" class="btn btn-danger btn-sm " onClick={()=> deleteTaskButton(task, idx)}>Delete</button></td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        }


                    </table>
                </div>
            </div>
        </div>

    )
}


export default AllTasks