import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import user, { userSaga } from './user';
import dialog from './dialog';
import loading from './loading';
import position, { areaSaga } from './main/position';
import filters from './main/filters';
import parking, { parkingSaga } from './main/parking';
import myParking, { myParkingSaga } from './myParking';

const rootReducer = combineReducers({
    loading,
    dialog,
    user,
    position,
    filters,
    parking,
    myParking,
});

export function* rootSaga() {
    yield all([userSaga(), parkingSaga(), areaSaga(), myParkingSaga()]);
}

export default rootReducer;
