import React from 'react';
import { Code } from 'react-content-loader'
import './Result.css';

class Result extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qaFolded: true
    };
  }
  render() {
    if (this.props.isCannotFind)
      return (
        <div>
          <div className="resultContainer">
            <h3>信安不到与 {this.props.notFoundQuery} 相关的内容。</h3>
            <span>建议您：</span>
            <ul>
              <li>确认搜索内容拼写是否正确。</li>
              <li>尝试其他关键词。</li>
              <li>尝试使用更常见的关键词。</li>
              <li>尝试减少关键词数量。</li>
            </ul>
          </div>
        </div>
      )
    else if (this.props.isPlaceholder)
      return (
        <div className="placeholderContainer">
          <Code />
        </div>
      )
    else if (this.props.isWiki)
      return (
        <div className="">
          <div className={this.props.isPanel ? "panelContainer" : "showWhenMobile"}>
            <div className="wikiContainer">
              <div className="wikiTitleContainer">
                {this.props.data.title}
              </div>
              <div className="wikiContentContainer">
                {this.props.data.preview}
              </div>
              <div className="wikiLinkContainer">
                {this.props.data.domain === 'zhihu.com' ? ("来源：知乎 ")　: null}
                <a rel="noopener noreferrer" target="_blank" href={this.props.data.link}>{this.props.data.link}</a>
              </div>
            </div>
          </div>
        </div>
      )
    else if (this.props.isQA) {
      const bestMatch = this.props.qaDict[this.props.qaIdList[0]];
      return (
        <div>
          <div className="resultContainer">
            <div className="resultTitleContainer">
              <a className="title" rel="noopener noreferrer" target="_blank" href={bestMatch.link}>
                {bestMatch.title}
              </a>
            </div>
            <div className="resultCiteContainer">
              <cite>{bestMatch.cite}</cite>
            </div>
            <div className="resultPreviewContainer">
              {bestMatch.preview}
            </div>
            {this.props.qaIdList.length > 1 ? (
              <div className="resultQAOuterContainer">
                <span style={{ color:'#5f5f5f', fontSize: 12, lineHeight: 2.5 }}>[ 其它{this.props.isQA}上的问答 ]</span>
                {this.props.qaIdList.map((qaId, index) => {
                  if (index === 0) return null;
                  if (index >= 4 && this.state.qaFolded) return null;
                  return (
                    <div key={qaId} className="resultQAContainer">
                      <a rel="noopener noreferrer" target="_blank" href={this.props.qaDict[qaId].link}>
                      &nbsp;&middot;&nbsp;{this.props.qaDict[qaId].title}
                      </a>
                    </div>
                  )
                })}
                {this.props.qaIdList.length > 4 && this.state.qaFolded ? (
                  <div className="foldQAContainer">
                    <a onClick={e => {
                      e.preventDefault();
                      this.setState({ qaFolded: false })
                    }} href={'./#'}>...更多</a>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      )
    }
    else
      return (
        <div className="resultContainer">
          <div className="resultTitleContainer">
            <a className="title" rel="noopener noreferrer" target="_blank" href={this.props.data.link}>
              {this.props.data.title}
            </a>
          </div>
          <div className="resultCiteContainer">
            <cite>{this.props.data.cite}</cite>
          </div>
          <div className="resultPreviewContainer">
            {this.props.data.preview}
          </div>
        </div>
      )
  }
}

export default Result;
