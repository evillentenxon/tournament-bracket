import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function TournamentBracket() {
    const [input, setInput] = useState(8); // Default number of teams
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');
    const [players, setPlayers] = useState([]); // Store player data

    const handleClick = () => {
        if (input > 1 && (input & (input - 1)) === 0) {
            setError('');
            setVisible(true);
        } else {
            setError('Please enter a number that is a power of 2 (e.g., 2, 4, 8, 16).');
            setVisible(false);
        }
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
                setPlayers(data); // Store player data
                setInput(data.length); // Set the number of participants to the number of players
            })
            .catch((err) => console.error('Error loading players:', err));
    }, []);

    return (
        <Div>
            <div className="centered">
                <label>
                    Number of teams:
                    <input type="number" value={input} readOnly />
                </label>
                <button onClick={handleClick}>See Brackets</button>
                {error && <p className="error">{error}</p>}
            </div>
            {visible && (
                <div className="brackets">
                    {rounds.map((round, roundIndex) => (
                        <div key={roundIndex} className="column">
                            {/* First column: Display player names */}
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
        </Div>
    );
}

export default TournamentBracket;

// Styled Components (Optional, for styling purposes)
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
        gap: 10px;
        justify-content: space-evenly;
    }
    input {
        padding: 5px;
        text-align: center;
    }
`;
