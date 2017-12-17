// TODO: SECTINOPAGE IS LITERALLY A MESS

import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Helmet } from "react-helmet";

import { ArticleList } from "../../articles/components";
import { getSectionTreeArticles } from "../../articles/selectors";
import { getDirectSubsections } from "../../sections/selectors";
import SectionColumn from "./SectionColumn";
import { LeftTitleArticle } from "../../articles/components/summaries";
import { Dateline, Byline } from "../../articles/components/index";
import SectionFeature from "./SectionFeature";
import { TallAd } from "../../advertisements/components/index";

// TODO: STYLE SECONDARY ARTICLE. consider setting a max height

const styles = {
  subsectionBar: {
    margin: "0 0 20px 0",
    padding: 0,
    textAlign: "center",
  },
  featuredRow: {
    borderBottom: "1px solid #ddd",
    paddingBottom: "18px",
  },
  featuredMedia: {
    "& figure": {
      margin: 0,
      maxHeight: "500px",
      overflow: "hidden",
      width: "100%",
      "& img": {
        width: "100%",
      },
    },
  },
  featuredArticle: {
    marginLeft: "55px",
    paddingTop: "35px",
    textAlign: "center",
    width: "325px",
    "& a": {
      color: "#000",
      "&:hover, &:active, &:focus": {
        color: "#000",
      },
    },
  },
  featuredArticleSection: {
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    marginBottom: "8px",
    textTransform: "uppercase",
  },
  featuredArticleTitle: {
    display: "block",
    fontFamily: "Canela",
    fontSize: "40px",
    fontWeight: 300,
    lineHeight: "48px",
    marginBottom: "13px",
  },
  featuredArticleSummary: {
    fontFamily: "Minion Pro",
    fontSize: "16px",
    lineHeight: 1.25,
    marginBottom: "18px",
  },
  secondaryRow: {
    marginBottom: "18px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "18px",
  },
  secondaryCol: {
    paddingRight: "0 !important",
  },
  SectionFeatureContainer: {
    borderBottom: "1px solid #ddd",
    marginBottom: "18px",
    marginRight: "14px",
    "& div": {
      borderTop: "none",
    },
  },
  TallAdContainer: {
    borderLeft: "1px solid #ddd",
    marginTop: "24px",
    paddingLeft: "14px !important",
    paddingRight: "0 !important",
  },
  subsectionListItem: {
    borderBottom: "solid 1px #ddd",
    display: "inline-block",
    marginBottom: "5px",
    textDecoration: "none",
    padding: "0 26px 10px 0",
    "&:last-child": {
      paddingRight: 0,
    },
  },
  subsectionLink: {
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: 300,
    "&:hover, &:active, &:focus": {
      color: "#000",
      textDecoration: "none",
    },
  },
  latestArticles: {
    borderRight: "solid 1px #ddd",
    marginTop: "8px",
    padding: "0 13px 0 0",
    "& > div:last-child": {
      // articleBlocks
      border: "none",
      margin: 0,
    },
  },
  sectionColumnContainer: {
    "& > div": {
      borderLeft: "none",
    },
  },
  SubsectionPage: {
    marginTop: "80px",
    "& div > div": {
      borderRight: 0,
    },
  },
  "@media (min-width: 992px)": {
    SectionPage: {
      marginTop: "46px",
    },
    SectionFeatureContainer: {
      marginRight: "14px !important",
    },
  },
  "@media (min-width: 768px)": {
    SectionFeatureContainer: {
      marginRight: 0,
    },
  },
  "@media (max-width: 991px)": {
    SectionPage: {
      marginTop: "-16px", // counters PageContainer.marginTop = 60px
    },
    featuredArticle: {
      marginLeft: 0,
      paddingTop: "3vw",
      width: "41.666666%", // col-sm-5
    },
    featuredArticleSummary: {
      margin: "0 auto 18px auto",
      width: "80%",
    },
  },
  "@media (max-width: 767px)": {
    latestArticles: {
      borderRight: "none",
      paddingRight: 0,
    },
    featuredMedia: {
      paddingRight: "0 !important",
      "& figure": {
        maxHeight: "50vh",
      },
      "& figure img": {
        marginLeft: "-14px",
        width: "100vw",
      },
    },
    featuredArticle: {
      padding: "14px 0 0 0 !important",
      width: "100%",
    },
    featuredArticleTitle: {
      fontSize: "30px",
      lineHeight: "36px",
    },
    SectionFeatureContainer: {
      borderBottom: 0,
      borderRight: 0,
      marginRight: "0 !important",
    },
  },
};

const SectionPage = ({
  classes,
  sectionTreeArticles,
  directSubsections,
  section,
  sections,
  media,
}) => {
  if (section.parentId || section.name === "News") {
    return (
      <Grid fluid className={classes.SubsectionPage}>
        <Helmet>
          <title>{section.name} | The Stuyvesant Spectator</title>
          <meta />
        </Helmet>
        <Row>
          <Col xs={12} sm={9} md={9} lg={9} className={classes.latestArticles}>
            <ArticleList
              articles={sectionTreeArticles}
              title={section.name}
              label="Latest"
            />
          </Col>
          <Col
            xsHidden
            sm={3}
            md={3}
            lg={3}
            className={classes.TallAdContainer}
            style={{ marginTop: "57px" }}
          >
            <TallAd />
          </Col>
        </Row>
      </Grid>
    );
  }
  const featuredArticle = sectionTreeArticles.find(article => {
    if (section.name === "Humor") {
      if (
        directSubsections[article.sectionId] &&
        directSubsections[article.sectionId].name === "Spooktator"
      ) {
        return false;
      }
    }
    if (section.name === "Arts & Entertainment") {
      return article.id === 234;
      // A HARDCODED ARTICLE
    }
    if (section.name === "Features") {
      return article.id === 196;
      // A HARDCODED ARTICLE
    }
    return Object.values(media).find(medium => medium.articleId === article.id);
  });
  const featuredMedia = Object.values(media).find(
    image => image.articleId === featuredArticle.id,
  );
  let featuredArticleSection = Object.values(directSubsections).find(
    subsection => subsection.id === featuredArticle.sectionId,
  );
  if (!featuredArticleSection) {
    featuredArticleSection = section;
  }

  let secondaryArticle = sectionTreeArticles.find(
    article =>
      article !== featuredArticle &&
      Object.values(media).find(medium => medium.articleId === article.id),
  );
  if (!secondaryArticle) {
    secondaryArticle = sectionTreeArticles[1];
  }

  let hardcodedSubsection = null;
  if (section.name === "Arts & Entertainment") {
    hardcodedSubsection = "Music";
  } else if (section.name === "Humor") {
    hardcodedSubsection = "Spooktator";
  }

  let featuredSubsection = null;
  if (section.name === "10/31 Terror Attack") {
    // 10/31 has no subsections, but many students published Creative
    // Responses (their creative pieces in response to the attack).
    featuredSubsection = Object.values(sections).find(
      section => section.name === "Creative Responses",
    );
  } else {
    featuredSubsection = Object.values(directSubsections).find(subsection => {
      if (hardcodedSubsection) {
        return subsection.name === hardcodedSubsection;
      } else {
        return subsection.id !== featuredArticle.sectionId;
      }
    });
  }

  return (
    <Grid fluid className={classes.SectionPage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{section.name}</title>
        <meta />
      </Helmet>
      <ul className={classes.subsectionBar}>
        {section.name === "10/31 Terror Attack" ? (
          <li className={classes.subsectionListItem}>
            <Link
              className={classes.subsectionLink}
              to={featuredSubsection.permalink}
            >
              {featuredSubsection.name}
            </Link>
          </li>
        ) : (
          Object.values(directSubsections).map(subsection => {
            return (
              <li className={classes.subsectionListItem} key={subsection.id}>
                <Link
                  className={classes.subsectionLink}
                  to={subsection.permalink}
                >
                  {subsection.name}
                </Link>
              </li>
            );
          })
        )}
      </ul>
      <Row className={classes.featuredRow}>
        {featuredMedia && (
          <Col xs={12} sm={7} md={7} lg={7} className={classes.featuredMedia}>
            <Link
              to={`${featuredArticleSection.permalink}/${featuredArticle.slug}`}
            >
              <figure className={classes.featuredMediaContainer}>
                <img src={featuredMedia.attachmentUrl} />
              </figure>
            </Link>
          </Col>
        )}
        <Col xs={12} sm={5} md={5} lg={5} className={classes.featuredArticle}>
          <Link
            className={classes.featuredArticleSection}
            to={featuredArticleSection.permalink}
          >
            {featuredArticleSection.name === "Arts & Entertainment" ? (
              "A&E"
            ) : (
              featuredArticleSection.name
            )}
          </Link>
          <Link
            className={classes.featuredArticleTitle}
            to={`${featuredArticleSection.permalink}/${featuredArticle.slug}`}
          >
            {featuredArticle.title}
          </Link>
          <p className={classes.featuredArticleSummary}>
            {featuredArticle.summary}
          </p>
          <Byline contributors={featuredArticle.contributors} />
          <Dateline article={featuredArticle} />
        </Col>
      </Row>

      <Row className={classes.secondaryRow}>
        <Col xs={12} sm={12} md={9} lg={9} className={classes.secondaryCol}>
          {featuredSubsection && (
            <div className={classes.SectionFeatureContainer}>
              <SectionFeature
                section={featuredSubsection}
                without={featuredArticle}
              />
            </div>
          )}
          <LeftTitleArticle article={secondaryArticle} />
        </Col>
        <Col
          xsHidden
          smHidden
          md={3}
          lg={3}
          className={classes.TallAdContainer}
        >
          <TallAd />
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={9} md={9} lg={9} className={classes.latestArticles}>
          <ArticleList
            articles={sectionTreeArticles}
            title="Latest"
            label="Latest"
          />
        </Col>
        <Col xsHidden sm={3} md={3} lg={3}>
          <div className={classes.sectionColumnContainer}>
            <SectionColumn sections={Object.values(directSubsections)} />
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  sectionTreeArticles: getSectionTreeArticles(state, ownProps),
  directSubsections: getDirectSubsections(state, ownProps),
  sections: state.sections.sections,
  media: state.media.media,
});

export default connect(mapStateToProps, null)(injectSheet(styles)(SectionPage));
