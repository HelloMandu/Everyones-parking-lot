import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import user, { userSaga } from './user';
import dialog from './dialog';
import loading from './loading';
import position from './main/position';
import filters from './main/filters';

const rootReducer = combineReducers({
    loading,
    dialog,
    user,
    position,
    filters,
});

export function* rootSaga() {
    yield all([userSaga()]);
}

export default rootReducer;
