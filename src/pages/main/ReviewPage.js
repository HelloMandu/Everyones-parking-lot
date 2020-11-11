import React from 'react';
import {useLocation} from 'react-router-dom';
import { Paths } from '../../paths';
import { Switch, Route } from 'react-router-dom';

const ReviewPage = () => {

    return (
        <div>
            <Switch>
                <Route path={Paths.main.review.list} render={() => <h1>리뷰 리스트</h1>} />
                <Route path={Paths.main.review.write} render={() => <h1>리뷰 쓰기</h1>} />
                <Route path={Paths.main.review.detail} render={() => <h1>리뷰 상세보기</h1>} />
                <Route render={() => <h1>리뷰 페이지 404</h1>} />
            </Switch>
        </div>
    );
}
export default ReviewPage;