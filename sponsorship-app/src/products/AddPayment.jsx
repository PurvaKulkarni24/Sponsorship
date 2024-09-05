import React, { useState } from 'react';
import { addPayment } from '../services/productApiService';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPayment = () => {
  const [contractID, setContractID] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!contractID) newErrors.contractID = 'Contract ID is required';
    if (!paymentDate) newErrors.paymentDate = 'Payment Date is required';
    if (!amountPaid || isNaN(amountPaid) || amountPaid <= 0) newErrors.amountPaid = 'Valid amount is required';
    if (!paymentStatus) newErrors.paymentStatus = 'Payment Status is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const paymentData = {
      contractID,
      paymentDate,
      amountPaid,
      paymentStatus,
    };

    const res = await addPayment(paymentData);
    if (res) {
      setContractID('');
      setPaymentDate('');
      setAmountPaid('');
      setPaymentStatus('');
      alert('Payment Added Successfully');
    } else {
      alert('Failed to add payment');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add Payment</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contractID">Contract ID</label>
          <input
            type="text"
            className="form-control"
            id="contractID"
            value={contractID}
            onChange={(e) => setContractID(e.target.value)}
          />
          {errors.contractID && <div className="text-danger">{errors.contractID}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="paymentDate">Payment Date</label>
          <input
            type="date"
            className="form-control"
            id="paymentDate"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
          {errors.paymentDate && <div className="text-danger">{errors.paymentDate}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="amountPaid">Amount Paid</label>
          <input
            type="number"
            className="form-control"
            id="amountPaid"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
          />
          {errors.amountPaid && <div className="text-danger">{errors.amountPaid}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="paymentStatus">Payment Status</label>
          <input
            type="text"
            className="form-control"
            id="paymentStatus"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          />
          {errors.paymentStatus && <div className="text-danger">{errors.paymentStatus}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Add Payment</button>
      </form>
    </div>
  );
};

export default AddPayment;
