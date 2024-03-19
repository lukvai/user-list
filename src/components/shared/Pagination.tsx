import React from "react";

interface PaginationProps {
    onNext: () => void
    onPrevious: () => void
    current?: number
    total?: number
}

function Pagination({onNext, onPrevious, current, total}: PaginationProps): React.JSX.Element {
    if(!current && !total) {
        return (
            <></>
        )
    }

    return (
        <div className="flex justify-between p-2">
            <div>Showing page {current} of {total}</div>
            <div className="flex gap-5">
                <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    onClick={onPrevious}
                    disabled={current === 1}
                >
                    Previous
                </button>
                <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    onClick={onNext}
                    disabled={current === total}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Pagination
