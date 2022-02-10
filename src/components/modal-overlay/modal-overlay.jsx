import styles from './modal-overlay.module.css';
import { useEffect } from 'react';
import { useCallback } from 'react';

export default function ModalOverlay({children, onClose}) { 
    var ESC_KEYCODE = 27;
    const handleCloseByEsc = useCallback( (e) => {
		e.key === ESC_KEYCODE && onClose();
      },[onClose]);
      
    useEffect(() => {
		document.addEventListener('keydown', handleCloseByEsc);
		return () => {
			document.removeEventListener('keydown', handleCloseByEsc);
		};
	}, [handleCloseByEsc]);

    return (
      <div onClick={onClose} className={`${styles.modal_overlay} pl-5 pr-5`} onClose={onClose}>
        {children}
      </div>);
}
