import 'react'

function Keys({ label, keyClass }) {

    const equalClass = "col-[span_2] bg-[#4ccdc6] text-[#1a261a] font-semibold hover:bg[#4CCDC6]";

    return (
        // Add conditional styles for 'EQUALS' key
        <div className={`bg-[#141414] flex cursor-pointer items-center justify-center p-4 
            rounded-[5px] hover:bg-[#4ccdc742] ${keyClass && equalClass}`}>{label}</div>
    )
}

export default Keys