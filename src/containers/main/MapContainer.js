import React from 'react';
import { Link } from 'react-router-dom'

import { Paths } from '../../paths'

const MapContainer = () => {

    return (
        <div>
            메인 화면 (맵페이지)

            <div><Link to={Paths.main.use.list} >이용내역</Link></div>
        </div>
    );
};

export default MapContainer;