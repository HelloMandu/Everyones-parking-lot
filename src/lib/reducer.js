export const inputReducer = (state, action) => ({
    ...state,
    [action.name]: action.value
});
