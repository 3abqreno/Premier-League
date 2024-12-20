import React, { useState, useEffect } from "react";

const fetchSeats = () => {
    // Simulating API response: 0 = available, 1 = reserved
    // return [
    //     [0, 1, 0, 0, 1, 0, 1, 0, 0, 0,], // 8 columns
    //     [1, 1, 0, 1, 0, 0, 0, 1, 1, 1,],
    //     [0, 0, 0, 1, 1, 1, 0, 0, 0, 0,],
    //     [0, 1, 1, 0, 0, 0, 1, 1, 1, 1,],
    //     [0, 0, 1, 0, 1, 0, 0, 0, 0, 0,],
    //     [0, 0, 1, 0, 1, 0, 0, 0, 0, 0,],
    //     [0, 0, 1, 0, 1, 0, 0, 0, 0, 0,],
    //     [0, 0, 1, 0, 1, 0, 0, 0, 0, 0,],
    //     [0, 0, 1, 0, 1, 0, 0, 0, 0, 0,],
    //     [0, 0, 1, 0, 1, 0, 0, 0, 0, 0,],
    // ];
    return [];
};

const SeatGrid = ({vacantSeats,IsManager, IsCreate}) => {
    const [seats, setSeats] = useState([]); // 2D Array of seats
    const [selectedSeats, setSelectedSeats] = useState(new Set()); // Store selected seats
    const [availableCount, setAvailableCount] = useState(0); // Available seats count
    const [reserveMessage, setReserveMessage] = useState(""); // Message for the user
    const isLoggedIn = localStorage.getItem("isLoggedIn"); // Check login status

    useEffect(() => {
        let data;
        if (vacantSeats && vacantSeats.length > 0) {
            data = vacantSeats;
        } else {
            data = fetchSeats();
        }
        setSeats(data);
        calculateAvailableSeats(data);
    }, [vacantSeats]);

    const calculateAvailableSeats = (data) => {
        const count = data.flat().filter((seat) => seat === 0).length;
        setAvailableCount(count);
    };

    const handleSeatClick = (row, col) => {
        if (seats[row][col] === 1 || IsManager) return; // Can't select reserved seats

        const seatKey = `${row}-${col}`;
        setSelectedSeats((prev) => {
            const updatedSeats = new Set(prev);
            if (updatedSeats.has(seatKey)) updatedSeats.delete(seatKey); // Deselect seat
            else updatedSeats.add(seatKey); // Select seat

            // Recalculate available seats
            const selectedSeatsCount = updatedSeats.size;
            const totalAvailable = seats.flat().filter((seat) => seat === 0).length;
            setAvailableCount(totalAvailable - selectedSeatsCount);

            return updatedSeats;
        });
    };


    const handleReserve = () => {
        if (!isLoggedIn) {
            setReserveMessage("Please log in to reserve seats.");
            setTimeout(() => setReserveMessage(""), 2000); // Clear message after 2 seconds
            return;
        }

        const reservedSeats = Array.from(selectedSeats);
        console.log("Reserved Seats:", reservedSeats);
        setSelectedSeats(new Set()); // Clear selected seats
    };

    // Dynamically calculate the number of columns
    const columns = seats[0]?.length || 0; // Number of columns based on first row

    return (
        <div className="flex justify-center items-center h-auto p-6 w-full">
            <div className="rounded-md p-6">
                {/* Seat Grid */}
                {!IsCreate && (<div className="text-2xl text-center mb-4 text-white font-bold">
                        Available Seats: <span className="font-bold">{availableCount}</span>
                    </div>)}
                <div
                    className="grid gap-2 justify-center mb-4"
                    style={{ gridTemplateColumns: `repeat(${columns}, 2.5rem)` }}
                >

                    {seats.map((row, rowIndex) =>
                        row.map((seat, colIndex) => {
                            const rowLetter = String.fromCharCode(65 + rowIndex); // Convert rowIndex to letter (A, B, C...)
                            const seatNumber = colIndex + 1; // Number for the seat
                            const seatLabel = `${rowLetter}${seatNumber}`; // Combine letter and number
                            const seatKey = `${rowIndex}-${colIndex}`;
                            const isSelected = selectedSeats.has(seatKey);

                            return (
                                <div
                                    key={seatKey}
                                    onClick={() => IsCreate ? handleSeatClick(rowIndex, colIndex): null}
                                    className={`w-10 h-10 flex items-center justify-center rounded ${IsManager ? 'cursor-default': "cursor-pointer hover:opacity-80"} transition-colors text-sm font-bold
                    ${seat === 1
                                            ? "bg-red-500 text-white" // Reserved
                                            : isSelected
                                                ? "bg-green-500 text-white" // Selected
                                                : "bg-gray-300 text-black" // Available
                                        }
                    `}
                                >
                                    {seatLabel} {/* Show seat label (A1, B1...) */}
                                </div>
                            );
                        })
                    )}

                </div>

                {/* Reserve Button */}
                {!IsManager && !IsCreate && (<div className="text-center">
                    <button
                        onClick={handleReserve}
                        disabled={selectedSeats.size === 0}
                        className={`px-6 py-2 text-white rounded transition-colors ${selectedSeats.size === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-alternate hover:bg-secondary"
                            }`}
                    >
                        Reserve
                    </button>
                </div>)}

                {/* Message for Login Alert */}
                {reserveMessage && (
                    <div className="mt-4 text-center text-red-500 font-bold">
                        {reserveMessage}
                    </div>
                )}
            </div>
        </div>
    );

};

export default SeatGrid;
