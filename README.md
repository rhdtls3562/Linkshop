<<<<<<< HEAD
# 🔗 링크샵 (LinkShop)

## 📌 프로젝트 소개

**링크샵(LinkShop)**은 사용자가 자신의 상품을 등록하고, 대표 상품 정보를 한눈에 확인할 수 있도록 돕는 웹 애플리케이션입니다.
여러 샵의 **목록 페이지**, **상세 페이지**, **링크 등록**, **필터 기능** 등을 구현하며 실제 서비스에 가까운 UI/UX 관리 경험을 쌓는 것을 목표로 합니다.

본 프로젝트는 특히 **E-commerce 서비스 구축에 관심 있는 훈련생 및 프론트엔드 개발자**에게 적합한 팀 프로젝트입니다.

---

## 🎯 프로젝트 목표

* React 기반의 상태 관리 흐름 이해 및 실습
* input 요소를 활용한 state 관리 경험
* 컴포넌트 분리 및 재사용성 향상
* 목록 / 상세 / 필터링 UI 구현 경험
* 팀 협업을 통한 Git & GitHub 워크플로우 학습

---

## 🛠️ 사용 기술 스택

* **Frontend**: React
* **Language**: JavaScript (ES6+)
* **Styling**: CSS Modules
* **State Management**: React useState, props
* **Version Control**: Git, GitHub

---

## ✨ 주요 기능

### 1️⃣ 샵 리스트 페이지

* 여러 샵의 대표 상품을 한눈에 확인 가능
* 카드 형태의 UI 구성
* 클릭 시 프로필 상세 페이지로 이동

### 2️⃣ 검색 페이지

* 상품 또는 샵 검색 기능 제공
* 검색어 입력에 따른 실시간 상태 관리
* 사용자 경험을 고려한 검색 UI 구성

### 3️⃣ 프로필 상세 페이지

* 선택한 샵 또는 판매자의 상세 정보 표시
* 대표 상품 및 링크 정보 확인
* 상세 콘텐츠 UI 관리 경험

### 4️⃣ 생성 / 수정 페이지

* 상품 및 샵 정보 생성 기능
* 기존 정보 수정 기능 제공
* input을 활용한 상태 관리 및 폼 처리

---

## 🧩 컴포넌트 구성 예시

* `ShopList`
* `ShopItem`
* `ShopDetail`
* `ProductForm`
* `Filter`

> 컴포넌트 단위로 역할을 분리하여 유지보수성과 가독성을 높입니다.

---

## 🤝 팀 협업 규칙

### 브랜치 전략

```text
main     : 배포 / 최종 제출용 브랜치
develop  : 개발 통합 브랜치
feature/*: 기능 단위 작업 브랜치
```

### 작업 규칙 (중요 ❗)

* ❗ **main 브랜치 직접 작업 금지**
* ❗ **feature → develop Pull Request만 허용**
* ❗ main 브랜치는 배포 / 제출 시에만 merge

### 작업 흐름

1. develop 브랜치 기준 feature 브랜치 생성
2. 기능 구현 후 PR 생성 (feature → develop)
3. 코드 리뷰 후 merge
4. 배포 시 develop → main

---

## 🚀 기대 효과

* React 상태 관리에 대한 실전 감각 향상
* E-commerce 서비스 UI 구조 이해
* 팀 프로젝트 협업 경험 축적
* 실무에 가까운 GitHub 협업 프로세스 학습

---

## 👥 팀원

* 팀원 권새롬
* 팀원 강인영
* 팀원 여수경
* 팀원 박수정

---

## 📎 참고 사항

* 본 프로젝트는 학습 목적의 팀 프로젝트입니다.
* 기능 및 UI는 팀 협의에 따라 확장될 수 있습니다.

---

> 💡 **LinkShop은 단순한 CRUD를 넘어, 실제 서비스 구조를 고민해볼 수 있는 프로젝트입니다.**
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> main
