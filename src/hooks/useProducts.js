import { useState, useCallback } from "react";

export function useProducts(initialProducts = []) {
  const [productDataList, setProductDataList] = useState([
    {
      id: crypto.randomUUID().slice(0, 4),
    },
  ]);

  // 상품 추가
  const addProduct = useCallback(() => {
    setProductDataList((prev) => {
      if (prev.length >= 3) {
        alert("최대 3개까지 등록 가능합니다.");
        return prev;
      }

      const newProduct = {
        id: crypto.randomUUID().slice(0, 4),
      };

      return [newProduct, ...prev];
    });
  }, []);

  // 상품 데이터 업데이트 함수(자식에서 받은 데이터로 특정 객체 업데이트)
  const updateProduct = useCallback((id, updatedData) => {
    setProductDataList((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product
      )
    );
  }, []);

  // 상품 삭제 함수
  const removeProduct = useCallback((id) => {
    setProductDataList((prev) => {
      if (prev.length === 1) {
        alert("최소 1개의 상품이 필요합니다.");
        return prev;
      }
      return prev.filter((product) => product.id !== id);
    });
  }, []);

  return {
    productDataList,
    setProductDataList,
    addProduct,
    updateProduct,
    removeProduct,
  };
}
