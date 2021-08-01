import classes from './Modal.module.css';
import {Fragment} from "react";
import {createPortal} from "react-dom";

const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClose} />
    );
};

const ModalOverlay = () => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = props => {
    return (
        <Fragment>
            {/* approach 1(without portal): */}
            {/*<Backdrop />*/}
            {/*<ModalOverlay />*/}
            {/* approach 2(portals): */}
            {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    );
};

export default Modal;
