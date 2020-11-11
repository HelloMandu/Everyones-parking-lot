import axios from 'axios'

import { Paths } from '../paths'

export const requestGetParkingList = async({
    lat,
    lng,
    range,
    min_price,
    max_price,
    start_date,
    end_date,
    filter
}) => {

    // lat: 요청할 주차공간의 기준 위도(Float, 필수) => 세로
	// lng: 요청할 주차공간의 기준 경도(Float, 필수) => 가로
	// range: 요청할 주차공간의 거리 범위(Intager, 10km?)
	// min_price: 최소 가격(Intager)
	// max_price: 최대 가격(Intager)
	// start_date: 입차시각(DateTimeString)
	// end_date: 출차시각(DateTimeString)
	// filter: 필터링 항목([type…])

	// * 응답: places: [주차공간 Array…]
    
    const URL = Paths.api + "api/place"
    const response = await axios.get(URL)

    return response
}

export const requestGetLikeParkingList = async(JWT_TOKEN) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
	// filter: 전체 같은 필터링이 있는거같긴한데…???

	// * 응답: places: [주차공간 Array…]
    
    const URL = Paths.api + "api/place/like"
    const response = await axios.get(URL)

    return response
}

export const requestGetDetailParking = async(place_id) => {
    // { params: place_id }: 상세 보기할 주차공간 id(필수)
	
    // * 응답: place: 주차공간 데이터 Object(리뷰 리스트 데이터도 포함)
    
    const config = {
        params: {
            place_id: place_id
        }
    }
    
    const URL = Paths.api + "api/place/place_id"
    const response = await axios.get(URL, config)

    return response
}

export const requestPutLikeParking = async(JWT_TOKEN, {status}) => {
    // { headers }: JWT_TOKEN(유저 로그인 토큰)
	// status: 좋아요 상태(boolean, 필수)

	// * 응답: status: 변경된 좋아요 상태
    
    const URL = Paths.api + "api/place/like"
    const response = await axios.get(URL, {status})

    return response
}