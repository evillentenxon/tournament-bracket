// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// function TournamentBracket() {
//     const [input, setInput] = useState(8); // Default number of teams
//     const [visible, setVisible] = useState(false);
//     const [error, setError] = useState('');
//     const [players, setPlayers] = useState([]); // Store player data

//     // Shuffle function using Fisher-Yates algorithm
//     const shufflePlayers = (array) => {
//         const shuffled = [...array];
//         for (let i = shuffled.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//         }
//         return shuffled;
//     };

//     const handleClick = () => {
//         if (input > 1) {
//             setError('');
//             setVisible(true);
//         } else {
//             setError('Please enter a number that is a power of 2 (e.g., 2, 4, 8, 16).');
//             setVisible(false);
//         }
//     };

//     const handleShuffle = () => {
//         const shuffled = shufflePlayers(players);
//         setPlayers(shuffled);
//     };

//     const generateBrackets = (participants) => {
//         const rounds = [];
//         let currentRound = participants;

//         while (currentRound >= 1) {
//             rounds.push(currentRound);
//             currentRound = Math.floor(currentRound / 2);
//         }

//         return rounds;
//     };

//     const rounds = generateBrackets(input);

//     useEffect(() => {
//         fetch('http://localhost:4000/tour/tournament/678663b4c160c4d169a0bce9/fetchPaticipants')
//             .then((response) => response.json())
//             .then((data) => {
//                 setPlayers(data.participants); // Assuming the API response has a 'participants' key
//                 setInput(data.participants.length); // Set input to the number of players
//             })
//             .catch((err) => console.error('Error loading players:', err));
//     }, []);

//     return (
//         <Div>
//             <div className="centered">
//                 <h1 className="title">Tournament Bracket</h1>
//                 <h3 className="subtitle">Number of players: {input}</h3>
//                 <button onClick={handleClick} className="action-button">See Brackets</button>

//                 {error && <p className="error">{error}</p>}
//             </div>
//             {visible && (
//                 <div className="brackets">
//                     {rounds.map((round, roundIndex) => (
//                         <div key={roundIndex} className="column">
//                             {/* First column: Display shuffled player names */}
//                             {roundIndex === 0
//                                 ? Array.from({ length: round }, (_, i) => (
//                                     <input
//                                         key={`${roundIndex}-${i}`}
//                                         value={players[i]?.username || ''} // Display player username or leave blank if not available
//                                         readOnly
//                                         className="player-input"
//                                     />
//                                 ))
//                                 : // Other columns: Empty input boxes
//                                 Array.from({ length: round }, (_, i) => (
//                                     <input key={`${roundIndex}-${i}`} className="empty-input" />
//                                 ))}
//                         </div>
//                     ))}
//                 </div>
//             )}

//             <button onClick={handleShuffle} className="action-button">Shuffle Players</button>
//         </Div>
//     );
// }

// export default TournamentBracket;

// const Div = styled.div`
//     background: #1d1f2f;
//     color: #fff;
//     font-family: 'Press Start 2P', cursive;
//     text-align: center;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.7);

//     .centered {
//         margin-bottom: 20px;
//     }

//     .title {
//         font-size: 2.5rem;
//         color: #ffbf00; /* Golden yellow */
//         margin-bottom: 10px;
//     }

//     .subtitle {
//         font-size: 1.2rem;
//         color: #b0b0b0;
//         margin-bottom: 20px;
//     }

//     .error {
//         color: #ff4c4c; /* Red for error */
//         font-size: 1rem;
//         margin-top: 10px;
//     }

//     .action-button {
//         background-color: #ffbf00;
//         border: none;
//         padding: 10px 20px;
//         font-size: 1.2rem;
//         margin: 10px 0;
//         cursor: pointer;
//         border-radius: 5px;
//         transition: background-color 0.3s ease;
//     }

//     .action-button:hover {
//         background-color: #ff9900;
//     }

//     .brackets {
//         display: flex;
//         justify-content: center;
//         gap: 20px;
//     }

//     .column {
//         display: flex;
//         flex-direction: column;
//         justify-content: space-evenly;
//         gap: 15px;
//     }

//     input {
//         padding: 12px;
//         border: 2px solid #ffbf00;
//         border-radius: 5px;
//         background-color: #333;
//         color: #fff;
//         font-size: 1rem;
//         width: 150px;
//         text-align: center;
//     }

//     .player-input {
//         background-color: #444;
//         font-size: 1.1rem;
//     }

//     .empty-input {
//         background-color: #222;
//         font-size: 1rem;
//     }
// `;



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