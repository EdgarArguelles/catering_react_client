import './Content.scss';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const Content = () => {
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
            <Button className="email-button">
              <a href="mailto:caoc1688@gmail.com" tabIndex="-1">
                <i className="fas fa-at" aria-hidden="true"/>
                <p className="button-label">caoc1688@gmail.com</p>
              </a>
            </Button>
          </div>
          <div>
            <Button>
              <a href="tel:+524621073827" tabIndex="-1">
                <i className="fas fa-phone" aria-hidden="true"/>
                <p className="button-label">01 462 107 3827</p>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(Content);