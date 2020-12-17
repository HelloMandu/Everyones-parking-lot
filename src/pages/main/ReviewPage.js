import React from 'react';
import { Switch, Route , useHistory} from 'react-router-dom';
/* Library */

import ReviewListContainer from '../../containers/main/review/ReviewListContainer';
import ReviewWriteContainer from '../../containers/main/review/ReviewWriteContainer';
import ReviewDetailContainer from '../../containers/main/review/ReviewDetailContainer';
/* Containers */

import { Paths } from '../../paths';
/* Paths */

const ReviewPage = () => {
    const history = useHistory();

    return (
        <div>
            <Switch>
                <Route path={Paths.main.review.list} component={ReviewListContainer} />
                <Route path={Paths.main.review.write} component={ReviewWriteContainer} />
                <Route path={Paths.main.review.detail} component={ReviewDetailContainer} />
                <Route render={() => history.replace(Paths.main.review.list)} />
            </Switch>
        </div>
    );
}
export default ReviewPage;