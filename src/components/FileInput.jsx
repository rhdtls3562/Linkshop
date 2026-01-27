import styles from './Input.module.css';
export function FileInput({ id, label, placeholder }) {
  return (
    <>
      <div className={styles.wrapper}>
        <label htmlFor={id}>{label}</label>
        <p className={styles.input}>{placeholder}</p>
        <label htmlFor={id} className={styles.uploadButton}>
          파일 선택하기
        </label>
        {/* 디자인을 위해 실제 인풋은 숨김 처리 */}
        <input id={id} type="file" className={styles.fileInput} />
      </div>
    </>
  );
}
