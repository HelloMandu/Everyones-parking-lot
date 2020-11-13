import React from 'react';
import qs from 'qs';
import { useLocation } from 'react-router-dom';
/* Library */

const EnrollPreview = () => {

    return (
        <div>
            <h1>주차공간 등록 미리보기</h1>
        </div>
    );
};

const ModifyPreview = () => {

    // requestPutModifyParking API

    return (
        <div>
            <h1>주차공간 수정 미리보기</h1>
        </div>
    );
};

const ParkingPreviewContainer = () => {

    const location = useLocation();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const { place_id } = query;
    return (
        <div>
            {place_id ? <ModifyPreview /> : <EnrollPreview />}
        </div>
    );
};

export default ParkingPreviewContainer;