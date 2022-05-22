import  ReactDOM  from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import { FC, SyntheticEvent, useEffect } from 'react';
import { useCallback } from 'react';
import { TModalHeader } from "./modal-types";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const ModalHeader: FC<TModalHeader> = ({header, onClose}) => {
  return(
    <div className={`${styles.modal_header} text text_type_main-large mt-10 mr-10 ml-10`}>
      <div className={styles.modal_header_text}>
        {header}
      </div>
      <CloseIcon onClick={onClose} type="primary" />
    </div>
  )
} 

const Modal: FC<TModalHeader> = ({ children, header, onClose }) => {
  const ESC_KEYCODE = "Escape";

  const handleOverlay = (e: SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };  
  
  const handleCloseByEsc = useCallback((e: KeyboardEvent) => {
    e.key === ESC_KEYCODE && onClose();
      },[onClose]);
        
  useEffect(() => {
    document.addEventListener('keydown', handleCloseByEsc);
    return () => {
      document.removeEventListener('keydown', handleCloseByEsc);
    };
  }, [handleCloseByEsc]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={handleOverlay}/>
      <div className={styles.modal_box} >
        <ModalHeader header={header} onClose={onClose}></ModalHeader>
        {children}
      </div>  
    </>
    ,
    modalRoot
  );
} 

export default Modal;