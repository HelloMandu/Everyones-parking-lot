import React from 'react';
import { Switch, Route } from 'react-router-dom';
/* Library */

import NoticeDetailContainer from '../../containers/main/support/NoticeDetailContainer';
import QNADetailContainer from '../../containers/main/support/QNADetailContainer';
import QNAWriteContainer from '../../containers/main/support/QNAWriteContainer';
import SupportContainer from '../../containers/main/support/SupportContainer';
/* Container */

import { Paths } from '../../paths';
/* Paths */

const SupportPage = () => {
    return (
        <Switch>
            <Route path={Paths.main.support.notice_detail} component={NoticeDetailContainer} />
            <Route path={Paths.main.support.qna_detail} component={QNADetailContainer} />
            <Route path={Paths.main.support.qna_write} component={QNAWriteContainer} />
            <Route path={Paths.main.support.index + '/:mode?'} component={SupportContainer} />
            <Route render={({ history }) => history.replace(Paths.main.support.index + '/notice')} />
        </Switch>
    );
};

export default SupportPage;