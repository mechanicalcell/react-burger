import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay({children, onClose}) { 

return (
  <div onClick={onClose} className={`${styles.modal_overlay} pl-5 pr-5`} >
    {children}
  </div>);
}

ModalOverlay.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onClose: PropTypes.func.isRequired
};