// const QUERY_URL = 'http://localhost:4100/api';
const QUERY_URL = '/api';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  return {
    errCode: response.status,
    errMsg: response.statusText,
  };
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  return response;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(baseType, endpoint, options) {
  let url = '';
  switch(baseType) {
    case 'query':
      url = QUERY_URL;
      break;
    default:
      url = QUERY_URL;
      break;
  }
  console.log(
    '==>',
    `${url}${endpoint}`,
    options,
  )
  return fetch(
    `${url}${endpoint}`,
    options
  )
    .then(checkStatus)
    .then(parseJSON);
}
