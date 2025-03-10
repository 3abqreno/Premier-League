import React, { useEffect, useState } from "react";
import Match from "../components/Match/Match";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserReservations = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const reservationsResponse = await fetch(
                    "http://localhost/api/reservation/me",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!reservationsResponse.ok) {
                    throw new Error("Failed to fetch reservations");
                }

                const reservations = await reservationsResponse.json();
                
                // Fetch match details for all reservations
                const matchesData = await Promise.all(
                    reservations.map(async (reservation) => {
                        const matchResponse = await fetch(
                            `http://localhost/api/match/${reservation.match_id}`,
                            {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        if (!matchResponse.ok) {
                            throw new Error(`Failed to fetch match with id: ${reservation.match_id}`);
                        }
                        
                        const matchData = await matchResponse.json();

                        // Process seats to identify vacant ones
                        const vacantSeats = Array(matchData.stadium.rows)
                            .fill()
                            .map(() => Array(matchData.stadium.columns).fill(1));
                        const vacantSeatsId = Array(matchData.stadium.rows)
                            .fill()
                            .map(() => Array(matchData.stadium.columns).fill(0));

                        matchData.seats.forEach((seat) => {
                            const { row, column, status, id } = seat;
                            if (status === "AVAILABLE") {
                                vacantSeats[row - 1][column - 1] = 0;
                                vacantSeatsId[row - 1][column - 1] = id;
                            }
                        });

                        return {
                            matchId: reservation.match_id,
                            homeTeam: matchData.home_team_rel.name,
                            awayTeam: matchData.away_team_rel.name,
                            date: matchData.date_time,
                            venue: matchData.stadium.name,
                            referee: matchData.main_referee,
                            linesmen: [matchData.linesman_1, matchData.linesman_2],
                            ticketPrice: matchData.ticket_price,
                            vacantSeats,
                            vacantSeatsId,
                            reservedSeatId: reservation.seat_id, // Add reserved seat id
                            reservationId: reservation.id,
                        };
                    })
                );

                setMatches(matchesData);
                console.log(matchesData);
                
                toast.success("Reservations fetched successfully");
            } catch (error) {
                console.error("Error fetching reservations:", error);
                toast.error("Error fetching reservations");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-black p-20">
            <ToastContainer />
            <p className="text-4xl gradientbg rounded-md mb-2 p-2 text-center font-bold">
                My Reservations
            </p>
            {loading ? (
                <p className="text-center text-lg font-bold">Loading...</p>
            ) : (
                <div className="rounded-lg">
                    {matches.length > 0 ? (
                        matches.map((match) => (
                            <Match
                                key={match.matchId}
                                {...match}
                                InReservations={true}

                            />
                        ))
                    ) : (
                        <p className="text-center text-lg font-bold">
                            No reservations found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserReservations;
