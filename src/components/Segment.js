import React from 'react';
import './Segment.css';

import {
  Compass,
  TrendingUp,
  FileText,
} from 'react-feather';

import SegmentBtn from './SegmentBtn';

class Segment extends React.Component {
  render() {
    return (
      <div className="segmentContainer">
        <SegmentBtn
          title='全部'
          segment='search'
          location={this.props.location}
          history={this.props.history}
          active={this.props.segment === '/search'}
          icon={<Compass size={16} />}
        />
        <SegmentBtn
          title='新闻'
          segment='news'
          location={this.props.location}
          history={this.props.history}
          active={this.props.segment === '/news'}
          icon={<FileText size={16} />}
        />
        <SegmentBtn
          title='热榜'
          segment='hot'
          location={this.props.location}
          history={this.props.history}
          active={this.props.segment === '/hot'}
          icon={<TrendingUp size={16} />}
        />
      </div>
    )
  }
}

export default Segment;
