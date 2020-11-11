import React from 'react';
import {useLocation} from 'react-router-dom';
import { Paths } from '../../paths';
import { Switch, Route } from 'react-router-dom';
const EventPage = () => {

    return (
        <div>
            <Switch>
                <Route path={Paths.main.event.list} render={() => <h1>이벤트 리스트</h1>} />
                <Route path={Paths.main.event.detail} render={() => <h1>이벤트 상세보기</h1>} />
                <Route render={() => <h1>이벤트 페이지 404</h1>} />
            </Switch>
        </div>
    );
}
export default EventPage;