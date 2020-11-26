import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import user, { userSaga } from './user';
import dialog from './dialog';
import loading from './loading';
import user_position from './user_position';

const rootReducer = combineReducers({
    loading,
    dialog,
    user,
    user_position,
});

export function* rootSaga() {
    yield all([userSaga()]);
}

export default rootReducer;
