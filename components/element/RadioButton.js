import React from 'react';

function RadioButton({ status, setStatus, value, title, children }) {
    const getBgColor = (value) => {
        switch (value) {
            case "todo":
                return "bg-yellow-500";
            case "inProgress":
                return "bg-blue-500";
            case "review":
                return "bg-purple-500";
            case "done":
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className={`w-36 text-white px-2 py-1 flex justify-between items-center ${getBgColor(value)} rounded-md mb-3`}>
            <label className='flex justify-start items-center' htmlFor={value}>
                {children}&nbsp;{title}
            </label>
            <input
                id={value}
                type="radio"
                name="status"
                value={value}
                checked={status === value}
                onChange={(e) => setStatus(e.target.value)}
                className="focus:outline-none ml-1"
            />
        </div>
    );
}

export default RadioButton;
