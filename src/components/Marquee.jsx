import styles from "./Marquee.module.css";

export default function Marquee() {
  const text = "VISIONISTDESIGN ";

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        <div className={styles.content}>{text.repeat(16)}</div>
        <div className={styles.content}>{text.repeat(16)}</div>
      </div>
    </div>
  );
}
