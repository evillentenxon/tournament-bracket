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
        // if (input > 1 && (input & (input - 1)) === 0) {
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
        console.log('Players shuffled:', shuffled);
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
        fetch('/players.json')
            .then((response) => response.json())
            .then((data) => {
                setPlayers(data);
                setInput(data.length);
            })
            .catch((err) => console.error('Error loading players:', err));
    }, []);

    return (
        <Div>
            <div className="centered">
                <label>
                    <h1>Number of players:{input}</h1>
                    
                </label>
                <button onClick={handleClick}>See Brackets</button>

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
                                        value={players[i]?.name || ''} // Display player name or leave blank if not available
                                        readOnly
                                    />
                                ))
                                : // Other columns: Empty input boxes
                                Array.from({ length: round }, (_, i) => (
                                    <input key={`${roundIndex}-${i}`} />
                                ))}
                        </div>
                    ))}
                </div>
            )}

            <button onClick={handleShuffle}>Shuffle Players</button>
        </Div>
    );
}

export default TournamentBracket;

const Div = styled.div`
    .centered {
        text-align: center;
        margin-bottom: 20px;
    }
    .error {
        color: red;
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
        gap: 10px;
    }
    input {
        padding: 5px;
        text-align: center;
    }
`;
