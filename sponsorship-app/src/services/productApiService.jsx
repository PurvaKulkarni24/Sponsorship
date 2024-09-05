import axios from "axios";

const BASE_URL = 'http://localhost:5201/api/Sponsorship';

async function addPayment(payment) {
  let data = null;

  try {
    let response = await axios.post('http://localhost:5201/api/Sponsorship/add-payment', payment);
    if (response.status === 201) {
      data = await response.data;
      console.log('Payment added successfully:', data);
    } else {
      console.error('Failed to add payment:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding payment:', error);
    return JSON.stringify(error);
  }

  return data;
}

async function getSponsorDetails() {
  let data = null;

  try {
    let response = await axios.get('http://localhost:5201/api/Sponsorship/sponsors');
    if (response.status === 200) {
      data = await response.data;
      console.log('Sponsor details:', data);
    } else {
      console.error('Failed to retrieve sponsor details:', response.statusText);
    }
  } catch (error) {
    console.error('Error retrieving sponsor details:', error);
    return JSON.stringify(error);
  }

  return data;
}

async function getMatchDetails() {
  let data = null;

  try {
    let response = await axios.get('http://localhost:5201/api/Sponsorship/matches');
    if (response.status === 200) {
      data = await response.data;
      console.log('Match details:', data);
    } else {
      console.error('Failed to retrieve match details:', response.statusText);
    }
  } catch (error) {
    console.error('Error retrieving match details:', error);
    return JSON.stringify(error);
  }

  return data;
}

async function getSponsorsByYear(year) {
  let data = null;

  try {
    let response = await axios.get('http://localhost:5201/api/Sponsorship/sponsored-matches', year);
    if (response.status === 200) {
      data = await response.data;
      console.log('Sponsors by year:', data);
    } else {
      console.error('Failed to retrieve sponsors by year:', response.statusText);
    }
  } catch (error) {
    console.error('Error retrieving sponsors by year:', error);
    return JSON.stringify(error);
  }

  return data;
}

export { addPayment, getSponsorDetails, getMatchDetails, getSponsorsByYear };
