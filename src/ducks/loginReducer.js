// action types
const TOGGLE_LOGIN_MODAL = "TOGGLE_LOGIN_MODAL";
const TOGGLE_REGISTER = "TOGGLE_REGISTER";
const TOGGLE_RECOVER_ACCOUNT = "TOGGLE_RECOVER_ACCOUNT";

// initial state
const initalState = {
    displayModal: false,
    register: false,
    recover: false
}

// actions

/**
 * Toggles the display of the login modal
 * 
 * @param {boolean} display - If the modal should be displayed
 */
export function toggleModal(display) {
    console.log("display modal")
    return {
        type: TOGGLE_LOGIN_MODAL,
        payload: display
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

// reducer
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                displayModal: action.payload
            }
        case TOGGLE_REGISTER:
            return {
                ...state,
                recover: false,
                register: action.payload
            }
        case TOGGLE_RECOVER_ACCOUNT:
            return {
                ...state,
                register: false,
                recover: action.payload
            }
    }

    return state;
}