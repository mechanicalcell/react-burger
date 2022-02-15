import  ReactDOM  from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useEffect } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

function ModalHeader({header, onClose}) {
  return(
    <div className={`${styles.modal_header} text text_type_main-large mt-10 mr-10 ml-10`}>
      <div className={styles.modal_header_text}>
        {header}
      </div>
      <CloseIcon onClick={onClose} type="primary" />
    </div>
  )
} 

ModalHeader.propTypes = {
  header: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}; 

export default function Modal({ children, header, onClose }) {
  const ESC_KEYCODE = "Escape";
  
  const handleCloseByEsc = useCallback( (e) => {
    e.key === ESC_KEYCODE && onClose();
      },[onClose]);
        
  useEffect(() => {
    document.addEventListener('keydown', handleCloseByEsc);
    return () => {
      document.removeEventListener('keydown', handleCloseByEsc);
    };
  }, [handleCloseByEsc]);

  return ReactDOM.createPortal(
    <ModalOverlay  onClose={e => e.stopPropagation()}>
      <ModalHeader header={header} onClose={onClose}></ModalHeader>
      {children}
    </ModalOverlay>  
    ,
    modalRoot
  );
} 

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired
}; 