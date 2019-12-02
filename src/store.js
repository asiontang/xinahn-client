import { createStore, combineReducers, applyMiddleware } from 'redux';

import resultStore from './containers/ResultPage/reducer';

import createSagaMiddleware from 'redux-saga';
import ResultSaga from './containers/ResultPage/sagas';

const rootReducer = combineReducers({
  result: resultStore,
});

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(ResultSaga);