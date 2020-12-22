const PAYMENT_SELECT = '결제수단 선택';
const PAYMENT_CARD = '등록카드결제';
const PAYMENT_KAKAO = '카카오페이';
const PAYMENT_NAVER = '네이버페이';
const PAYMENT_PAYCO = '페이코';

export const paymentType = (type) => {
    return type === 0
        ? PAYMENT_CARD
        : type === 1
        ? PAYMENT_KAKAO
        : type === 2
        ? PAYMENT_NAVER
        : type === 3
        ? PAYMENT_PAYCO
        : PAYMENT_SELECT;
};
