import { createSelector } from 'reselect';
import { initialState } from './reducer';

const makeSelectResult = state => state.result || initialState;

const makeSelectNavInfo = () => createSelector(
  makeSelectResult,
  ResultState => ResultState.navInfo,
)

const makeSelectLinks = () => createSelector(
  makeSelectResult,
  ResultState => ResultState.links
)

const makeSelectQAZH = () => createSelector(
  makeSelectResult,
  ResultState => ResultState.qaZH
)

const makeSelectWiki = () => createSelector(
  makeSelectResult,
  ResultState => ResultState.wiki
)

const makeSelectImages = () => createSelector(
  makeSelectResult,
  ResultState => ResultState.images
)

export {
  makeSelectNavInfo,
  makeSelectLinks,
  makeSelectQAZH,
  makeSelectWiki,
  makeSelectImages,
};
