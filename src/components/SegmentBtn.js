import React from 'react';
import './SegmentBtn.css';

class SegmentBtn extends React.Component {
  render() {
    return (
      <a
        href={`/${this.props.segment}${this.props.location.search}`}
        onClick={e => {
          e.preventDefault();
          this.props.history.push(`/${this.props.segment}${this.props.location.search}`)
        }}
        className={`segmentBtnContainer ${this.props.active ? 'active' : ''}`}>
        {this.props.icon}<div style={{width:7}} /><span>{this.props.title}</span>
      </a>
    )
  }
}

export default SegmentBtn;
