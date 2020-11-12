import React from 'react';
import { Switch, Route } from 'react-router-dom';
/* Library */

import ReviewListContainer from '../../containers/main/review/ReviewListContainer';
import ReviewWriteContainer from '../../containers/main/review/ReviewWriteContainer';
import ReviewDetailContainer from '../../containers/main/review/ReviewDetailContainer';
/* Containers */

import { Paths } from '../../paths';
/* Paths */

const ReviewPage = () => {

    return (
        <div>
            <Switch>
                <Route path={Paths.main.review.list} component={ReviewListContainer} />
                <Route path={Paths.main.review.write} component={ReviewWriteContainer} />
                <Route path={Paths.main.review.detail} component={ReviewDetailContainer} />
                <Route render={() => <h1>리뷰 페이지 404</h1>} />
            </Switch>
        </div>
    );
}
export default ReviewPage;