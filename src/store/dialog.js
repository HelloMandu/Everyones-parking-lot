import { createAction, handleActions } from 'redux-actions';

const OPEN = 'dialog/OPEN';
const CLOSE = 'dialog/CLOSE';

export const dialogOpen = createAction(
    OPEN,
    (confirm, title, text, handleClick) => ({
        confirm,
        title,
        text,
        handleClick,
    }),
);

export const dialogClose = createAction(CLOSE, (form) => form);

const initialState = {
    open: false,
    confirm: false,
    title: '',
    text: '',
    handleClick: () => {},
};

const dialog = handleActions(
    {
        [OPEN]: (state, action) => {
            const { confirm, title, text, handleClick } = action.payload;
            return {
                ...state,
                open: true,
                confirm,
                title,
                text,
                handleClick,
            };
        },
        [CLOSE]: (state, action) => ({
            ...state,
            open: false,
        }),
    },
    initialState,
);

export default dialog;
