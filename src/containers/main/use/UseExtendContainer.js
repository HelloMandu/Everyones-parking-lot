import React from 'react'
import qs from 'qs'

const UseExtendContainer = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    })

    const {id} = query

    return <>연장신청_{id}</>
}

export default UseExtendContainer
