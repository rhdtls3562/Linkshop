import { createPortal } from "react-dom";
import styles from "./ActionCompleteModal.module.css";
export function ActionCompleteModal({ isOpen, onClose, message }) {
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <p className={styles.message}>{message}</p>
          <button className={styles.btn} onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
}
