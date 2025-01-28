import 'react';
import Keys from "./Keys";
import { useState } from "react";

function Calculator() {
    // Array of keys for the calculator UI
    const keys = [
        "AC", // Clear all
        "C", // Delete last character
        "%", // Percentage operator
        "/", // Division operator
        "7", "8", "9", "*", // Numbers and multiplication operator
        "4", "5", "6", "-", // Numbers and subtraction operator
        "1", "2", "3", "+", // Numbers and addition operator
        ".", // Decimal point
        "0", // Zero
        "EQUALS", // Calculate the result
    ];
    // State to control if the result is being shown
    const [showResult, setShowResult] = useState(false);
    // State to manage the calculator display value
    const [display, setDisplay] = useState("");
    // Limit for the maximum length of the display value
    const maxLimit = 15;
    // Function to safely evaluate the mathematical expression
    function safeEvaluate(expression) {
        try {
            return new Function(`return ${expression}`)();
        } catch {
            return "Error";
        }
    }
    // Function to calculate the result of the current operation
    function calculateResult() {
        if (display.length !== 0) {
            const result = safeEvaluate(display);
            if (result === "Error") {
                setDisplay("Error");
            } else {
                setDisplay(parseFloat(result.toFixed(3)).toString());
                setShowResult(true);
            }
        }
    }
    // Function to handle button clicks
    function handleButton(value) {
        setShowResult(false); // Reset result indicator
        if (value == "AC") setDisplay(""); // Clear all
        else if (value == "C") setDisplay(display.slice(0, -1)); // Remove last character
        else if (isOperator(value)) { // Check if the value is an operator
            if (display == "" || isOperator(display[display.length - 1]))
                return; // Prevent consecutive operators
            setDisplay(display + value); // Append operator to display
        }
        else if (value == "EQUALS") calculateResult(); // Calculate result
        else if (display.length >= maxLimit)
            alert(`Maximum characters allowed: ${maxLimit}`); // Limit display length
        else setDisplay(display + value); // Append value to display
    }

    // Function to determine if a character is an operator
    function isOperator(char) {
        // Include all supported operators: %, *, /, +, -
        return ["%", "*", "/", "+", "-"].includes(char);
    }
    // CSS classes for operation display and result display
    const operationClass = "text-[1.2rem] tracking-[2px] flex gap-[5px] items-center text-[rgba(255,255,255,0.5)] justify-end";
    const resultClass = "text-[1.7rem]";
    return (
        <div className="min-w-[320px] bg-black flex flex-col gap-4 p-4 rounded-2xl">
            {/* Display container */}
            <div className="overflow-x-auto bg-[#141414] min-h-[100px] flex items-end 
            justify-end flex-col p-4 rounded-[10px]">
                <div className={`${showResult ? resultClass : operationClass}`}>
                    {display} {/* Display current input or result */}
                </div>
            </div>

            {/* Grid for calculator keys */}
            <div className="grid grid-cols-[repeat(4,1fr)] gap-[0.3rem]">
                {keys.map((item, index) => (
                    <Keys
                        label={item} // Label for the key
                        key={index} // Unique key for React rendering
                        keyClass={item === "EQUALS" && "equals"} // Additional class for "EQUALS" button
                        onButtonClick={handleButton} // Function to handle button clicks
                    />
                ))}
            </div>
        </div>
    );
};

export default Calculator;
