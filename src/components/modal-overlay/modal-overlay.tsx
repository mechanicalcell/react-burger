import { SyntheticEvent } from 'react';
import styles from './modal-overlay.module.css';

export default function ModalOverlay({onClose}: {onClose: (e: SyntheticEvent) => void}) { 

return (
  <div onClick={onClose} className={`${styles.modal_overlay} pl-5 pr-5`}/>
)
}