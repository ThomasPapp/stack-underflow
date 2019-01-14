import React from 'react';

import './modal.css';
import './modal-form.css';

/**
 * An abstract modal component which can take in a component displaying content within the modal.
 * 
 * @param {object} props - The props object is expecting a property of 'display: boolean',
 *  'toggleDisplay: function', and 'ModalContent: component'
 */
const Modal = props => (
    <div className={ props.display ? "modal" : "modal-closed" }>
        <div className={props.display ? "modal-container" : "modal-container-closed"}>
            <span className="modal-close-button" onClick={props.toggleDisplay} />
            { <props.ModalContent/> }
        </div>
    </div>
);

export default Modal;