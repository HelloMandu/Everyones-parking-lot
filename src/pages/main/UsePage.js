import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UseListContainer from '../../containers/main/use/UseListContainer'
import UseDetailContainer from '../../containers/main/use/UseDetailContainer'
import UseCancelContainer from '../../containers/main/use/UseCancelContainer'
import UseExtendContainer from '../../containers/main/use/UseExtendContainer'

import { Paths } from '../../paths';

const UsePage = () => {

    return (
        <div>
            <Switch>
                <Route path={Paths.main.use.list} component={UseListContainer} />
                <Route path={Paths.main.use.detail} component={UseDetailContainer} />
                <Route path={Paths.main.use.cancel} component={UseCancelContainer} />
                <Route path={Paths.main.use.extend} component={UseExtendContainer} />
                <Route render={() => <h1>이용 내역 404</h1>} />
            </Switch>
        </div>
    );
}
export default UsePage;