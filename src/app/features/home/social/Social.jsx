import './Social.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import {FacebookProvider, Like} from 'react-facebook';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faFacebookMessenger, faRocketchat} from '@fortawesome/free-brands-svg-icons';
import {faCommentDots, faComments} from '@fortawesome/free-regular-svg-icons';
import {faCommentDots as soCommentDots, faComments as soComments} from '@fortawesome/free-solid-svg-icons';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Utils from 'app/common/Utils';
import {useIsMobileSize} from 'app/hooks/Common';
import SectionHeader from 'app/features/home/SectionHeader';
import SocialPosts from './social_posts/SocialPosts';

const Social = () => {
  const isMobile = useIsMobileSize();
  const theme = useSelector(state => state.app.theme);
  const appId = '489262341460511';
  const pageId = '615026265632013';
  const href = 'https://www.facebook.com/cansigno.de.la.torre';
  const redirect = url => window.open(url, '_blank');
  const icons = [faComments, faCommentDots, soComments, faRocketchat, soCommentDots, faCommentDots, faComments];
  const animateComments = () => icons.forEach((icon, i) => Utils.animateIcon(`comments-${i}`, {strokeWidth: 20}));

  return (
    <section id="social">
      <FacebookProvider appId={appId}>
        <Grid container>
          <Grid item xs={12}>
            <SectionHeader title="Nuestra comunidad"/>
          </Grid>
          <Grid item xs={12} sm={6} className="social-section">
            Se parte de nuestra comunidad en Facebook:
            <Fab variant="extended" size="small" onClick={() => redirect(href)}
                 onMouseEnter={() => Utils.animateIcon('face-icon')}>
              <FontAwesomeIcon id="face-icon" className="button-icon" icon={faFacebook}/> Visitanos
            </Fab>
            <div className={`${theme} fb-like`}><Like href={href} width={isMobile ? 280 : 450} showFaces share/></div>
          </Grid>
          <Grid item xs={12} sm={6} className="social-section">
            Quieres decirnos algo:
            <Fab variant="extended" size="small" onClick={() => redirect(`https://m.me/${pageId}`)}
                 onMouseEnter={() => Utils.animateIcon('messenger-icon')}>
              <FontAwesomeIcon id="messenger-icon" className="button-icon" icon={faFacebookMessenger}/> Escríbenos
            </Fab>
            <div className="social-contact-icons" onClick={animateComments} onMouseEnter={animateComments}>
              {icons.map((icon, i) => <FontAwesomeIcon key={`comments-${i}`} id={`comments-${i}`} icon={icon}/>)}
            </div>
          </Grid>
          <Grid item xs={12}>
            <SocialPosts type={'review'}/>
            <SocialPosts type={'photo'}/>
          </Grid>
        </Grid>
      </FacebookProvider>
    </section>
  );
};

export default React.memo(Social);