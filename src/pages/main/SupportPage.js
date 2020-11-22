import React from 'react';
// import qs from 'qs';
/* Library */
import { Switch, Route,useHistory} from 'react-router-dom';

import NoticeContainer from '../../containers/main/support/NoticeContainer';
import NoticeDetailContainer from '../../containers/main/support/NoticeDetailContainer';
import QNAContainer from '../../containers/main/support/QNAContainer';
import QNADetailContainer from '../../containers/main/support/QNADetailContainer';
import FAQContainer from '../../containers/main/support/FAQContainer';
import { Paths } from '../../paths';


const SupportPage = ({ match, location }) => {

    const history= useHistory();
    return (
            <Switch>
                <Route exact path={Paths.main.support.notice} component={NoticeContainer} />
                <Route path={Paths.main.support.notice_detail} component={NoticeDetailContainer} />
                <Route path={Paths.main.support.faq} component={FAQContainer} />
                <Route exact path={Paths.main.support.qna} component={QNAContainer} />
                <Route path={Paths.main.support.qna_detail} component={QNADetailContainer} />
                <Route render={() =>history.replace(Paths.main.support.notice)} />
            </Switch>
    );
};

export default SupportPage;