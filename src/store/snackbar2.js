import { createAction, handleActions } from 'redux-actions';

const OPEN = 'snackbar/OPEN';
const CLOSE = 'snackbar/CLOSE';

export const openSnackBar = createAction(OPEN, ({ message, variant }) => ({
    message,
    variant,
}));
export const closeSnackBar = createAction(CLOSE);

const initialState = {
    open: false,
    message: '',
    variant: 'default',
};

const snackbar = handleActions(
    {
        [OPEN]: (state, action) => {
            const { message, variant } = action.payload;
            return {
                ...state,
                open: true,
                message,
                variant,
            };
        },
        [CLOSE]: (state, action) => {
            return {
                ...state,
                open: false,
            };
        },
    },
    initialState,
);

export default snackbar;
