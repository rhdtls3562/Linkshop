import { TextInput } from "./TextInput";
import styles from "./ProductUploader.module.css";
import { FileInput } from "./FileInput";
import { PasswordInput } from "./PasswordInput";

export function ShopManagement() {
  return (
    <>
      <form className={styles.form}>
        <FileInput
          id="productImg"
          label="상품 대표 이미지"
          placeholder="상품 이미지를 첨부해 주세요."
        />
        <TextInput
          id="shopName"
          type="text"
          label="이름"
          placeholder="표시하고 싶은 이름을 적어주세요."
        />
        <TextInput
          id="shopUrl"
          type="text"
          label="URL"
          placeholder="Url을 입력해 주세요."
        />
        <TextInput
          id="userId"
          type="emal"
          label="유저 ID"
          placeholder="유저 ID를 입력해 주세요."
        />
        <PasswordInput
          id="userPw"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
        />
      </form>
    </>
  );
}
