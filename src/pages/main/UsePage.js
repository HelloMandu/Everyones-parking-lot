import React from 'react';
import { Switch, Route,useHistory} from 'react-router-dom';
import UseListContainer from '../../containers/main/use/UseListContainer'
import UseDetailContainer from '../../containers/main/use/UseDetailContainer'
import UseCancelContainer from '../../containers/main/use/UseCancelContainer'
import UseExtendContainer from '../../containers/main/use/UseExtendContainer'

import { Paths } from '../../paths';

const UsePage = () => {
    const history= useHistory();
    return (
            <Switch>
                <Route path={Paths.main.use.list} component={UseListContainer} />
                <Route path={Paths.main.use.detail + '/:modal?'} component={UseDetailContainer} />
                <Route path={Paths.main.use.cancel} component={UseCancelContainer} />
                <Route path={Paths.main.use.extend + '/:modal?/:modal2?'} component={UseExtendContainer} />
                <Route render={() =>history.replace(Paths.main.use.list)} />
            </Switch>
    );
}
export default UsePage;