import React from 'react'

function Pagination({pagesArr, setCurrPage}) {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {
                    pagesArr.map((page, idx) => (
                        <li key={idx} className="page-item"><a className="page-link" onClick={() => setCurrPage(page)}>{page}</a></li>
                    ))
                }

            </ul>
        </nav>
    )
}

export default Pagination