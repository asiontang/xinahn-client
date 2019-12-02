import React from 'react';
import './style.css';
import { withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';
import Logo from '../../images/Logo';
import Search from '../../components/Search';
// import Segment from '../../components/Segment';
import Result from '../../components/Result';

import {
  makeSelectNavInfo,
  makeSelectLinks,
  makeSelectQAZH,
  makeSelectWiki,
  makeSelectImages,
} from './selectors';

import {
  search_request,
  search_image_request,
  update_query,
  update_query_title,
  update_segment,
} from './actions';


class ResultPage extends React.Component {
  loadContent = (location) => {
    if (location.pathname === '/search') {
      if (this.props.navInfo.tab !== 'search') {
        // Reset data and send out query (or not.)
        this.props.update_segment('search');
        this.props.search_request(1);
      }
    } else if (location.pathname === '/images') {
      if (this.props.navInfo.tab !== 'images') {
        // Reset data and send out query (or not.)
        this.props.update_segment('images');
        this.props.search_image_request(1);
      }
    } else if (location.pathname === '/news') {
      if (this.props.navInfo.tab !== 'news') {
        // Reset data and send out query (or not.)
        this.props.update_segment('news');
      }
    }
  }
  componentDidMount() {
    const initialQ = queryString.parse(this.props.location.search);
    if (!initialQ.q) this.props.history.replace(`/`);

    this.props.update_query(initialQ.q);
    this.props.update_query_title(initialQ.q);
    this.loadContent(this.props.location);

    this.unlisten = this.props.history.listen(location => {
      this.loadContent(location);
    })
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render () {
    return (
      <div>
        <Helmet>
          <title>{this.props.navInfo.queryTitle} 搜寻结果</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="resultHeader">
          <div className="headerRowQuery">
            <a href="/">
              <Logo />
            </a>
            <Search
              isSM
              querySuggestions={this.props.navInfo.querySuggestions}
              query={this.props.navInfo.query}
              queryOnChange={q => this.props.update_query(q)}
              queryOnSubmit={(suggestion) => {
                if (suggestion) {
                  this.props.update_query(suggestion);
                  this.props.history.push(`${this.props.location.pathname}?q=${encodeURI(suggestion)}`);
                } else {
                  this.props.history.push(`${this.props.location.pathname}?q=${encodeURI(this.props.navInfo.query)}`);
                }
              }}
            />
          </div>
          {/* <Segment
            segment={this.props.location.pathname}
            location={this.props.location}
            history={this.props.history}
          /> */}
        </div>
        {this.props.location.pathname === `/search` ? (
        <div className="resultBody">
          {this.props.navInfo.loading ? (
            <div className="searchingOverlay" />
          ) : null}
          <div className="mainResultContainer">
            <div style={{ height: 25 }} />
            {this.props.links.allIds.length === 0 && this.props.navInfo.loading ? (
              <div style={{ padding: 7 }}>
                <Result isPlaceholder />
                <Result isPlaceholder />
                <Result isPlaceholder />
                <Result isPlaceholder />
                <Result isPlaceholder />
              </div>
            ) : null}
            {this.props.links.allIds.length === 0 && !this.props.navInfo.loading ? (
              <div>
                <Result isCannotFind notFoundQuery={this.props.navInfo.queryTitle} />
              </div>
            ) : null}
            {this.props.links.allIds.map((url, i) => {
              if (!i) {
                return (
                  <div key={url}>
                    {this.props.wiki.title ? (
                      <Result isWiki data={this.props.wiki} />
                    ) : null}
                    <Result
                      data={this.props.links.byId[url]}
                    />
                  </div>
                )
              } else if (i === 2) {
                return (
                  <div key={url}>
                    {this.props.qaZH.allIds.length ? (
                      <Result
                        isQA={'知乎'}
                        qaIdList={this.props.qaZH.allIds}
                        qaDict={this.props.qaZH.byId}
                      />
                    ) : null}
                    <Result
                      data={this.props.links.byId[url]}
                    />
                  </div>
                )
              } else {
                return (
                  <Result
                    key={url}
                    data={this.props.links.byId[url]}
                  />
                )
              }
            })}
            {this.props.navInfo.hasMore ? (
              <div className="moreButtonContainer">
                <button onClick={() => {
                  this.props.search_request(this.props.navInfo.page + 1)
                }} className="moreButton">
                  {this.props.navInfo.loading ? 
                  <span>&middot;&middot;&middot;</span>
                  :
                  <span>载入更多</span>}
                </button>
              </div>
            ) : null}
          </div>
          <div className="subResultContainer">
            <div className="subResultPanel">
              {this.props.wiki.title ? (
                <Result isPanel isWiki data={this.props.wiki} />
              ) : null}
            </div>
          </div>
        </div>
        ) : null  }     
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  navInfo: makeSelectNavInfo(),
  links: makeSelectLinks(),
  qaZH: makeSelectQAZH(),
  wiki: makeSelectWiki(),
  images: makeSelectImages(),
})
  
const mapDispatchToProps = {
  search_request,
  search_image_request,
  update_query,
  update_query_title,
  update_segment,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultPage));
