import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchSeats = () => {
    // Simulating API response
    return [];
};

const SeatGrid = ({ vacantSeats, IsManager, IsCreate, matchId, vacantSeatsId, IsCancel, seat_id, reservationId }) => {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState(new Set());
    const [availableCount, setAvailableCount] = useState(0);
    const [reserveMessage, setReserveMessage] = useState("");
    const isLoggedIn = localStorage.getItem("access_token") ? true : false;

    useEffect(() => {
        console.log(vacantSeatsId,seat_id);
        let data = vacantSeats && vacantSeats.length > 0 ? vacantSeats : fetchSeats();
        setSeats(data);
        calculateAvailableSeats(data);
    }, [vacantSeats]);

    const calculateAvailableSeats = (data) => {
        const count = data.flat().filter((seat) => seat === 0).length;
        setAvailableCount(count);
    };

    const handleSeatClick = (row, col) => {
        if (seats[row][col] === 1 || IsManager) return;

        const seatKey = `${row}-${col}`;
        setSelectedSeats((prev) => {
            const updatedSeats = new Set(prev);
            if (updatedSeats.has(seatKey)) updatedSeats.delete(seatKey);
            else updatedSeats.add(seatKey);

            const selectedSeatsCount = updatedSeats.size;
            const totalAvailable = seats.flat().filter((seat) => seat === 0).length;
            setAvailableCount(totalAvailable - selectedSeatsCount);

            return updatedSeats;
        });
    };

    // const handleReserve = async () => {
    //     if (!isLoggedIn) {
    //         toast.error("Please log in to reserve seats.");
    //         return;
    //     }


    //     const accessToken = localStorage.getItem("access_token");
    //     const reservedSeats = Array.from(selectedSeats).map((seatKey) => {
    //         const [row, col] = seatKey.split("-").map(Number);
    //         return { seat_id: vacantSeatsId[row][col], match_id: matchId };

    //     });


    //     try {
    //         const response = await fetch("http://localhost:8000/reservation", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //             body: JSON.stringify(reservedSeats),
    //         });

    //         if (response.ok) {
    //             const result = await response.json();
    //             toast.success("Seats reserved successfully!");
    //             setTimeout(() => {
    //                 window.location.reload();
    //             }, 2000);
    //         } else {
    //             const error = await response.json();
    //             toast.error(error.detail || "Reservation failed. Please try again.");
    //         }
    //     } catch (err) {
    //         toast.error("An error occurred. Please try again.");
    //         console.error(err);
    //     }
    // };
    const handleCancel = async () => {
        if (!isLoggedIn) {
            toast.error("Please log in to cancel reservations.");
            return;
        }

        const accessToken = localStorage.getItem("access_token");

        try {
            const response = await fetch(`http://localhost:8000/reservation/${reservationId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                toast.success("Reservation cancelled successfully!");

                // Update local state after cancellation
                setSeats((prevSeats) => {
                    const updatedSeats = prevSeats.map((row, rowIndex) =>
                        row.map((seat, colIndex) => {
                            const seatKey = `${rowIndex}-${colIndex}`;
                            return selectedSeats.has(seatKey) ? 0 : seat; // Mark cancelled seats as 0
                        })
                    );
                    return updatedSeats;
                });

                setSelectedSeats(new Set()); // Clear selected seats
                calculateAvailableSeats(seats); // Recalculate available seats

                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            } else {
                const error = await response.json();
                toast.error(error.detail || "Cancellation failed. Please try again.");
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
            console.error(err);
        }
    };

    const handleReserve = async () => {
        if (!isLoggedIn) {
            toast.error("Please log in to reserve seats.");
            return;
        }
    
        const accessToken = localStorage.getItem("access_token");
        const reservedSeats = Array.from(selectedSeats).map((seatKey) => {
            const [row, col] = seatKey.split("-").map(Number);
            return { seat_id: vacantSeatsId[row][col], match_id: matchId };
        });
    
        try {
            const response = await fetch("http://localhost:8000/reservation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(reservedSeats),
            });
    
            if (response.ok) {
                const result = await response.json();
                toast.success("Seats reserved successfully!");
    
                // Update local state after reservation
                setSeats((prevSeats) => {
                    const updatedSeats = prevSeats.map((row, rowIndex) =>
                        row.map((seat, colIndex) => {
                            const seatKey = `${rowIndex}-${colIndex}`;
                            return selectedSeats.has(seatKey) ? 1 : seat; // Mark reserved seats as 1
                        })
                    );
                    return updatedSeats;
                });
    
                setSelectedSeats(new Set()); // Clear selected seats
                calculateAvailableSeats(seats); // Recalculate available seats
                // console.log(vacantSeatsId);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } else {
                const error = await response.json();
                toast.error(error.detail || "Reservation failed. Please try again.");
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
            console.error(err);
        }
    };
    
    const columns = seats[0]?.length || 0;

    return (
        <div className="flex justify-center items-center h-auto p-6 w-full">
            <ToastContainer />
            <div className="rounded-md p-6">
                {!IsCreate && (
                    <div className="text-2xl text-center mb-4 text-white font-bold">
                        Available Seats: <span className="font-bold">{availableCount}</span>
                    </div>
                )}
                <div
                    className="grid gap-2 justify-center mb-4"
                    style={{ gridTemplateColumns: `repeat(${columns}, 2.5rem)` }}
                >
                    {seats.map((row, rowIndex) =>
                        row.map((seat, colIndex) => {
                            const rowLetter = String.fromCharCode(65 + rowIndex);
                            const seatNumber = colIndex + 1;
                            const seatLabel = `${rowLetter}${seatNumber}`;
                            const seatKey = `${rowIndex}-${colIndex}`;
                            const isSelected = selectedSeats.has(seatKey);

                            return (
                                <div
                                    key={seatKey}
                                    onClick={() => IsCreate || IsCancel ? null : handleSeatClick(rowIndex, colIndex)}
                                    className={`w-10 h-10 flex items-center justify-center rounded ${IsManager ? 'cursor-default' : "cursor-pointer hover:opacity-80"} transition-colors text-sm font-bold
                                        ${ vacantSeatsId[rowIndex][colIndex] === 0
                                            ? "bg-yellow-400 text-black"
                                            : seat === 1
                                                ? "bg-red-500 text-white"
                                                    : isSelected
                                                        ? "bg-green-500 text-white"
                                                        : "bg-gray-300 text-black"
                                        }`}
                                >
                                    {seatLabel}
                                </div>

                            );
                        })
                    )}
                </div>

                {!IsManager && !IsCreate && (
                    <div className="text-center">
                        <button
                            onClick={IsCancel ? handleCancel : handleReserve}
                            disabled={!IsCancel && selectedSeats.size === 0}
                            className={`px-6 py-2 text-white rounded transition-colors ${!IsCancel && selectedSeats.size === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-alternate hover:bg-secondary"
                                }`}
                        >
                            {IsCancel ? 'Cancel' : 'Reserve'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeatGrid;
