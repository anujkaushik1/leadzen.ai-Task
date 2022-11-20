import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './AllTasks.css'

function AllTasks() {

    const [allTasks, setAllTasks] = useState(null);
    const [createdDate, setCreatedDate] = useState(null)

    return (
        <div className='alltasks-main'>
            <div className="col-lg-6">
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
                            allTasks !== null &&
                            <tbody>
                                {
                                    allTasks.map((task, idx) => (
                                        <tr key={idx}>
                                            <td>{task.id}</td>
                                            <td style={{ paddingLeft: '5rem' }}>{task.current_task}</td>
                                            <td style={{ paddingLeft: '20px' }}>{createdDate[idx]}</td>
                                            <td style={{ position: 'relative', bottom: '4px' }}><button type="button" class="btn btn-danger btn-sm ">Delete</button></td>
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