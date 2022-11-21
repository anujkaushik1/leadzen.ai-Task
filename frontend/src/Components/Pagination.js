import React from 'react'

function Pagination({pagesArr, setCurrPage}) {
    return (
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                {
                    pagesArr.map((page, idx) => (
                        <li key={idx} class="page-item"><a class="page-link" onClick={() => setCurrPage(page)}>{page}</a></li>
                    ))
                }

            </ul>
        </nav>
    )
}

export default Pagination