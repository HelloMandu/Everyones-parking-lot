import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import user, { userSaga } from './user';
import dialog from './dialog';
import loading from './loading';

const rootReducer = combineReducers({
    loading,
    dialog,
    user,
});

export function* rootSaga() {
    yield all([userSaga()]);
}

export default rootReducer;
