import React, { useEffect, useState } from "react";
import styled from "styled-components";

function InputAndSvg() {
    const [count, setCount] = useState(0);

    const handleChange = (e) => {
        setCount(Number(e.target.value)); // Ensure the count is treated as a number
    };

    useEffect(() => {
        console.log(count);
    }, [count]);

    const renderTiers = (currentCount, i = 1) => {
        // Stop rendering when currentCount < 1
        if (currentCount < 1) return null;

        const nextCount = Math.floor(currentCount / 2); // Halve the count for the next tier
        const nextI = i * 2; // Double the value of i for the next tier

        return (
            <div className="tier" key={currentCount}>
                {/* Input Column */}
                <div className="input-list">
                    {[...Array(currentCount)].map((_, index) => (
                        <input
                            key={`input-${currentCount}-${index}`}
                            placeholder={`Input ${index + 1}`}
                        />
                    ))}
                </div>

                {/* SVG Column */}
                <div className="svg-column">
                    {[...Array(nextCount)].map((_, index) => (
                        <svg key={`svg-${currentCount}-${index}`}>
                            <path
                                d={`m10 10 h25 v${25 * i} h25 h-25 v${25 * i} h-25`}
                                stroke="black"
                                strokeWidth="2"
                                fill="none"
                            />
                        </svg>
                    ))}
                </div>

                {/* Recursive call for the next tier */}
                {renderTiers(nextCount, nextI)}
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
            <div>{renderTiers(count)}</div>
        </Container>
    );
}

export default InputAndSvg;

const Container = styled.div`
    width: 100%;
    padding: 20px;

    .input-list{
        display: flex;
        gap: 10px;
        flex-direction: column;
        // align-content: space-between;
        justify-content: space-around;
    }
    .svg-column {
        display: flex;
        gap: 10px;
        flex-direction: column;
        // align-content: space-between;
        justify-content: space-evenly;
    }

    input[type="number"] {
        margin-bottom: 20px;
        padding: 5px;
        border: 2px solid black;
        border-radius: 5px;
    }

    .tier {
        display: flex;
        gap: 20px;;
    }

    .input-list input {
        padding: 5px;
        border: 2px solid black;
        border-radius: 5px;
        width: 100%;
        max-width: 200px;
    }

    svg {
        height: 80px;
        width: 50px;
        overflow: visible;
        // margin-bottom: 20px;
    }
`;
