import styles from "./ErrorMessage.module.css";
export function ErrorMessage({ message }) {
  return (
    <>
      <span className={styles.errorMessage}>{message}</span>
    </>
  );
}
