import React from 'react';
/* Library */

import MapContainer from '../../containers/main/MapContainer';
/* Containers */

const MapPage = ({ match }) => {
    const modal = match.params.modal;
    return <MapContainer modal={modal} />;
};

export default MapPage;
