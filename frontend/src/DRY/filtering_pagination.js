export const filteringPagination = (search, taskArr, limit, currPage) => {
    let filterTaskArr = [];

    if (search !== '') {
        filterTaskArr = taskArr.filter((taskObj) => {
            let task = taskObj.current_task.toLowerCase();

            if (task.includes(search.toLowerCase())) {
                return task.includes(search.toLowerCase());
            }
        })
    }
    else {
        filterTaskArr = [...taskArr];
    }

    let pages = Math.ceil(filterTaskArr.length / limit);
    let pagesArr = [];

    for (let i = 1; i <= pages; i++) 
        pagesArr.push(i);

    let startingIdx = (currPage - 1) * limit;
    let endingIdx = parseInt(limit) + startingIdx;

    filterTaskArr = filterTaskArr.slice(startingIdx, endingIdx);

    return [filterTaskArr, pagesArr]
}

