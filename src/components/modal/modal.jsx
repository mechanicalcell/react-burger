import  ReactDOM  from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

function ModalHeader({header, onClose}) {
  return(
    <p className={`${styles.modal_header} text text_type_main-large mt-10 mr-10 ml-10`}>
      {header}
      <CloseIcon onClick={onClose} type="primary" />
    </p>
  )
} 

export default function Modal({ children, header, onClose }) {
  return ReactDOM.createPortal(
    <ModalOverlay  onClose={onClose}>
      <ModalHeader header={header} onClose={onClose}></ModalHeader>
      {children}
    </ModalOverlay>  
    ,
    modalRoot
  );
} 
