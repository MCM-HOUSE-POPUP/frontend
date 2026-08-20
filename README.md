# MCM HOUSE POPUP (WEB) - FE
<p align="center">
  <a href="https://mcm-house-popup.vercel.app/">
    <img src="https://img.shields.io/badge/Live_Demo-mcm--house--popup.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>
<img width="1920" height="1080" alt="1" src="https://github.com/user-attachments/assets/0e6694c2-b724-4d25-bd35-c8eaeb6dcad9" />

---

## 🔄 01. User Flow

MCM의 네 가지 HOUSE 유형을 기반으로 개인의 취향을 발견하고, 오프라인 공간 탐험까지 연결하는 모바일 웹 서비스입니다.

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'fontFamily': '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", Pretendard, sans-serif',
    'fontSize': '14px',
    'lineColor': '#111111',
    'curve': 'linear'
  }
}}%%
flowchart LR
    %% Phase 1: ONLINE DISCOVERY
    subgraph P1 ["<b>PHASE 01 · ONLINE DISCOVERY</b>"]
        direction LR
        A(["<b>HOUSE TEST</b><br/>취향 문항 응답"]) --> B{"<b>AI 분석</b><br/>선호도 가중치 판별"}
        B --> C["<b>FIRST HOUSE 제안</b><br/>YOUR ROUTE 순서 생성"]
    end

    %% Phase 2: SPACE & AI EXPERIENCE
    subgraph P2 ["<b>PHASE 02 · SPACE & AI EXPERIENCE</b>"]
        direction LR
        D["<b>1F · 2F EXPLORE MAP</b><br/>추천 동선 기반 탐험"] --> E{"<b>미션 촬영</b><br/>제품 실착 & 웹 카메라"}
        E --> F["<b>AI STYLE DISCOVERY</b><br/>스타일 무드 키워드 도출"]
    end

    %% Phase 3: ARCHIVE & CRM COMMERCE
    subgraph P3 ["<b>PHASE 03 · ARCHIVE & CRM COMMERCE</b>"]
        direction LR
        G["<b>MY PASSPORT</b><br/>스탬프 & 타임라인 기록"] --> H["<b>제품 상세</b><br/>COMPLETE THE LOOK"]
        H --> I1(["<b>셀러 1:1 상담 접수</b>"])
        H --> I2(["<b>공식 스토어 이동</b>"])
    end

    %% Clean Linear Streamline
    C --> D
    F --> G

    %% Clear Node Style Hierarchy
    classDef default fill:#EEEEEC,stroke:#444442,stroke-width:1px,color:#111111,rx:8px,ry:8px;
    classDef highlight fill:#111111,stroke:#111111,color:#FFFFFF,rx:8px,ry:8px;
    classDef branch fill:#FFFFFF,stroke:#111111,stroke-width:1.5px,color:#111111;
    classDef action fill:#111111,stroke:#111111,color:#FFFFFF,rx:20px,ry:20px;
    classDef startPill fill:#EEEEEC,stroke:#444442,stroke-width:1px,color:#111111,rx:20px,ry:20px;

    class A startPill;
    class C,F highlight;
    class B,E branch;
    class I1,I2 action;

    style P1 fill:#FAFAFA,stroke:#EEEEEC,stroke-width:1.5px,rx:12px,ry:12px;
    style P2 fill:#FAFAFA,stroke:#EEEEEC,stroke-width:1.5px,rx:12px,ry:12px;
    style P3 fill:#FAFAFA,stroke:#EEEEEC,stroke-width:1.5px,rx:14px,ry:14px;
```

---

## ⚡ 02. Engineering Focus

#### 1. 비동기 AI 응답 처리 및 로딩 상태 제어
> AI 분석 대기 시간 동안의 사용자 이탈 방지 및 요청 타임아웃 처리

* `fetch`에 `AbortController`를 연결해 30초 초과 시 요청을 자동 중단하고 에러 메시지 노출
* API 응답이 완료되더라도 3단계 안내 애니메이션이 모두 끝난 시점에만 결과 화면으로 이동하도록 전환 타이밍 동기화

#### 2. 클라이언트 사이드 이미지 최적화 및 뷰파인더
> 모바일 웹 내 직접 촬영 지원 및 업로드 데이터 용량 경감

* `MediaDevices.getUserMedia` API를 활용해 별도 앱 이동 없는 웹 브라우저 인앱 뷰파인더 구현
* Canvas API로 촬영된 사진을 최대 너비 `1080px` WebP 포맷으로 변환하여 업로드 용량 최적화 (`4.2MB` → `900KB`)

#### 3. 세션 복구 및 비정상 접근 방어
> 새로고침 시 진행 데이터 유지 및 잘못된 API 호출 차단

* `useParams`에 값이 없으면 `localStorage`에서 `resultId`를 조회해 새로고침 시에도 이전 결과 데이터 복구
* `resultId`가 유효한 양의 정수일 때만 TanStack Query(`enabled`)가 실행되도록 제한하고, 사진 데이터 누락 시 진입 차단

---

## 🛠️ 03. Tech Stack

| 구분 | 기술 |
| :--- | :--- |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| **Frontend** | ![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) |
| **Data Fetching** | ![TanStack Query](https://img.shields.io/badge/TanStack_Query_v5-FF4154?style=flat-square&logo=reactquery&logoColor=white) |
| **Routing** | ![React Router](https://img.shields.io/badge/React_Router_v6-CA4245?style=flat-square&logo=reactrouter&logoColor=white) |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |

---

## 💻 04. Run & Build

1. 저장소 클론 및 패키지 설치

```bash
git clone https://github.com/MCM-HOUSE-POPUP/frontend
cd frontend
npm install
```

2. 환경 변수 설정 (`.env`)

```bash
cp .env.example .env
# .env 파일 내 VITE_API_URL을 로컬 백엔드 주소(http://localhost:8080) 또는 배포된 API 주소로 설정
```

3. 개발 서버 실행

```bash
npm run dev
```

---

## 🔗 05. Backend Repository
[![GitHub Repository](https://img.shields.io/badge/Github-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/MCM-HOUSE-POPUP/backend)
