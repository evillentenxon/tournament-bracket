import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function TournamentBracket() {
    const [input, setInput] = useState(8); // Default number of teams
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');
    const [players, setPlayers] = useState([]); // Store player data

    // Shuffle function using Fisher-Yates algorithm
    const shufflePlayers = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const handleClick = () => {
        if (input > 1) {
            setError('');
            setVisible(true);
        } else {
            setError('Please enter a number that is a power of 2 (e.g., 2, 4, 8, 16).');
            setVisible(false);
        }
    };

    const handleShuffle = () => {
        const shuffled = shufflePlayers(players);
        setPlayers(shuffled);
    };

    const generateBrackets = (participants) => {
        const rounds = [];
        let currentRound = participants;

        while (currentRound >= 1) {
            rounds.push(currentRound);
            currentRound = Math.floor(currentRound / 2);
        }

        return rounds;
    };

    const rounds = generateBrackets(input);

    useEffect(() => {
        fetch('http://localhost:4000/tour/tournament/678663b4c160c4d169a0bce9/fetchPaticipants')
            .then((response) => response.json())
            .then((data) => {
                setPlayers(data.participants); // Assuming the API response has a 'participants' key
                setInput(data.participants.length); // Set input to the number of players
            })
            .catch((err) => console.error('Error loading players:', err));
    }, []);

    return (
        <Div>
            <div className="centered">
                <h1 className="title">Tournament Bracket</h1>
                <h3 className="subtitle">Number of players: {input}</h3>
                <button onClick={handleClick} className="action-button">See Brackets</button>

                {error && <p className="error">{error}</p>}
            </div>
            {visible && (
                <div className="brackets">
                    {rounds.map((round, roundIndex) => (
                        <div key={roundIndex} className="column">
                            {/* First column: Display shuffled player names */}
                            {roundIndex === 0
                                ? Array.from({ length: round }, (_, i) => (
                                    <input
                                        key={`${roundIndex}-${i}`}
                                        value={players[i]?.username || ''} // Display player username or leave blank if not available
                                        readOnly
                                        className="player-input"
                                    />
                                ))
                                : // Other columns: Empty input boxes
                                Array.from({ length: round }, (_, i) => (
                                    <input key={`${roundIndex}-${i}`} className="empty-input" />
                                ))}
                        </div>
                    ))}
                </div>
            )}

            <button onClick={handleShuffle} className="action-button">Shuffle Players</button>
        </Div>
    );
}

export default TournamentBracket;

const Div = styled.div`
    background: #1d1f2f;
    color: #fff;
    font-family: 'Press Start 2P', cursive;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.7);

    .centered {
        margin-bottom: 20px;
    }

    .title {
        font-size: 2.5rem;
        color: #ffbf00; /* Golden yellow */
        margin-bottom: 10px;
    }

    .subtitle {
        font-size: 1.2rem;
        color: #b0b0b0;
        margin-bottom: 20px;
    }

    .error {
        color: #ff4c4c; /* Red for error */
        font-size: 1rem;
        margin-top: 10px;
    }

    .action-button {
        background-color: #ffbf00;
        border: none;
        padding: 10px 20px;
        font-size: 1.2rem;
        margin: 10px 0;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease;
    }

    .action-button:hover {
        background-color: #ff9900;
    }

    .brackets {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    .column {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: 15px;
    }

    input {
        padding: 12px;
        border: 2px solid #ffbf00;
        border-radius: 5px;
        background-color: #333;
        color: #fff;
        font-size: 1rem;
        width: 150px;
        text-align: center;
    }

    .player-input {
        background-color: #444;
        font-size: 1.1rem;
    }

    .empty-input {
        background-color: #222;
        font-size: 1rem;
    }
`;
