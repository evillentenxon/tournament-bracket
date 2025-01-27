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

    const renderTiers = (currentCount) => {
        // Stop rendering when currentCount < 1
        if (currentCount < 1) return null;

        const nextCount = Math.floor(currentCount / 2);

        return (
            <div className="tier" key={currentCount}>
                {/* Input Column */}
                <div className="input-list">
                    {[...Array(currentCount)].map((_, index) => (
                        <input key={`input-${currentCount}-${index}`} placeholder={`Input ${index + 1}`} />
                    ))}
                </div>

                {/* SVG Column */}
                <div className="svg-column">
                    {[...Array(nextCount)].map((_, index) => (
                        <svg key={`svg-${currentCount}-${index}`}>
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

                {/* Recursive call for the next tier */}
                {renderTiers(nextCount)}
            </div>
        );
    };

    return (
        <Container>
            <div>
                <input
                    type="number"
                    value={count}
                    onChange={handleChange}
                    min="1" // Prevent entering negative numbers or zero
                    placeholder="Enter count"
                />
            </div>
            <div className="tie-sheet">
                {renderTiers(count)}
            </div>
        </Container>
    );
}

export default InputAndSvg;

const Container = styled.div`
    width: 100%;
    padding: 20px;

    .input-column, .svg-column {
        display: flex;
        gap: 10px;
    }

    input[type="number"] {
        margin-bottom: 20px;
        padding: 5px;
        border: 2px solid black;
        border-radius: 5px;
    }

    .tie-sheet {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .tier {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }

    .input-list input {
        display: block;
        margin-bottom: 10px;
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
        height: 80px;
        width: 50px;
    }
`;
