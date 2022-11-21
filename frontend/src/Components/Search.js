import React from 'react'

function Search({search, setSearch, limit, setLimit}) {
    return (
        <div className="row">
            <input type="text" className="input-group-text col" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <input type="number" className="input-group-text col" placeholder="Rows Count" value={limit} onChange={(e) => setLimit(e.target.value)} min="1" />
        </div>
    )
}

export default Search