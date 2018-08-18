import React from 'react';
import injectSheet from 'react-jss';
import { Col } from 'react-bootstrap/lib';
import { Link } from 'react-router-dom';

import { Byline, Dateline } from '../';
import { ISSUU_CONFIG } from '../../../../constants';

const styles = {
  RightColumn: {
    borderLeft: 'solid 1px #ddd',
    paddingLeft: '14px !important',
    paddingRight: 0,
    '& > div': {
      paddingBottom: '14px',
    },
  },
  issuuEmbed: {
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
    paddingBottom: '10px !important',
  },
  figure: {
    margin: '0 0 12px 0',
    width: '100%',
    '& img': {
      width: '100%',
    },
  },
  sectionLabel: {
    color: '#000',
    display: 'block',
    fontFamily: 'Circular Std',
    fontWeight: 300,
    fontSize: '12px',
    marginBottom: '4px',
    textTransform: 'uppercase',
    '&:hover, &:active, &:focus': {
      color: '#000',
    },
  },
  primaryArticle: {
    borderBottom: '1px solid #ddd',
    marginBottom: '14px',
  },
  preview: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '14px',
    lineHeight: 1.29,
    marginBottom: '10px',
  },
  articleTitle: {
    color: '#000',
    display: 'block',
    fontFamily: 'Minion Pro',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: 1.22,
    marginBottom: '1px',
    '&:hover, &:active, &:focus': {
      color: '#000',
    },
  },
  label: {
    borderTop: '1px solid #000',
    borderBottom: '1px solid #ddd',
    color: '#000',
    display: 'block',
    fontFamily: 'Circular Std',
    fontSize: '13px',
    fontWeight: 300,
    margin: '0 0 12px 0',
    padding: '4px 0',
    '&:hover': {
      color: '#000',
    },
    '&:focus': {
      color: '#000',
    },
  },
  spotifyEmbed: {
    border: 0,
    height: 340,
    width: '100%',
  },
  '@media (max-width: 767px)': {
    RightColumn: {
      borderLeft: 'none',
      paddingLeft: '0 !important',
    },
  },
};

const RightColumn = ({ classes, articles }) => {
  if (articles.length !== 2) {
    // TODO: Better way to handle this
    return (
      <Col xsHidden sm={3} md={3} lg={3} className={classes.RightColumn} />
    );
  }
  const [primaryArticle, secondaryArticle] = articles;
  const primarySection = primaryArticle.section;
  const secondarySection = secondaryArticle.section;

  return (
    <Col xsHidden sm={3} md={3} lg={3} className={classes.RightColumn}>
      {/* Column xsHidden because the mobile UI would repeat too many articles */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<iframe style='width:100%; height:309px;' src='//e.issuu.com/embed.html#9521608/${ISSUU_CONFIG}' frameborder='0' allowfullscreen></iframe>`,
        }}
        // TODO: Issu & Newspaper/Volume/Issue's have to become Rails models
        className={classes.issuuEmbed}
      />
      {primaryArticle && (
        <div className={classes.primaryArticle}>
          {primaryArticle.media.length > 0 && (
            <div>
              <Link to={`${primarySection.permalink}/${primaryArticle.slug}`}>
                <figure className={classes.figure}>
                  <img src={primaryArticle.media[0].attachmentUrl} />
                </figure>
              </Link>
            </div>
          )}
          <Link to={primarySection.permalink} className={classes.sectionLabel}>
            {primarySection.name}
          </Link>
          <Link
            to={`${primarySection.permalink}/${primaryArticle.slug}`}
            className={classes.articleTitle}
          >
            {primaryArticle.title}
          </Link>
          <p className={classes.preview}>{primaryArticle.preview}</p>
          <Byline contributors={primaryArticle.contributors} />
          <Dateline timestamp={primaryArticle.createdAt} />
        </div>
      )}

      {secondaryArticle && (
        <div className={classes.secondaryArticle}>
          {secondaryArticle.media.length > 0 && (
            <div>
              <Link
                to={`${secondarySection.permalink}/${secondaryArticle.slug}`}
              >
                <figure className={classes.figure}>
                  <img src={secondaryArticle.media[0].attachmentUrl} />
                </figure>
              </Link>
            </div>
          )}
          <Link
            to={secondarySection.permalink}
            className={classes.sectionLabel}
          >
            {secondarySection.name}
          </Link>
          <Link
            to={`${secondarySection.permalink}/${secondaryArticle.slug}`}
            className={classes.articleTitle}
          >
            {secondaryArticle.title}
          </Link>
          <p className={classes.preview}>{secondaryArticle.preview}</p>
          <Byline contributors={secondaryArticle.contributors} />
          <Dateline timestamp={secondaryArticle.createdAt} />
        </div>
      )}
      
    </Col>
  );
};

export default injectSheet(styles)(RightColumn);
