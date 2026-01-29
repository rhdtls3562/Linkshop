import styles from "./Input.module.css";

export function TextInput({
  id,
  label,
  type = "text",
  className = "",
  ...props
}) {
  const classNames = `${styles.input} ${className}`;

  return (
    <>
      <div className={styles.wrapper}>
        <label htmlFor={id}>{label}</label>
        <input id={id} className={classNames} {...props} />
      </div>
    </>
  );
}
