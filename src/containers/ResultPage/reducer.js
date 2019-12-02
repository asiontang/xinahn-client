import produce from 'immer';

import {
  UPDATE_SEGMENT,
  UPDATE_SUGGESTION,
  UPDATE_QUERY,
  SEARCH_REQUEST,
  SEARCH_DONE,
  SEARCH_RESULT_REFRESH,
  SEARCH_RESULT_CONCAT,
  UPDATE_QUERY_TITLE,
  TURNOFF_HAS_MORE,
  SEARCH_IMAGE_RESULT_REFRESH,
} from './actions';

export const initialState = {
  navInfo: {
    segment: 'search',
    queryTitle: '',
    query: '',
    querySuggestions: [],
    page: 0,
    imagePage: 0,
    newsPage: 0,
    suggestion: '',
    // only for page 1
    loading: false,
    loadingMore: false,
    hasMore: true,
  },
  images: {
    allIds: [],
    byId: {},
  },
  links: {
    allIds: [],
    byId: {},
  },
  wiki: {
    link: '',
    picture: '',
    title: '',
    preview: '',
    domain: '',
  },
  qaZH: {
    allIds: [],
    byId: {},
  },
  qaZD: {
    allIds: [],
    byId: {},
  }
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_SUGGESTION:
        draft.navInfo.querySuggestions = action.payload.suggestions;
        break;
      case UPDATE_SEGMENT:
        if (action.payload.query) {
          draft.navInfo.query = action.payload.query || '';
          draft.navInfo.queryTitle = action.payload.queryTitle || '';
        }
        draft.navInfo.segment = action.payload.segment;
        break;
      case SEARCH_REQUEST:
        draft.navInfo.loading = true;
        draft.navInfo.page = action.payload.page;
        draft.navInfo.queryTitle = draft.navInfo.query;
        draft.navInfo.querySuggestions = [];
        break;
      case TURNOFF_HAS_MORE:
        draft.navInfo.hasMore = false;
        break;
      case SEARCH_DONE:
        draft.navInfo.loading = false;
        break;
      case UPDATE_QUERY:
        draft.navInfo.query = action.payload.query;
        break;
      case UPDATE_QUERY_TITLE:
        draft.navInfo.queryTitle = action.payload.query;
        break;
      case SEARCH_IMAGE_RESULT_REFRESH:
        let imageIds = [];
        let imageDict = {};
        for (let r of action.payload.images) {
          if (imageIds.indexOf(r.id) === -1) {
            imageIds.push(r.id);
            imageDict[r.id] = r;
          }
        }
        draft.images = {
          allIds: imageIds,
          byId: imageDict,
        };
        break;
      case SEARCH_RESULT_REFRESH: {
        let linkIds = [];
        let linkDict = {};
        for (let r of action.payload.results) {
          if (linkIds.indexOf(r.link) === -1) {
            linkIds.push(r.link);
            linkDict[r.link] = r;
          }
        }
        let qaZHIds = [];
        let qaZHDict = {};
        for (let qaZH of action.payload.qa.zhihus) {
          if (qaZHIds.indexOf(qaZH.link) === -1) {
            qaZHIds.push(qaZH.link);
            qaZHDict[qaZH.link] = qaZH;
          }
        }
        draft.navInfo.hasMore = !(linkIds.length < 5);
        draft.links = {
          allIds: linkIds,
          byId: linkDict,
        };
        draft.qaZH = {
          allIds: qaZHIds,
          byId: qaZHDict,
        };
        draft.wiki = {
          ...action.payload.wiki,
        }
        break;
      }
      case SEARCH_RESULT_CONCAT: {
        let linkIds = draft.links.allIds;
        let linkDict = draft.links.byId;
        for (let r of action.payload.results) {
          if (linkIds.indexOf(r.link) === -1) {
            linkIds.push(r.link);
            linkDict[r.link] = r;
          }
        }
        draft.links = {
          allIds: linkIds,
          byId: linkDict,
        }
        break;
      }
      default:
        break;
      
    }
  }
)

export default reducer;