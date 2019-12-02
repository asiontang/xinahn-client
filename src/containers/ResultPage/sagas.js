import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import {
  UPDATE_SUGGESTION,
  SEARCH_REQUEST,
  SEARCH_DONE,
  SEARCH_RESULT_REFRESH,
  SEARCH_RESULT_CONCAT,
  UPDATE_QUERY,
  TURNOFF_HAS_MORE,
  SEARCH_IMAGE_REQUEST,
  SEARCH_IMAGE_RESULT_REFRESH,
  SEARCH_IMAGE_RESULT_CONCAT
} from './actions';

import {
  makeSelectNavInfo,
} from './selectors';

import request from '../../utils/request';

export function* searchQueryRequest(action) {
  try {
    const navInfo = yield select(makeSelectNavInfo());
    const queryInfo = {
      query: navInfo.query,
      page: action.payload.page,
    }
    const response = yield call(
      request,
      'query',
      `/search`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(queryInfo)
      },
    );
    yield put({ type: SEARCH_DONE });
    if (response.errCode || !response.success) {
      console.log(`query went wrong....`);
      yield put({
        type: TURNOFF_HAS_MORE,
      })
    } else {
      const updateType = (action.payload.page === 1) ? SEARCH_RESULT_REFRESH : SEARCH_RESULT_CONCAT;
      console.log('response: ', response);
      yield put({
        type: updateType,
        payload: response,
      })
    }
  } catch {
    // Network request failed, try calling server
    console.log(`network request failed`);
    yield put({ type: SEARCH_DONE });
  }
}

export const searchRequest = takeLatest(SEARCH_REQUEST, searchQueryRequest);

export function* searchQueryImageRequest(action) {
  try {
    const navInfo = yield select(makeSelectNavInfo());
    const queryInfo = {
      query: navInfo.query,
      page: action.payload.page,
    }
    const response = yield call(
      request,
      'query',
      `/search_image`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(queryInfo)
      },
    );
    yield put({ type: SEARCH_DONE });
    if (response.errCode || !response.success) {
      console.log(`query went wrong....`);
      yield put({
        type: TURNOFF_HAS_MORE,
      })
    } else {
      const updateType = (action.payload.page === 1) ? SEARCH_IMAGE_RESULT_REFRESH : SEARCH_IMAGE_RESULT_CONCAT;
      console.log('Image response: ', response);
      yield put({
        type: updateType,
        payload: response,
      })
    }
  } catch {
    // Network request failed, try calling server
    console.log(`network request failed`);
    yield put({ type: SEARCH_DONE });
    yield put({ type: TURNOFF_HAS_MORE });
  }
}

export const searchImageRequest = takeLatest(SEARCH_IMAGE_REQUEST, searchQueryImageRequest);

export function* querySuggestionRequest(action) {
  console.log('Passed in action: ', action.payload.query)
  try {
    const response = yield call(
      request,
      'query',
      `/suggestion?q=${encodeURI(action.payload.query)}`,
      {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      },
    );
    yield　put({ type:  UPDATE_SUGGESTION, payload: { suggestions: response[1] }})

  } catch {
    // Network request failed, try calling server
    console.log(`network request failed`);
  }
}

export const querySRequest = takeLatest(UPDATE_QUERY, querySuggestionRequest);

export default function* rootSaga() {
  yield all([
    searchRequest,
    searchImageRequest,
    querySRequest,
  ])
}