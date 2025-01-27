import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

function Input() {
    const [count, setCount] = useState();
    const[inputFields, setInputFields] = useState([]);

    useEffect(() => {
        console.log(count);
    }, [count]);

    useEffect(() => {
        const fields = [];
        for (let i = 0; i < count; i++) {
            fields.push(<input key={i} placeholder={`Input ${i + 1}`} />);
        }
        setInputFields(fields);
    }, [count]);


    const handleChange = (e) => {
        setCount(e.target.value);
        console.log(count);
    }
    return (
        <Div>
            <input onChange={handleChange} type="number" />
            <div className='input_list'>
                {inputFields}
            </div>
        </Div>
    )
}

export default Input

const Div = styled.div`
width: 100%;
height: 100%;

input[type=number]{
margin-bottom: 20px;
}

.input_list{
display: flex;
flex-direction: column;
width: 200px;
gap: 20px;
}

input{
border: 2px solid black;
padding: 5px;
border-radius: 5px;
}
`