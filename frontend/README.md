# GRIDS & CIRCLES - Frontend 기술 문서

> 프리미엄 커피 이커머스 플랫폼 프론트엔드 상세 기술 문서

## 🛠 기술 스택 상세

### Core Technologies
- **Next.js 15.3.5**
  - App Router 사용
  - Server Components 지원
  - 자동 코드 스플리팅
  - Image 최적화
  
- **TypeScript 5.7.3**
  - 전체 타입 커버리지
  - 엄격한 타입 체크 (`strict: true`)
  - 백엔드 DTO 타입 정의

- **React 19.0.0**
  - 최신 React 기능 활용
  - Concurrent Features
  - Suspense Boundaries

### Styling & UI Libraries
- **Tailwind CSS 3.4.1**
  - 커스텀 지중해 컬러 팔레트
  - 반응형 유틸리티 클래스
  - JIT 컴파일러

- **Shadcn/ui**
  - Button, Card, Dialog 등 기본 컴포넌트
  - Radix UI 기반
  - 완전한 커스터마이징

- **Framer Motion 11.15.0**
  - 페이지 전환 애니메이션
  - 컴포넌트 인터랙션
  - AnimatePresence

- **GSAP 3.12.2 + ScrollTrigger**
  - 스크롤 기반 애니메이션
  - 고성능 타임라인 애니메이션

### API & State Management
- **Axios 1.7.9**
  - API 인터셉터
  - 에러 핸들링
  - Basic Auth 지원

- **React Context API**
  - AuthContext
  - WishlistContext
  - 전역 상태 관리

- **js-cookie 3.0.5**
  - JWT 토큰 관리
  - 보안 쿠키 설정

## 📁 프로젝트 구조 상세

```
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # 로그인 페이지
│   │   └── signup/page.tsx         # 회원가입 페이지
│   ├── account/page.tsx            # 계정 정보 페이지
│   ├── admin/
│   │   ├── orders/page.tsx         # 관리자 주문 관리
│   │   └── products/page.tsx       # 관리자 상품 관리
│   ├── orders/page.tsx             # 주문 내역 페이지
│   ├── products/
│   │   ├── page.tsx                # 상품 목록 페이지
│   │   └── [id]/page.tsx           # 상품 상세 페이지
│   ├── wishlist/page.tsx           # 장바구니 페이지
│   ├── layout.tsx                  # 루트 레이아웃
│   ├── page.tsx                    # 메인 홈페이지
│   └── globals.css                 # 전역 스타일
│
├── components/
│   ├── Navigation.tsx              # 동적 네비게이션 바
│   ├── VideoBackground.tsx         # 비디오 배경 컴포넌트
│   └── ui/                         # Shadcn UI 컴포넌트
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── toast.tsx
│       └── 3d-card.tsx             # Aceternity 3D 카드
│
├── contexts/
│   ├── AuthContext.tsx             # 인증 상태 관리
│   └── WishlistContext.tsx         # 장바구니 상태 관리
│
├── lib/
│   ├── api/
│   │   ├── auth.ts                 # 인증 API
│   │   ├── client.ts               # Axios 클라이언트
│   │   ├── orders.ts               # 주문 API
│   │   ├── products.ts             # 상품 API
│   │   └── wishlist.ts             # 위시리스트 API
│   ├── types.ts                    # TypeScript 타입 정의
│   └── utils.ts                    # 유틸리티 함수
│
├── hooks/
│   ├── use-toast.tsx               # 토스트 훅
│   └── use-mobile.tsx              # 모바일 감지 훅
│
└── public/
    ├── videos/                     # 4개 비디오 파일
    └── images/                     # 6개 이미지 파일
```

## 🔌 페이지별 API 연동 상세

### 1. 메인 페이지 (`/`)
**API 엔드포인트**: `GET /products`
- **목적**: 베스트셀러 상품 4개 표시
- **백엔드 테이블**: `product`
- **사용 필드**:
  - `product_id` → `productId`
  - `product_name` → `productName`
  - `price` → `price`
  - `description` → `description`
  - `product_image` → `productImage`
  - `stock` → `stock`

### 2. 로그인 페이지 (`/login`)
**API 엔드포인트**: `POST /auth/login`
- **요청 바디**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **백엔드 테이블**: `users`
- **응답 데이터**:
  ```json
  {
    "userId": "number",
    "email": "string",
    "name": "string",
    "role": "USER | ADMIN",
    "address": "string",
    "token": "JWT 토큰"
  }
  ```

### 3. 회원가입 페이지 (`/signup`)
**API 엔드포인트**: `POST /users`
- **요청 바디**:
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string",
    "address": "string"
  }
  ```
- **백엔드 테이블**: `users`
- **필드 매핑**:
  - `email` → `email` (UNIQUE)
  - `password` → `password` (BCrypt 암호화)
  - `username` → `name`
  - `address` → `address`
  - `role` → `role` (기본값: 'USER')

### 4. 상품 목록 페이지 (`/products`)
**API 엔드포인트**: `GET /products`
- **백엔드 테이블**: `product`
- **전체 필드 사용**:
  ```typescript
  interface Product {
    productId: number      // product_id
    productName: string    // product_name
    price: number         // price
    description: string   // description
    productImage: string  // product_image (TEXT)
    stock: number        // stock
    orderCount: number   // order_count
    createdAt: string    // created_at
  }
  ```

### 5. 상품 상세 페이지 (`/products/[id]`)
**API 엔드포인트**: `GET /products/{id}`
- **백엔드 테이블**: `product`
- **추가 기능**: 장바구니 추가
  - `POST /api/v1/wishlists`
  - 요청: `{ productId, quantity }`

### 6. 장바구니 페이지 (`/wishlist`)
**API 엔드포인트들**:
1. **조회**: `GET /api/v1/wishlists`
   - **백엔드 테이블**: `wish_list` JOIN `product`
   - **응답 구조**:
     ```typescript
     interface WishlistItem {
       wishId: number         // wish_id
       productId: number      // product_id
       productName: string    // product.product_name
       productPrice: number   // product.price
       productImage: string   // product.product_image
       quantity: number       // quantity
     }
     ```

2. **수량 수정**: `PUT /api/v1/wishlists/{wishId}`
   - **요청**: `{ quantity: number }`

3. **삭제**: `DELETE /api/v1/wishlists/{wishId}`

4. **주문 생성**: `POST /api/v1/orders`
   - **요청 구조**:
     ```json
     {
       "userEmail": "string",
       "address": "string",
       "products": [
         {
           "productId": "string",
           "productCount": number
         }
       ]
     }
     ```

### 7. 주문 내역 페이지 (`/orders`)
**API 엔드포인트**: `GET /api/v1/orders/{email}`
- **백엔드 테이블**: `orders` JOIN `order_items` JOIN `product`
- **응답 구조**:
  ```typescript
  interface Order {
    orderId: number           // order_id
    userEmail: string         // user_email
    address: string          // address
    totalAmount: number      // total_amount
    status: string           // order_status
    createdAt: string        // created_at
    items: OrderItem[]       // order_items 테이블
  }
  
  interface OrderItem {
    orderItemId: number      // order_item_id
    productId: number        // product_id
    productName: string      // product.product_name
    productImage: string     // product.product_image
    quantity: number         // quantity
    price: number           // price
  }
  ```

### 8. 관리자 주문 관리 (`/admin/orders`)
**API 엔드포인트들**:
1. **전체 주문 조회**: `GET /api/v1/orders/{adminEmail}`
   - 현재는 관리자 이메일로 조회 (전체 조회 API 필요)

2. **주문 상태 변경**: `PUT /api/v1/orders/{orderId}/status`
   - **요청**: `{ status: "PENDING | PROCESSING | COMPLETED | CANCELLED" }`

### 9. 관리자 상품 관리 (`/admin/products`)
**API 엔드포인트들**:
1. **상품 생성**: `POST /products`
2. **상품 수정**: `PUT /products/{id}`
3. **상품 삭제**: `DELETE /products/{id}`

### 10. 계정 정보 페이지 (`/account`)
**API 엔드포인트**: `PUT /users/{userId}`
- **백엔드 테이블**: `users`
- **수정 가능 필드**:
  - `name` → `username`
  - `address` → `address`

## 🗄️ 백엔드 데이터베이스 스키마

### 1. users 테이블
```sql
CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    address TEXT,
    role VARCHAR(50) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. product 테이블
```sql
CREATE TABLE product (
    product_id BIGSERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    description TEXT,
    order_count INTEGER DEFAULT 0,
    product_image TEXT,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. wish_list 테이블
```sql
CREATE TABLE wish_list (
    wish_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    product_id BIGINT REFERENCES product(product_id),
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(email, product_id)
);
```

### 4. orders 테이블
```sql
CREATE TABLE orders (
    order_id BIGSERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    total_amount INTEGER NOT NULL,
    order_status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. order_items 테이블
```sql
CREATE TABLE order_items (
    order_item_id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(order_id),
    product_id BIGINT REFERENCES product(product_id),
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL
);
```

## 🔐 인증 및 보안

### JWT 토큰 관리
- **저장 위치**: HttpOnly Cookie
- **토큰 이름**: `authToken`
- **만료 시간**: 7일
- **갱신 방식**: 자동 갱신 없음 (재로그인 필요)

### API 인증
- **ngrok 연동**: Basic Auth 사용
  - Username: `admin@email.com`
  - Password: `admin`
- **일반 API**: JWT Bearer 토큰

### CORS 설정
- **허용 Origin**: Vercel 도메인
- **허용 메서드**: GET, POST, PUT, DELETE
- **허용 헤더**: Content-Type, Authorization

## 📊 API 응답 형식

### 성공 응답
```json
{
  "resultCode": "200-OK" | "201-CREATED" | "SUCCESS",
  "msg": "성공 메시지",
  "data": {} | []
}
```

### 에러 응답
```json
{
  "resultCode": "400-BAD_REQUEST" | "401-UNAUTHORIZED" | "500-ERROR",
  "msg": "에러 메시지",
  "data": null
}
```

## 🚀 배포 정보

### Frontend (Vercel)
- **URL**: https://nbe-6-8-1-team01.vercel.app
- **환경 변수**:
  - `NEXT_PUBLIC_API_URL`: ngrok URL

### Backend (ngrok)
- **URL**: https://0950443fbdc5.ngrok-free.app
- **로컬 포트**: 8080
- **데이터베이스**: Supabase PostgreSQL

## 🏃‍♂️ 로컬 개발 환경 실행 방법

### 1. 백엔드 서버 실행
```bash
# 백엔드 디렉토리로 이동
cd backend

# Gradle 빌드 (처음 한 번만)
./gradlew build

# 서버 실행
./gradlew bootRun
```

서버가 성공적으로 시작되면:
- 로컬: http://localhost:8080
- 터미널에 "Started TeamcoffeeApplication" 메시지 확인

### 2. ngrok 터널 실행 (선택사항)
```bash
# 새 터미널 창에서
ngrok http 8080 --auth-token YOUR_AUTH_TOKEN

# 또는 설정된 도메인 사용
ngrok http --domain=0950443fbdc5.ngrok-free.app 8080
```

### 3. 프론트엔드 개발 서버 실행
```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치 (처음 한 번만)
npm install

# 개발 서버 실행
npm run dev
```

개발 서버 접속:
- http://localhost:3000

### 4. 테스트 계정
- **일반 사용자**: user@email.com / password
- **관리자**: admin@email.com / admin

### 5. 환경 변수 설정
`.env.local` 파일 생성:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
# 또는 ngrok 사용 시
NEXT_PUBLIC_API_URL=https://0950443fbdc5.ngrok-free.app
```

### 6. 데이터베이스 초기 데이터
```bash
# PostgreSQL에 커피 상품 데이터 추가
# backend/src/main/resources/coffee-products.sql 파일 실행
```

### 문제 해결
- **CORS 에러**: 백엔드 SecurityConfig에서 허용 도메인 확인
- **500 에러**: Supabase 연결 문자열에 `?prepareThreshold=0` 추가
- **인증 실패**: JWT 토큰 쿠키 확인

---