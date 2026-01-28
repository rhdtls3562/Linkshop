import styles from './Input.module.css';
import eyeOff from '../assets/btn_visibility_off.svg';
import eyeOn from '../assets/btn_visibility_on.svg';

export function TextInput({
  id,
  label,
  type = 'text',
  className = '',
  ...props
}) {
  const classNames = `${styles.input} ${className}`;
  return (
    <>
      <div className={styles.wrapper}>
        <label htmlFor={id}>{label}</label>
        {/* type 속성에 따라 분기 처리 */}
        {type === 'password' ? (
          <div className={styles.passwordContainer}>
            <input id={id} type="password" className={classNames} {...props} />
            <button type="button" className={styles.btnEye}>
              <img src={eyeOff} alt="비밀번호 보기" />
            </button>
          </div>
        ) : (
          <input id={id} className={classNames} {...props} />
        )}
      </div>
    </>
  );
}
