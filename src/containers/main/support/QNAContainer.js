// import React, { useState } from 'react';
// import { ButtonBase } from '@material-ui/core';
// /* Library */

// import styles from './QNAContainer.module.scss';
// import Notice from '../../../static/asset/svg/Notice';
// import { Link } from 'react-router-dom';
// /* StyleSheets */

// import { Paths } from '../../../paths';
// /* Paths */

// const Header = () => {
//     return (
//         <div className={styles['header-container']}>
//             <Link to={Paths.main.support.qna_write}>
//                 <ButtonBase className={styles['write-button']}>문의 작성</ButtonBase>
//             </Link>
//         </div>
//     );
// };

// const QNAContainer = () => {

//     const [QNAList, setQNSList] = useState([
//         {
//             qna_id: 1,
//             qna_date: '2020/05/22',
//             qna_title: 'TEST 공지사항',
//             qna_name: '스페이스',
//             qna_cnt: '조회수 123',
//         },
//         {
//             qna_id: 2,
//             qna_date: '2020/05/22',
//             qna_title: 'TEST 공지사항',
//             qna_name: '스페이스',
//             qna_cnt: '조회수 123',
//         },
//         {
//             qna_id: 3,
//             qna_date: '2020/05/22',
//             qna_title: 'TEST 공지사항',
//             qna_name: '스페이스',
//             qna_cnt: '조회수 123',
//         },
//     ]);

//     if (QNAList.length !== 0) {
//         return (
//             <>
//                 <Header />
//                 <div className={styles['container']}>
//                     1:1문의 리스트뷰
//                 </div>
//             </>
//         )
//     }
//     return (
//         <>
//             <Header />
//             <div className={styles['non-qna']}>
//                 <div className={styles['non-container']}>
//                     <Notice />
//                     <div className={styles['explain']}>등록된 1:1 문의가 없습니다.</div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default QNAContainer;