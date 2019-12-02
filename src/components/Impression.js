import React from 'react';
import './Impression.css';

class Impression extends React.Component {
  render() {
    return (
      <div className="impressionContainer">
        <img alt="footer logo" src={require('../images/logo.png')} style={{ width: 18, height: 18, marginRight: 7 }} />
        <p>京ICP备19034695号 coding@pku.edu.cn</p>
      </div>
    )
  }
}

export default Impression;
