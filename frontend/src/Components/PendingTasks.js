import React, { useEffect, useState } from 'react'
import { getPendingTasks } from '../redux/actions/getPendingTasksAction';
import './PendingTasks.css'
import {useSelector, useDispatch} from 'react-redux';

function PendingTasks() {

    const [createdDate, setCreatedDate] = useState([])

    const dispatch = useDispatch();
    const getTask = useSelector(state => state.getPendingTasks);
    const {loading, tasks, error} = getTask;

    useEffect(()=> {
        dispatch(getPendingTasks())

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
        <div className='pendingtasks-main'>
            <div className="col-lg-6">
                <div className="row">
                    <input type="text" className="input-group-text col" placeholder="Search" />
                    <input type="number" className="input-group-text col" placeholder="Rows Count" />
                </div>

                <div className="row">
                    <table class="table">
                        <thead >
                            <tr>
                                <th scope='col'>Task no.</th>
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


export default PendingTasks