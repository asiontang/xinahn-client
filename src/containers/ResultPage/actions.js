export const UPDATE_QUERY = 'result/update_query';
export const UPDATE_QUERY_TITLE = 'result/update_query_title';

export const update_query = query => ({
  type: UPDATE_QUERY,
  payload: {
    query,
  }
})

export const update_query_title = query => ({
  type: UPDATE_QUERY_TITLE,
  payload: { query },
})

export const SEARCH_REQUEST = 'result/search_request';
export const SEARCH_DONE = 'result/search_done';
export const SEARCH_RESULT_REFRESH = 'result/search_result_refresh';
export const SEARCH_RESULT_CONCAT = 'result/search_result_concat';
export const TURNOFF_HAS_MORE = 'result/turnoff_has_more';

export const search_request = page => ({
  type: SEARCH_REQUEST,
  payload: { page },
})

export const SEARCH_IMAGE_REQUEST = 'result/search_image_request';
export const SEARCH_IMAGE_RESULT_REFRESH = 'result/search_image_result_refresh';
export const SEARCH_IMAGE_RESULT_CONCAT = 'result/search_image_result_concat';

export const search_image_request = page => ({
  type: SEARCH_IMAGE_REQUEST,
  payload: { page },
})

export const UPDATE_SUGGESTION = 'result/update_suggestion';

export const UPDATE_SEGMENT = 'result/update_segment';

export const update_segment = ({ segment, query }) => ({
  type: UPDATE_SEGMENT,
  payload: { segment, query },
})
