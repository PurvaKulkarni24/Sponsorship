import React, { useState } from 'react';
import { getSponsorsByYear } from '../services/productApiService'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const SponsorsByYear = () => {
  const [year, setYear] = useState('');
  const [sponsors, setSponsors] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getSponsorsByYear(year);
      setSponsors(data);
    } catch (err) {
      setError('Failed to fetch sponsors by year');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Sponsors by Year</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            className="form-control"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Get Sponsors</button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Sponsor ID</th>
            <th>Sponsor Name</th>
            <th>Number of Matches</th>
          </tr>
        </thead>
        <tbody>
          {sponsors.map((sponsor) => (
            <tr key={sponsor.sponsorID}>
              <td>{sponsor.sponsorID}</td>
              <td>{sponsor.sponsorName}</td>
              <td>{sponsor.numberOfMatches}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SponsorsByYear;
