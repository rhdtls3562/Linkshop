import { TextInput } from "./TextInput";
import { FileInput } from "./FileInput";
import { PasswordInput } from "./PasswordInput";
import styles from "./ProductUploader.module.css";

export function ShopManagement({ shopData, setFormData }) {
  // 하위 인풋 컴포넌트에서 전달받은 name, value로 폼 상태 업데이트
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <div className={styles.inputWrap}>
        <FileInput
          id="shopImg"
          label="쇼핑몰 대표 이미지"
          placeholder="쇼핑몰 이미지를 첨부해 주세요."
          onChange={handleChange}
        />
        <TextInput
          id="shopName"
          label="이름"
          placeholder="표시하고 싶은 이름을 적어주세요."
          onChange={handleChange}
        />
        <TextInput
          id="shopUrl"
          label="URL"
          placeholder="Url을 입력해 주세요."
          onChange={handleChange}
        />
        <TextInput
          id="userId"
          type="email"
          label="유저 ID"
          placeholder="유저 ID를 입력해 주세요."
          onChange={handleChange}
        />
        <PasswordInput
          id="userPw"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
          onChange={handleChange}
        />
      </div>
    </>
  );
}
