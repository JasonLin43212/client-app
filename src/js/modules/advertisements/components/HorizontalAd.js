import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

import { pathToAds } from '../constants';

const styles = {
  HorizontalAd: {
    width: '100%',
  },
  img: {
    width: '100%',
  },
};

const HorizontalAd = ({ classes, advertisements }) => {
  const ad = advertisements[1];
  return (
    <div className={classes.HorizontalAd}>
      <Link to={ad.url} target='_blank'>
        <img className={classes.img} src={pathToAds + ad.filename} />
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  advertisements: state.advertisements,
});

export default connect(mapStateToProps)(injectSheet(styles)(HorizontalAd));
