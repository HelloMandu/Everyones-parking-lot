import React from 'react';
/* Library */

// import NoticeDetailContainer from './NoticeDetailContainer';
// import NoticeContainer from '../NoticeContainer';
// import FAQContainer from './FAQContainer';
// import QNAContainer from './QNAContainer';
/* Containers */

// const getPaths = ['notice', 'faq', 'qna'];

const SupportContainer = ({ mode, modal, id }) => {

    // const history = useHistory();
    // const index = getPaths.findIndex(path => path === mode); // 현재 보여줘야 할 내용 결정.

    // useEffect(() => {
    //     if (modal !== 'view') {
    //         switch (index) {
    //             case 0:
    //                 // 공지사항 리스트
    //                 break;
    //             case 1:
    //                 // 공지사항 자주묻는질문
    //                 break;
    //             case 2:
    //                 // 공지사항 1:1 문의
    //                 break;
    //             default:
    //                 history.push(Paths.main.support + '/notice')
    //                 break;
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [index, modal]);


    return (
        <div>
            공지사항 리스트 뷰
            {/* {modal === 'view' ? <NoticeDetailContainer viewId={id} />
                : index === 0 ? <NoticeContainer noticeList={noticeList} />
                    : (index === 1 ? <FAQContainer faqList={faqList} faqType={faqType} setFaqType={setFaqType} />
                        : <QNAContainer qnaList={qnaList} modal={modal} />)} */}
        </div>
    );
};

export default SupportContainer;