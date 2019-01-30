import axios from 'axios';

// action types
const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';

const initialState = {
    user: {}
}

// actions
export function getUser() {
    return {
        type: GET_USER,
        payload: axios.get('/auth/user')
    }
}

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
        case `${GET_USER}_FULFILLED`:
            return {
                ...state,
                user: action.payload.data
            }
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