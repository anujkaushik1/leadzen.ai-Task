import React, { useEffect, useState } from 'react'
import { getPendingTasks } from '../redux/actions/getPendingTasksAction';
import './PendingTasks.css'
import { useSelector, useDispatch } from 'react-redux';
import Search from './Search';
import Pagination from './Pagination';
import { filteringPagination } from '../DRY/filtering_pagination';
import Table from './Table';


function PendingTasks() {
    const [taskArr, setTaskArr] = useState([]);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(4);
    const [currPage, setCurrPage] = useState(1)

    const dispatch = useDispatch();
    const getTask = useSelector(state => state.getPendingTasks);
    const { loading, tasks, error } = getTask;

    useEffect(() => {
        dispatch(getPendingTasks())

    }, [dispatch])

    useEffect(() => {

        if (tasks.length !== 0) {
            setTaskArr(tasks)
        }

    }, [tasks])

    let filterTaskArr = [];
    let pagesArr = [];

    [filterTaskArr, pagesArr] = filteringPagination(search, taskArr, limit, currPage);


    return (
        <div className='completedtasks-main'>
            <div className="col-lg-6 pendingtask-table col-sm-12">
                <Search search={search} setSearch={setSearch} limit={limit} setLimit={setLimit} />
                <Table filterTaskArr = {filterTaskArr} taskArr = {taskArr} setTaskArr = {setTaskArr} />
                <Pagination pagesArr={pagesArr} setCurrPage={setCurrPage} />

            </div>
        </div>

    )
}


export default PendingTasks