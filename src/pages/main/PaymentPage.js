import React from 'react';
/* Library */

import PaymentContainer from '../../containers/main/PaymentContainer';
/* Containers */

const PaymentPage = ({location, match}) => {

    return <PaymentContainer location={location} match={match}/>
};

export default PaymentPage;