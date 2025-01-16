import React, { useState,useEffect } from 'react';
import styled from 'styled-components';

function TournamentBracket() {
    const [input, setInput] = useState(8); // Default number of teams
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');

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
                console.log('Number of players:', data.length); // Logs the number of items in the JSON array
                setInput(data.length);
            })
            .catch((err) => console.error('Error loading players:', err));
    }, []);
    

    return (
        <Div>
            <div className="centered">
                <label>
                    Enter number of teams:
                    <input type="number" value={input} />
                </label>
                <button onClick={handleClick}>See Brackets</button>
                {error && <p className="error">{error}</p>}
            </div>
            {visible && (
                <div className="brackets">
                    {rounds.map((round, roundIndex) => (
                        <div key={roundIndex} className="column">
                            {Array.from({ length: round }, (_, i) => (
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

const Div = styled.div`
  .centered {
    text-align: center;
    margin-bottom: 20px;

    label {
      margin-right: 10px;
    }

    input {
      width: 60px;
      text-align: center;
    }
  }

  .brackets {
    display: flex;
    gap: 100px; /* Adjust spacing between columns */
    position: relative;

    .column {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly; /* Evenly space inputs in the column */
      gap: 10px; /* Fine-tune spacing between inputs */
      height: auto; /* Allow dynamic height based on content */
    }

    input {
      width: 100px;
      text-align: center;
    }
  }

  .error {
    color: red;
    font-size: 14px;
    margin-top: 10px;
  }
`;