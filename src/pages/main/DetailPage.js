import React from 'react';
/* Library */

import DetailContainer from '../../containers/main/DetailContainer';
/* Containers */

const DetailPage = ({match}) => {
    const modal = match.params.modal;

    return (
        <div>
            <DetailContainer modal={modal}/>
        </div>
    );
}

export default DetailPage;