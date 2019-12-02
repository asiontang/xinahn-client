import React from 'react';
import './Go.css';

class Go extends React.Component {
  render() {
    return (
      <div className="seduceContainer">
        <div>
          <button onClick={() => this.props.queryOnSubmit()} className="goButton">
            信安搜索
          </button>
          <div style={{ width: 30 }} />
          <a href="https://github.com/xinahn/xinahn-client" className="goButton">
            查看源码
          </a>
        </div>
        <div>
          <span className="statement">
            开源、隐私、无广告
          </span>
        </div>
      </div>
    )
  }
}

export default Go;