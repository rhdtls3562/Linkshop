import { TextInput } from "./TextInput";
import { FileInput } from "./FileInput";
import { PasswordInput } from "./PasswordInput";
import styles from "./ProductUploader.module.css";

export function ShopManagement({ onUpdate, shopData }) {
  // 자식에서 폼 데이터 변경 시 부모에게 전달
  const handleChange = (name, value) => {
    onUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className={styles.inputWrap}>
        <FileInput
          id="shopImg"
          name="shopImg"
          label="쇼핑몰 대표 이미지"
          placeholder="쇼핑몰 이미지를 첨부해 주세요."
          onChange={handleChange}
          value={shopData.shopImg || ""}
          initialPreview={shopData?.shop?.imageUrl || ""}
        />
        <TextInput
          id="shopName"
          name="shopName"
          label="이름"
          placeholder="표시하고 싶은 이름을 적어주세요."
          onChange={handleChange}
          value={shopData.shopName || ""}
          dataList={shopData?.name}
        />
        <TextInput
          id="shopUrl"
          name="shopUrl"
          label="URL"
          placeholder="Url을 입력해 주세요."
          onChange={handleChange}
          value={shopData.shopUrl || ""}
          dataList={shopData?.shop?.shopUrl}
        />
        <TextInput
          id="userId"
          name="userId"
          type="text"
          label="유저 ID"
          placeholder="유저 ID를 입력해 주세요."
          onChange={handleChange}
          value={shopData.userId || ""}
          dataList={shopData?.userId}
        />
        <PasswordInput
          id="userPw"
          name="userPw"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
          onChange={handleChange}
          value={shopData.userPw || ""}
        />
      </div>
    </>
  );
}
