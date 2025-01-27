// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'

// function Svg() {
//     const [count, setCount] = useState(0);

//     const handleChange = (e) => {
//         setCount(Number(e.target.value)); // Ensure the count is treated as a number
//     }

//     useEffect(() => {
//         console.log(count);
//     }, [count]);

//     return (
//         <Div>
//             <input 
//                 type="number" 
//                 value={count} 
//                 onChange={handleChange} 
//                 min="1" // Prevents the user from entering negative numbers or zero
//             />
//             <div>
//                 {[...Array(count)].map((_, index) => (
//                     <svg key={index}>
//                         <path
//                             d="
//                                 m10 10
//                                 h100
//                                 v50
//                                 h50
//                                 h-50
//                                 v50
//                                 h-100
//                             "
//                             stroke="black"
//                             strokeWidth="2"
//                             fill="none"
//                         />
//                     </svg>
//                 ))}
//             </div>
//         </Div>
//     )
// }

// export default Svg

// const Div = styled.div`
// width: 100vw;
// height: 100vh;

// input {
//     margin-bottom: 20px;
// }

// svg {
//     height: 200px; /* You can adjust the size of each SVG */
//     width: 200px;
//     margin-bottom: 10px; /* Add spacing between SVGs */
//     display: block;
// }
// `


import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function InputAndSvg() {
    const [count, setCount] = useState(0);

    const handleChange = (e) => {
        setCount(Number(e.target.value)); // Ensure the count is treated as a number
    };

    useEffect(() => {
        console.log(count);
    }, [count]);

    return (
        <Container>

            <div>
                <input
                    type="number"
                    value={count}
                    onChange={handleChange}
                    min="1" // Prevents the user from entering negative numbers or zero
                    placeholder="Enter count"
                />
            </div>
            <div className='tie-sheet'>
                <div className="input-list">
                    {[...Array(count)].map((_, index) => (
                        <input key={index} placeholder={`Input ${index + 1}`} />
                    ))}
                </div>

                <div className="svg-column">
                    {[...Array(Math.floor(count / 2))].map((_, index) => (
                        <svg key={index}>
                            <path
                                d="
                                m10 10
                                h25
                                v25
                                h25
                                h-25
                                v25
                                h-25
                            "
                                stroke="black"
                                strokeWidth="2"
                                fill="none"
                            />
                        </svg>
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default InputAndSvg;

const Container = styled.div`
    width: 100%;
    padding: 20px;

    .input-column, .svg-column {
        // flex: 1; /* Make columns equal in width */
        display: flex;
        gap: 10px;
    }

    input[type="number"] {
        margin-bottom: 20px;
        padding: 5px;
        border: 2px solid black;
        border-radius: 5px;
    }

    .tie-sheet{
        display: flex;
        gap: 10px;
    }

    .input-list input {
        display: block;
        margin-bottom: 20px;
        padding: 5px;
        border: 2px solid black;
        border-radius: 5px;
        width: 100%;
        max-width: 200px;
    }

    .svg-column {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    svg {
        height: 80px; /* Adjust size of SVGs */
        width: 50px;
    }
`;
