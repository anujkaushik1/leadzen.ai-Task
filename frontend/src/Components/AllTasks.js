import React, { useEffect, useState } from 'react'
import { getTasks } from '../redux/actions/getTasksActions';
import './AllTasks.css'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Simulate } from 'react-dom/test-utils';
import { filteringPagination } from '../DRY/filtering_pagination';
import Pagination from './Pagination';
import Search from './Search';



function AllTasks() {
    const [text, setText] = useState('');
    const [taskArr, setTaskArr] = useState([]);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(4);
    const [currPage, setCurrPage] = useState(1)

    const dispatch = useDispatch();
    const getTask = useSelector(state => state.getTasks);
    const { loading, tasks, error } = getTask;


    const deleteTaskButton = async (task, idx) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/${task.id}`);
            dispatch(getTasks());
            alert(response.data.msg)
        } catch (error) {
            alert(error.message)
            console.log(error.message);
        }
    }

    const addTask = async () => {
        if (text === '') {
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/', { current_task: text });
            dispatch(getTasks());
            setText('')
            alert('Task has been added')
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
    }

    const completedTask = async (id) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/completed/${id}`);

            response.data.data.completed_task && alert('Task has been completed')


            dispatch(getTasks());
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
    }

    const sortDatesDesc = () => {
        let datesArr = [...taskArr];
        datesArr.sort((a, b) => {
            return new Date(b.created_date) - new Date(a.created_date)
        })

        setTaskArr([...datesArr])
    }

    const sortDatesAsc = () => {
        let datesArr = [...taskArr];
        datesArr.sort((a, b) => {
            return new Date(a.created_date) - new Date(b.created_date)
        })

        setTaskArr([...datesArr])
    }

    useEffect(() => {
        dispatch(getTasks())

    }, [dispatch])


    useEffect(() => {
        if (tasks.length !== 0) {
            setTaskArr(tasks);
        }

    }, [tasks])

    let filterTaskArr = [];
    let pagesArr = [];

    [filterTaskArr, pagesArr] = filteringPagination(search, taskArr, limit, currPage);


    return (
        <div className='alltasks-main'>

            <div className='addtask'>

                <input onChange={(e) => setText(e.target.value)} value={text} type="text" placeholder='Add Task' />
                <button onClick={addTask}><span style={{ fontWeight: 'bold', fontSize: '17px' }}>+</span></button>

            </div>

            <div className="col-lg-6 mt-4" >
                
                <Search limit={limit} search = {search} setSearch = {setSearch} setLimit = {setLimit}/>

                <div className="row">
                    <table class="table">
                        <thead >
                            <tr>
                                <th scope='col'>Task No.</th>
                                <th scope="col" style={{ paddingLeft: '5rem' }}>Task</th>
                                <th scope="col" ><i class="fas fa-sort-up" onClick={sortDatesDesc} />Created At<i class="fas fa-sort-down" onClick={sortDatesAsc}> </i></th>
                                <th scope="col" >Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                filterTaskArr.map((task, idx) => (
                                    <tr key={idx}>
                                        <td>{task.id}</td>
                                        <td style={{ paddingLeft: '5rem' }}>{task.current_task}</td>
                                        <td style={{ paddingLeft: '20px' }}>{task.created_date}</td>
                                        <td>
                                            <div style={{ paddingLeft: '2rem' }} class="form-check">
                                                <input class="form-check-input" type="checkbox" checked={task.completed_task} onChange={() => completedTask(task.id)} />
                                            </div>
                                        </td>
                                        <td style={{ position: 'relative', bottom: '4px' }}><button type="button" class="btn btn-danger btn-sm " onClick={() => deleteTaskButton(task, idx)}>Delete</button></td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>

                <Pagination pagesArr = {pagesArr} setCurrPage = {setCurrPage} />

            </div>
        </div>

    )
}


export default AllTasks