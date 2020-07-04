import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import Cocktail from '../cocktail/cocktail';

const Footer = () => {
  return (
    <div className="containerFooter">
      <div className="groupInfo">
        <a href="/" className="linkLogoFooter">
          <Cocktail />
          <span className="textLogo">reason to party</span>
        </a>
        <p className="paragraphFooter">
          Suspendisse hendrerit tellus laoreet luctus pharetra. Aliquam porttitor vitae orci nec ultricies. Curabitur
          vehicula, libero eget faucibus faucibus, purus erat eleifend enim, porta pellentesque ex mi ut sem.
        </p>
        <p className="paragraphFooter">&#9786; Kuprishov Inc. All rights reserved</p>
      </div>

      <div className="groupInfo">
        <span>Menu</span>
        <Link to="/aboutMe">About me</Link>
        <Link to="/resume">Resume</Link>
      </div>
      <div className="groupInfo">
        <span>Gratitude</span>
        <a href="https://date.nager.at/">Nager.Date</a>
        <a href="https://www.restcountries.eu>">REST Counties</a>
        <a href="https://github.com/spencermountain/wtf_wikipedia">wtf_wikipedia</a>
        <p>Without these services, my project would not be possible. Thanks!</p>
      </div>
    </div>
  );
};

export default Footer;
