import styles from './Button.module.css';
export function Button({ color = 'primary', children }) {
  return (
    <>
      <button className={`${styles.btn} ${styles[`btn--${color}`]}`}>
        {children}
      </button>
    </>
  );
}
