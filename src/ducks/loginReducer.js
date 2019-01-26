// action types
const TOGGLE_LOGIN_MODAL = "TOGGLE_LOGIN_MODAL";
const TOGGLE_REGISTER = "TOGGLE_REGISTER";
const TOGGLE_RECOVER_ACCOUNT = "TOGGLE_RECOVER_ACCOUNT";
const UPDATE_USERNAME = "UPDATE_USERNAME";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";
const UPDATE_ERROR_MESSAGE = "UPDATE_ERROR_MESSAGE";
const UPDATE_LOADING = "UPDATE_LOADING";

// initial state
const initalState = {
    displayModal: false,
    register: false,
    recover: false,
    
    // inputs
    username: '',
    password: '',

    // loading/waiting for response
    loading: false,

    // error message
    errorMessage: ''
}

// actions

/**
 * Toggles the display of the login modal
 * 
 * @param {boolean} display - If the modal should be displayed
 */
export function toggleModal(display) {
    return {
        type: TOGGLE_LOGIN_MODAL,
        payload: display,
    }
}

/**
 * Toggles the display of the register modal
 * 
 * @param {boolean} display - If the register modal should be displayed
 */
export function toggleRegister(display) {
    return {
        type: TOGGLE_REGISTER,
        payload: display
    }
}

/**
 * Toggles the display of the recover account modal
 * 
 * @param {boolean} display - If the recover account modal should be displayed
 */
export function toggleRecover(display) {
    return {
        type: TOGGLE_RECOVER_ACCOUNT,
        payload: display
    }
}

export function updateUsername(username) {
    return {
        type: UPDATE_USERNAME,
        payload: username
    }
}

export function updatePassword(password) {
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}

export function updateErrorMessage(errorMessage) {
    return {
        type: UPDATE_ERROR_MESSAGE,
        payload: errorMessage
    }
}

export function updateLoading(loading) {
    return {
        type: UPDATE_LOADING,
        payload: loading
    }
}

// reducer
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                displayModal: action.payload,
                register: false,
                recover: false,
                username: '',
                password: '',
                loading: false,
                errorMessage: ''
            }
        case TOGGLE_REGISTER:
            return {
                ...state,
                recover: false,
                loading: false,
                register: action.payload
            }
        case TOGGLE_RECOVER_ACCOUNT:
            return {
                ...state,
                register: false,
                loading: false,
                recover: action.payload
            }
        case UPDATE_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case UPDATE_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case UPDATE_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload
            }
        case UPDATE_LOADING:
            return {
                ...state,
                loading: action.payload
            }
    }

    return state;
}