import React from 'react'
import qs from 'qs'

const UseCancelContainer = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    })

    const {id} = query

    return <>대여취소신청_{id}</>
}

export default UseCancelContainer