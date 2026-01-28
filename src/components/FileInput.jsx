import styles from './Input.module.css';

import black_jacket from '../assets/black_jacket.png';
import red_jacket from '../assets/red_jacket.png';
import brwon_jacket from '../assets/brown_jacket.png';

export function FileInput({ id, label, placeholder }) {
  const intialProducts = [
    { id: 1, img: black_jacket },
    { id: 2, img: red_jacket },
    { id: 3, img: brwon_jacket },
  ];
  return (
    <>
      <div className={styles.wrapper}>
        <label htmlFor={id}>{label}</label>
        <p className={styles.input}>{placeholder}</p>
        <label htmlFor={id} className={styles.uploadButton}>
          파일 첨부
        </label>
        {/* 디자인을 위해 실제 인풋은 숨김 처리 */}
        <input id={id} type="file" className={styles.fileInput} />
      </div>
      {/* 상품 이미지 미리보기 -> 컴포넌트로 나눠야함 */}
      {/* <ul className={styles.imgWrapper}>
        {intialProducts.map((prd) => {
          return (
            <li key={prd.id}>
              <img src={prd.img} alt="" />
            </li>
          );
        })}
      </ul> */}
    </>
  );
}
