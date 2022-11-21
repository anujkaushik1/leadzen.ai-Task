import React from 'react'

function Table({ filterTaskArr, taskArr, setTaskArr }) {

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

  return (
    <div className="row">
      <table class="table">
        <thead >
          <tr>
            <th scope='col'>Task no.</th>
            <th scope="col" style={{ paddingLeft: '5rem' }}>Task</th>
            <th scope="col" ><i class="fas fa-sort-up" onClick={sortDatesDesc} />Created At<i class="fas fa-sort-down" onClick={sortDatesAsc}> </i></th>
          </tr>
        </thead>

        <tbody>
          {
            filterTaskArr.map((task, idx) => (
              <tr key={idx}>
                <td>{task.id}</td>
                <td style={{ paddingLeft: '5rem' }}>{task.current_task}</td>
                <td style={{ paddingLeft: '20px' }}>{task.created_date}</td>
              </tr>
            ))
          }

        </tbody>

      </table>
    </div>
  )
}

export default Table