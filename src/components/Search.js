import React from 'react';
import './Search.css';
import { Search as SearchIcon } from 'react-feather';
import Go from './Go';
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }
  render() {
    let formClass = this.props.isSM ? 'searchForm-sm' : 'searchForm';
    if (this.state.focused) formClass += ' active';
    const hintClass = this.props.isSM ? 'searchHintContainer-sm' : 'searchHintContainer';
    const hintInnerContainerClass = this.props.isSM ? 'hintInnerContainer-sm' : 'hintInnerContainer';
    const hintOptionClass = this.props.isSM ? 'hintOption-sm' : 'hintOption';
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.inp.blur();
          this.props.queryOnSubmit();
        }}
        className={formClass + (this.props.querySuggestions.length && this.state.focused ? ' hasHint' : '')}
        target="/seach"
      >
        <div className={hintClass}>
          <SearchIcon color="#b2b2b2" size={20} />
        </div>
        <input
          ref={inp => this.inp = inp}
          className="queryInput"
          onFocus={() => {
            this.setState({ focused: true });
          }}
          onBlur={e => {
            e.preventDefault()
            setTimeout(() => {
              this.setState({ focused: false });
            }, 300)
          }}
          value={this.props.query}
          onChange={e => this.props.queryOnChange(e.target.value)}
        />
        {this.props.querySuggestions.length && this.state.focused ? ( 
          <div className="hintContainer">
            <div className={hintInnerContainerClass}>
              {this.props.querySuggestions.map((suggestion, index) => (
                <div
                  onClick={() => {
                    this.props.queryOnSubmit(suggestion);
                  }}
                  key={suggestion}
                  className={hintOptionClass}>{suggestion}</div>
              ))}
            </div>
            {!this.props.isSM ? <Go queryOnSubmit={() => this.props.queryOnSubmit()} /> : null }
          </div>
        ) : null }
      </form>
    )
  }
}

export default Search;
