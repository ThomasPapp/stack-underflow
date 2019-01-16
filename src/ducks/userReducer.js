import axios from 'axios';

// action types
const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';

const initialState = {
    user: {}
}

// actions
export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function logout() {
    return {
        type: LOGOUT,
        payload: axios.get("/auth/logout")
    }
}

// reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            }
        case `${LOGOUT}_FULFILLED`:
            return {
                ...state,
                user: {}
            }
    }

    return state;
}