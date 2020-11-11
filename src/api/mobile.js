import axios from 'axios'

import makeFormData from '../lib/makeFormData'

import { Paths } from '../paths'

export const requestPostAuth = async({ phone_number }) => {
    // 휴대폰 인증 번호 요청 API(POST): /api/mobile/auth
	// phone_number: 유저 휴대폰 번호(String, 필수)

    // * 응답: success / failure
    
    const formData = makeFormData({
        phone_number
    })

    const URL = Paths.api + "api/mobile/auth"
    const response = await axios.post(URL, formData)

    return response
}

export const requestPostConfirm = async({ phone_number, auth_number }) => {
    // phone_number: 유저 휴대폰 번호(String, 필수)
	// auth_number: 전달 받은 인증 번호(String, 필수)

    // * 응답: success / failure
    
    const formData = makeFormData({
        phone_number,
        auth_number
    })

    const URL = Paths.api + "api/mobile/confirm"
    const response = await axios.post(URL, formData)

    return response
}