import  ReactDOM  from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './modal.css'

const modalRoot = document.getElementById("react-modals");

function ModalHeader({header, onClose}) {
  return(
    <p className='modal__header mr-10 ml-10'>
      {header}
      <CloseIcon onClick={onClose} type="primary" />
    </p>
  )
} 

export default function Modal({ children, header, onClose }) {
  
    return ReactDOM.createPortal(
      <>
        <div onClick={onClose} className="ModalOverlay pl-5 pr-5">
          <ModalHeader header={header} onClose={onClose}></ModalHeader>
          {children}
        </div>
      </>,
      modalRoot
    );
} 
