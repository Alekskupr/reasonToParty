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
          This project helps you find a great reason to organize a themed party with friends. Only serious reasons, only
          on a national scale. For you.
        </p>
        <p className="paragraphFooter">
          &#9786; Kuprishov Inc. All rights reserved.
          <br /> (Not at all, my rights are not reserved. Use, my friend)
        </p>
      </div>

      <div className="groupInfo">
        <span>Menu</span>
        <Link to="/parties/aboutMe">About me</Link>
        <Link to="/resume">Resume</Link>
      </div>
      <div className="groupInfo">
        <span>Gratitude</span>
        <a href="https://date.nager.at/">Nager.Date</a>
        <a href="https://www.restcountries.eu>">REST Counties</a>
        <a href="https://github.com/spencermountain/wtf_wikipedia">wtf_wikipedia</a>
        <div className="thankstext">
          <span>Icons made by </span>
          <a
            href="https://www.flaticon.com/free-icon/cocktail_876602?term=cocktail&page=6&position=17"
            title="Kiranshastry"
          >
            <span>Kiranshastry </span>
          </a>
          <span>from </span>
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
        <p>Without these services, my project would not be possible. Thanks!</p>
      </div>
    </div>
  );
};

export default Footer;
