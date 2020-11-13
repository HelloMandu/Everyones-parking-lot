import React from 'react'
import qs from 'qs'
import { Link } from 'react-router-dom'

import { Paths } from '../../../paths';

const UseDetailContainer = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    })

    const { id } = query

    return (
        <>
            이용내역서_{id}
            <div><Link to={Paths.main.use.cancle + `?id=${id}`}>대여 취소하기</Link></div>
            <div><Link to={Paths.main.use.extend + `?id=${id}`}>연장하기</Link></div>
        </>
    )
}

export default UseDetailContainer