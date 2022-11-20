import React, { useEffect } from 'react'
import axios from 'axios'
function Test() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respo = await axios.get('http://127.0.0.1:8000');
                console.log(respo.data);

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    })

    return (
        <div>Test</div>
    )
}

export default Test