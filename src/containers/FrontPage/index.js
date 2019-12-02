import React from 'react';
import './style.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from "react-helmet";
// Frontpage components
import Logo from '../../components/Logo';
import Search from '../../components/Search';
import Impression from '../../components/Impression';

import {
  makeSelectNavInfo,
  makeSelectLinks,
} from '../ResultPage/selectors';

import {
  search_request,
  update_query,
} from '../ResultPage/actions';
import Go from '../../components/Go';

class FrontPage extends React.Component {
  render() {
    return (
      <header className="App-header">
        <Helmet>
          <title>xinahn 信安</title>
          <meta name="description" content="Better life starts from better search." />
        </Helmet>
        <div className="App-main">
          <div className="App-main-container">
            <Logo />
            <div className="App-search-container">
              <Search
                query={this.props.navInfo.query}
                querySuggestions={this.props.navInfo.querySuggestions}
                queryOnChange={q => this.props.update_query(q)}
                queryOnSubmit={(suggestQuery) => {
                  if (suggestQuery)
                    this.props.history.push(`/search?q=${suggestQuery}&from=frontpage`);
                  else
                    this.props.history.push(`/search?q=${this.props.navInfo.query}&from=frontpage`);
                }}
              />
              <div style={{ height: 15  }} />
              <Go queryOnSubmit={() => this.props.history.push(`/search?q=${this.props.navInfo.query}&from=frontpage`) }/>
            </div>
          </div>
        </div>
        <Impression />
      </header>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  navInfo: makeSelectNavInfo(),
  links: makeSelectLinks(),
})
  
const mapDispatchToProps = {
  search_request,
  update_query,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrontPage));
