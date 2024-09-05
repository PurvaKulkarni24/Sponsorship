import React, { useEffect, useState } from 'react';
import { getMatchDetails } from '../services/productApiService';
import 'bootstrap/dist/css/bootstrap.min.css';

const MatchDetails = () => {
  const [matchDetails, setMatchDetails] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const data = await getMatchDetails();
        setMatchDetails(data);
      } catch (err) {
        setError('Failed to fetch match details');
      }
    };

    fetchMatchDetails();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Match Details</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Match ID</th>
            <th>Match Name</th>
            <th>Match Date</th>
            <th>Location</th>
            <th>Total Payments</th>
          </tr>
        </thead>
        <tbody>
          {matchDetails.map((match) => (
            <tr key={match.matchID}>
              <td>{match.matchID}</td>
              <td>{match.matchName}</td>
              <td>{match.matchDate}</td>
              <td>{match.location}</td>
              <td>{match.totalPayments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchDetails;
