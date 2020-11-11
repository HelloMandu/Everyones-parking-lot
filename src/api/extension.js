import axios from 'axios'

import makeFormData from '../lib/makeFormData'

import { Paths } from '../paths'

export const requestPostExtension = async(JWT_TOKEN, {
	rental_id,
	end_time,
	payment_time,
	extension_price
}) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
	// rental_id: 대여 주문 번호
	// end_time: 연장 종료 시간
	// payment_type: 결제 수단
	// extension_price: 연장 추가비

	// * 응답: success / failure

	const formData = makeFormData({
		rental_id,
		end_time,
		payment_time,
		extension_price
	})
    
    const URL = Paths.api + "api/extension"
    const response = await axios.post(URL, formData)

    return response
}