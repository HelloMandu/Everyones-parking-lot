import React from 'react';
/* Library */

import DetailContainer from '../../containers/main/DetailContainer';
/* Containers */
import qs from 'qs';

const DetailPage = ({match,location}) => {
    const modal = match.params.modal;
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const {place_id} = query;
    console.log('플레이스 아이디');
    console.log(place_id);
    return (
        <div>
            <DetailContainer modal={modal} place_id={place_id}/>
        </div>
    );
}

export default DetailPage;