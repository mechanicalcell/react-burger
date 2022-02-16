import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay({onClose}) { 

return (
  <div onClick={onClose} className={`${styles.modal_overlay} pl-5 pr-5`}/>
)
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func
}; 