import './Content.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faAt, faPhone } from '@fortawesome/free-solid-svg-icons';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Utils from 'app/common/Utils';

const Content = () => {
  const animateWhatsapp = () => Utils.animateIcon('whatsapp-icon', { strokeWidth: 10 });
  const animatePhone = () => Utils.animateIcon('phone-icon');
  const animateEmail = () => Utils.animateIcon('email-icon');

  return (
    <div id="content">
      <Card raised className="card-content">
        <CardContent className="content">
          <h1>Contactanos</h1>
          <hr/>
          <div>
            <p>
              Lic. Cinthia Areli Cansigno Ortiz
            </p>
          </div>
          <div>
            <Button onClick={animateWhatsapp} onMouseEnter={animateWhatsapp}>
              <a href="https://wa.me/+524621073827" target="_blank" tabIndex="-1">
                <FontAwesomeIcon id="whatsapp-icon" icon={faWhatsapp}/>
                <p className="button-label">Whatsapp</p>
              </a>
            </Button>
          </div>
          <div>
            <Button onClick={animatePhone} onMouseEnter={animatePhone}>
              <a href="tel:+524621073827" tabIndex="-1">
                <FontAwesomeIcon id="phone-icon" icon={faPhone}/>
                <p className="button-label">462 107 3827</p>
              </a>
            </Button>
          </div>
          <div>
            <Button className="email-button" onClick={animateEmail} onMouseEnter={animateEmail}>
              <a href="mailto:caoc1688@gmail.com" tabIndex="-1">
                <FontAwesomeIcon id="email-icon" icon={faAt}/>
                <p className="button-label">caoc1688@gmail.com</p>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(Content);