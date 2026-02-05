import styles from "./Loading.module.css";

function Loading({ fontColor = "" }) {
  return (
    <div className={styles.loadWrapp}>
      <div className={`${styles.load6} ${styles[fontColor]}`}>
        <div className={styles.letterHolder}>
          <span className={`${styles.letter} ${styles.l1}`}>L</span>
          <span className={`${styles.letter} ${styles.l2}`}>o</span>
          <span className={`${styles.letter} ${styles.l3}`}>a</span>
          <span className={`${styles.letter} ${styles.l4}`}>d</span>
          <span className={`${styles.letter} ${styles.l5}`}>i</span>
          <span className={`${styles.letter} ${styles.l6}`}>n</span>
          <span className={`${styles.letter} ${styles.l7}`}>g</span>
          <span className={`${styles.letter} ${styles.l8}`}>.</span>
          <span className={`${styles.letter} ${styles.l9}`}>.</span>
          <span className={`${styles.letter} ${styles.l10}`}>.</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
