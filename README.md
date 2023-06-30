# 프로젝트명
> TODO APP

Next.js(13)/React(18)/React-Query(4)/Cypress(12) 학습을 위해 만든 TODO APP입니다.

# 테스팅 영상 (Cypress GUI)
![E2E Testing](https://github.com/ttap0704/next-react-state-management/assets/81610009/f1003207-e511-46d1-9c2a-945d27e63fc3)


# 주요 기능
* 로그인 및 회원가입
* TODO 추가/수정/삭제

# Stacks

### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)               

### Development
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)

# 주요 코드

### API 요청시 middleware에서 access_token 검증 과정 (src/app/middleware.ts)
<img width="845" alt="스크린샷 2023-06-30 오후 2 20 23" src="https://github.com/ttap0704/next-react-state-management/assets/81610009/0be8ec0f-2a07-49ce-b232-2c1f16e2b2b1">

### useQuery를 통한 Todo List캐싱 (src/queries/useTodosQuery.ts)
<img width="675" alt="스크린샷 2023-06-30 오후 2 31 20" src="https://github.com/ttap0704/next-react-state-management/assets/81610009/efdae68b-16de-4ee2-9ef7-f246a2e77ce9">

# 디렉토리 구조
```bash
├── README.md
├── package.json
├── .pnp.cjs
├── .pnp.loader.mjs
├── .cypress.config.ts
├── cypress : e2e/component testing
└── src
    ├── app : 애플리케이션의 모든 page routes
        ├── api
        ├── join
        ├── login
        └── todos
    ├── components : 각 기능별 component 정의
    ├── css : global, components css 정의
    ├── queries : react-query를 사용한 custom hook정의
    ├── utils : 공통적으로 사용되는 로직 작성
    ├── types : typescript type 정의
    └── middleware.ts : page 이동 및 API 요청 시의 검증 로직 작성
```

