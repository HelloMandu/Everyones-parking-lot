import { createAction, handleActions } from 'redux-actions';

const OPEN = 'snackbar/OPEN';
const CLOSE = 'snackbar/CLOSE';

export const openSnackBar = createAction(OPEN, ({ message, variant, up }) => ({
    message,
    variant,
    up
}));
export const closeSnackBar = createAction(CLOSE);

const initialState = {
    open: false,
    message: '',
    variant: 'default',
    up: true
};

const snackbar = handleActions(
    {
        [OPEN]: (state, action) => {
            const { message, variant, up } = action.payload;
            return {
                ...state,
                open: true,
                message,
                variant,
                up
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
