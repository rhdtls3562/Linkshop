import styles from './Toast.module.css';
export function Toast({ isOpen, message }) {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className={styles.toast}>
        <p className={styles.message}>{message}</p>
      </div>
    </>
  );
}
