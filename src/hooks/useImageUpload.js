import { useState, useCallback } from "react";

const BASE_URL = "https://linkshop-api.vercel.app";

export function useImageUpload() {
  const uploadImage = useCallback(async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(`${BASE_URL}/images/upload`, {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = JSON.parse(responseText);

      if (!data.url) {
        throw new Error("이미지 URL이 없습니다.");
      }

      return data.url; // 이미지 URL 반환
    } catch (error) {
      console.error("uploadImage 에러:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
      return null;
    }
  }, []);

  return {
    uploadImage,
  };
}
