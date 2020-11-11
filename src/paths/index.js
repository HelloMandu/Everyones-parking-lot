export const Paths = {
    main: {
        index: '/',
        detail: '/detail',
        payment: '/payment',
        payment_complete:'/payment_complete',
        use : {
            index : '/use',
            list : '/use/list',
            detail :'/use/detail',
            cancle :'/use/cancle',
            extend :'/use/extend',
        },
        review:{
            index:'/review',
            list :'/review/list',
            write: '/review/write',
            detail :'/review/detail',
        },
        mypage:{
            index: '/mypage',
            point: '/mypage/point',
            update:{
                index : '/mypage/update',
                name:'/mypage/update/name',
                password :'/mypage/update/password',
                hp: '/mypage/update/hp',
                enrollment: '/mypage/update/enrollment',
                birthday: '/mypage/update/birthday',
                profile: '/mypage/update/profile',
            }
        },
        parking:{
            index :'/parking',
            manage: '/parking/manage',
            enrollment: '/parking/enrollment',
            preview :'/parking/preview',
        },
        notice : '/notice',
        coupon : '/coupon',
        event:{
            index:'/event',
            list :'/event/list',
            detail :'/event/detail',
        },
        support: '/support',
    },
    auth: {
        index: '/auth',
        login :'/auth/login',
        signin: '/auth/signin',
        signup:'/auth/signup',
        enrollment :'/auth/enrollment',
        sign_complete :'/auth/sign_complete',
        find:{
            index :'/auth/find',
            email:'/auth/find/email',
            password:'/auth/find/password',
            email_complete:'/auth/find/email_complete',
            password_complete:'/auth/find/password_complete',
        }
    },
    api: 'https://www.naver.com/'
};