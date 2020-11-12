import React from 'react';
import qs from 'qs';
/* Library */

import SupportContainer from '../../containers/main/support/SupportContainer';
/* Containers */

/* ------------------ sandal 가맹점 참고 ------------------- */

const SupportPage = ({ match, location }) => {

    const { mode, modal } = match.params;

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const { id } = query;

    return <SupportContainer mode={mode ? mode : 'notice'} modal={modal} id={id} />;
};

export default SupportPage;