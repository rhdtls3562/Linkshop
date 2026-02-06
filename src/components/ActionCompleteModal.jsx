import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from "./ActionCompleteModal.module.css";
import Loading from "./Loading";

export function ActionCompleteModal({
  isOpen,
  onClose,
  message,
  isCreateCompleted,
}) {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handleChange = () => {
    onClose();
    navigate("/");
  };

  return createPortal(
    <>
      <div className={styles.overlay}>
        {isCreateCompleted ? (
          <div className={styles.modal}>
            <p className={styles.message}>{message}</p>
            <button className={styles.btn} onClick={handleChange}>
              확인
            </button>
          </div>
        ) : (
          <Loading fontColor="white" />
        )}
      </div>
    </>,
    document.getElementById("modal-root")
  );
}
