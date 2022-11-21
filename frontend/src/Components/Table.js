import React from 'react'

function Table({filterTaskArr, createdDate}) {
  return (
    <div className="row">
      <table class="table">
        <thead >
          <tr>
            <th scope='col'>Task no.</th>
            <th scope="col" style={{ paddingLeft: '5rem' }}>Task</th>
            <th scope="col" ><i class="fas fa-sort-up" />Created At<i class="fas fa-sort-down"> </i></th>
          </tr>
        </thead>

        <tbody>
          {
            filterTaskArr.map((task, idx) => (
              <tr key={idx}>
                <td>{task.id}</td>
                <td style={{ paddingLeft: '5rem' }}>{task.current_task}</td>
                <td style={{ paddingLeft: '20px' }}>{createdDate[idx]}</td>
              </tr>
            ))
          }

        </tbody>

      </table>
    </div>
  )
}

export default Table