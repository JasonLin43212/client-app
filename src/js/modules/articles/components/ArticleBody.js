import React from 'react';
import injectSheet from 'react-jss';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import ArticleFeaturedMedia from './ArticleFeaturedMedia';
import ArticleReference from './ArticleReference';
import RightRail from './RightRail';
import { SPEC_IMG_CAROUSEL_PATTERN } from '../../../constants';
import { Gallery } from '../../media/components';
import { Lightbox } from '../../core/components';

const isBrowserFirefox =
  navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

const styles = {
  ArticleBody: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '19px',
    lineHeight: 1.4,
    padding: '0 0 18px',
    '& p': {
      marginBottom: '20px',
    },
    '& t': {
      display: 'inline-block',
      marginRight: '40px',
    },
    '& h4': {
      textAlign: 'center',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    '& h5': {
      fontSize: '18px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    '& h2': {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    '& p:first-child': {
      marginTop: '8px',
    },
    '& > div > p::first-letter': {
      // dropcap
      float: 'left',
      fontSize: '64px',
      lineHeight: '40px',
      padding: '0px 6px 0px 3px',
      paddingTop: isBrowserFirefox ? '5px' : '11px',
    },
    '& > div > p ~ p::first-letter': {
      float: 'none',
      fontSize: '18px',
      lineHeight: 1.44,
      padding: 0,
    },
    '& spec-reference': {
      display: 'none',
    },
  },
  print: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontStyle: 'italic',
    '& a': {
      '&:hover, &:active, &:focus': {
        color: '#999',
      },
    },
  },
  content: {
    marginTop: '13px',
  },
  '@media (max-width: 991px)': {
    ArticleBody: {
      '& > figure': {
        padding: '0 10%',
      },
    },
    innerHTML: {
      padding: '0 10%',
    },
  },
  '@media (max-width: 767px)': {
    ArticleBody: {
      '& > figure': {
        padding: '0 2%',
        '& > div > img': {
          marginLeft: '-2%',
          width: '100vw',
        },
      },
    },
    innerHTML: {
      padding: '0 2%',
    },
  },
};

const ArticleBody = ({ classes, article }) => {
  // TODO: refactor media to make the carousel part of media/back-end
  const isCarouselButtonVisible =
    SPEC_IMG_CAROUSEL_PATTERN.test(article.content) && article.media.length > 0;

  return (
    <Row>
      <Col xs={12} sm={12} md={8} lg={8} className={classes.ArticleBody}>
        {SPEC_IMG_CAROUSEL_PATTERN.test(article.content) && (
          <Lightbox title={article.title}>
            <Gallery media={article.media} />
          </Lightbox>
        )}
        {article.media.length > 0 && (
          <ArticleFeaturedMedia
            image={article.media[0]}
            isCarouselButtonVisible={isCarouselButtonVisible}
            carouselImageCount={article.media.length}
          />
        )}
        <ArticleReference article={article} />
        <div
          className={classes.innerHTML}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </Col>
      <Col xsHidden smHidden mdOffset={1} md={3} lgOffset={1} lg={3}>
        <RightRail />
      </Col>
    </Row>
  );
};

export default injectSheet(styles)(ArticleBody);
