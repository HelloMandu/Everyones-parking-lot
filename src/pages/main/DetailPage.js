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
    return (
        <div>
            <DetailContainer 
            modal={modal} place_id={place_id}
            match={match} location={location}
            />
        </div>
    );
}

export default DetailPage;