import { ADD_TO_CART, REMOVE_FROM_CART, STORE_DATA_FROM_API, ADD_FILTER, REMOVE_FILTER, INCREASE_GPA, DECREASE_GPA, SORT_TABLE, TOGGLE_DRAWER} from './actionTypes';

export const addToCart = userId => ({
    type: ADD_TO_CART,
    payload: {
        userId
    }
});

export const removeFromCart = userId => ({
    type: REMOVE_FROM_CART,
    payload: {
        userId
    }
});

export const addFilter = (filter, category) => ({
    type: ADD_FILTER,
    payload: {
        filter,
        category
    }
});

export const removeFilter = (filter, category) => ({
    type: REMOVE_FILTER,
    payload: {
        filter,
        category
    }
})


export const storeDataFromAPI = data => ({
    type: STORE_DATA_FROM_API,
    payload: {
        data
    }
});

export const increaseGPA = num => ({
    type: INCREASE_GPA,
    payload: {
        num
    }
});

export const decreaseGPA = num => ({
    type: DECREASE_GPA,
    payload: {
        num
    }
});

export const sortTable = (category, direction) => ({
    type: SORT_TABLE,
    payload: {
        category,
        direction
    }
});

export const toggleDrawer = () => ({
    type: TOGGLE_DRAWER
});