import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UseContainer from '../../containers/main/use/UseContainer'
import UseDetailContainer from '../../containers/main/use/UseDetailContainer'
import UseCancelContainer from '../../containers/main/use/UseCancelContainer'
import UseExtendContainer from '../../containers/main/use/UseExtendContainer'

import { Paths } from '../../paths';

const UsePage = () => {

    return (
        <div>
            <Switch>
                <Route path={Paths.main.use.list} component={UseContainer} />
                <Route path={Paths.main.use.detail} component={UseDetailContainer} />
                <Route path={Paths.main.use.cancle} component={UseCancelContainer} />
                <Route path={Paths.main.use.extend} component={UseExtendContainer} />
                <Route render={() => <h1>이용 내역 404</h1>} />
            </Switch>
        </div>
    );
}
export default UsePage;