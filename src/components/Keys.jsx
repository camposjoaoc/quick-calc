import 'react';

function Keys({ label, keyClass, onButtonClick }) {
    // CSS class for the "EQUALS" key with specific styles
    const equalClass = "col-[span_2] bg-[#4ccdc6] text-[#1a261a] font-semibold hover:bg[#4CCDC6]";

    return (
        // Button wrapper with conditional styles for the "EQUALS" key
        <div className={`bg-[#141414] flex cursor-pointer 
            items-center justify-center p-4 
            rounded-[5px] hover:bg-[#4ccdc742] 
            ${keyClass && equalClass}`}
            // Trigger the onButtonClick function and pass the key's label as an argument
            onClick={() => onButtonClick(label)}>
            {label} {/* Display the label text of the key */}
        </div>
    );
}

export default Keys;
