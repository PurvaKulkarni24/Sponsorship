import React, { useEffect, useState } from 'react';
import { getSponsorDetails } from '../services/productApiService';
import 'bootstrap/dist/css/bootstrap.min.css';

const SponsorDetails = () => {
  const [sponsorDetails, setSponsorDetails] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSponsorDetails = async () => {
      try {
        const data = await getSponsorDetails();
        setSponsorDetails(data);
      } catch (err) {
        setError('Failed to fetch sponsor details');
      }
    };

    fetchSponsorDetails();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Sponsor Details</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Sponsor ID</th>
            <th>Sponsor Name</th>
            <th>Industry Type</th>
            <th>Contact Email</th>
            <th>Phone</th>
            <th>Total Payments</th>
            <th>Number of Payments</th>
            <th>Latest Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {sponsorDetails.map((sponsor) => (
            <tr key={sponsor.sponsorID}>
              <td>{sponsor.sponsorID}</td>
              <td>{sponsor.sponsorName}</td>
              <td>{sponsor.industryType}</td>
              <td>{sponsor.contactEmail}</td>
              <td>{sponsor.phone}</td>
              <td>{sponsor.totalPayments}</td>
              <td>{sponsor.numberOfPayments}</td>
              <td>{sponsor.latestPaymentDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SponsorDetails;
