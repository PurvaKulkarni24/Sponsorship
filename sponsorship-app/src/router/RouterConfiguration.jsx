import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home  from '../components/Home';
import NavBar from '../components/NavBar';
import AddPayment from '../products/AddPayment';
import SponsorDetails from  '../products/Sponsors';
import MatchDetails from '../products/Matches';
import SponsorsByYear from '../products/SponsoredMatches';

const RouterConfiguration = () => {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-payment" element={<AddPayment />} />
          <Route path="/sponsors" element={<SponsorDetails />} />
          <Route path="/matches" element={<MatchDetails />} />
          <Route path="/sponsored-matches" element={<SponsorsByYear />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterConfiguration;
