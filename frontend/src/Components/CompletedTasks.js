import React, { useEffect, useState } from 'react'
import { getCompletedTask } from '../redux/actions/getCompletedActions';
import './CompletedTasks.css'
import { useSelector, useDispatch } from 'react-redux';
import { filteringPagination } from '../DRY/filtering_pagination';
import Pagination from './Pagination';
import Search from './Search';
import Table from './Table';

function CompletedTasks() {

    const [createdDate, setCreatedDate] = useState([])
    const [text, setText] = useState('');
    const [taskArr, setTaskArr] = useState([]);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(4);
    const [currPage, setCurrPage] = useState(1)

    const dispatch = useDispatch();
    const getTask = useSelector(state => state.getCompletedTasks);
    const { loading, tasks, error } = getTask;


    useEffect(() => {
        dispatch(getCompletedTask())

    }, [dispatch])

    useEffect(() => {
        if (tasks.length !== 0) {
            let arr = [];
            tasks.map((task) => {
                let completeDate = task.created_date;
                let date = completeDate.split('T');
                arr.push(date[0]);
            })
            setCreatedDate(arr)

            setTaskArr(tasks);
        }

    }, [tasks])

    let filterTaskArr = [];
    let pagesArr = [];

    [filterTaskArr, pagesArr] = filteringPagination(search, taskArr, limit, currPage);

    return (
        <div className='completedtasks-main'>
            <div className="col-lg-6">
                <Search search={search} setSearch={setSearch} limit={limit} setLimit={setLimit} />
                <Table filterTaskArr = {filterTaskArr} createdDate = {createdDate} />
                <Pagination pagesArr={pagesArr} setCurrPage={setCurrPage} />

            </div>
        </div>

    )
}


export default CompletedTasks;