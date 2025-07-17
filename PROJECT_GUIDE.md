# Team Coffee 프로젝트 가이드

## 📋 프로젝트 개요
**Team Coffee**는 커피 전문 이커머스 플랫폼입니다. Spring Boot 백엔드와 Next.js 프론트엔드로 구성되어 있으며, 지중해 스타일의 모던한 UI/UX를 제공합니다.

## 🚀 프론트엔드 구조 및 사용법

### 1. 기술 스택
- **Next.js 15.3.5** (App Router 사용)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** (애니메이션)
- **GSAP** (스크롤 애니메이션)

### 2. 폴더 구조
```
frontend/
├── app/                    # Next.js App Router 페이지들
│   ├── page.tsx           # 메인 페이지
│   ├── products/          # 상품 목록 & 상세
│   ├── login/             # 로그인
│   ├── signup/            # 회원가입
│   ├── wishlist/          # 위시리스트
│   └── orders/            # 주문 내역
├── components/            # 재사용 컴포넌트
│   ├── Navigation.tsx     # 네비게이션 바
│   └── ui/               # shadcn/ui 컴포넌트
├── contexts/             # React Context
│   ├── AuthContext.tsx   # 인증 상태 관리
│   └── WishlistContext.tsx # 위시리스트 관리
└── lib/
    ├── api/              # API 통신 함수들
    │   ├── auth.ts       # 인증 API
    │   ├── products.ts   # 상품 API
    │   ├── orders.ts     # 주문 API
    │   └── wishlists.ts  # 위시리스트 API
    └── types/            # TypeScript 타입 정의
```

### 3. 주요 페이지 설명

#### 🏠 메인 페이지 (`/`)
- 3D 카드 효과로 인기 상품 4개 표시
- 지중해 그라데이션 배경
- 회원가입 & 상품 둘러보기 버튼

#### ☕ 상품 목록 (`/products`)
- 전체 상품 그리드/리스트 뷰
- 가격 필터링 (슬라이더)
- 정렬 기능 (인기순, 가격순, 최신순)
- 호버 시 상세보기 & 위시리스트 추가 버튼

#### 📦 상품 상세 (`/products/[id]`)
- 상품 이미지 & 설명
- 수량 선택
- 위시리스트 추가 (로그인 필요)
- 배송 정보 & 보관 방법 안내

#### 💝 위시리스트 (`/wishlist`)
- 찜한 상품 목록
- 수량 조정 (+/- 버튼)
- 총 금액 계산
- 전체 주문하기 버튼

#### 🔐 로그인/회원가입 (`/login`, `/signup`)
- 이메일 & 비밀번호 인증
- 아이콘 입력 필드
- 토스트 알림
- 회원가입 시 필수 약관 동의

#### 📋 주문 내역 (`/orders`)
- 주문 상태별 색상 표시
- 확장 가능한 주문 상세
- 배송 정보 표시

### 4. 프론트엔드 실행 방법
```bash
cd frontend
npm install
npm run dev
```
http://localhost:3000 에서 확인

## 🗄️ Supabase 연동 방법

### 1. Supabase 프로젝트 생성
1. [supabase.com](https://supabase.com) 접속
2. "Start your project" 클릭
3. GitHub으로 로그인
4. "New Project" 클릭
5. 프로젝트 이름 & 비밀번호 설정

### 2. 테이블 생성
Supabase SQL Editor에서 다음 테이블들을 생성:

```sql
-- Users 테이블
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address TEXT,
  role VARCHAR(50) DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products 테이블
CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  order_count INTEGER DEFAULT 0,
  product_image VARCHAR(500),
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders 테이블
CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING',
  delivery_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order_Items 테이블
CREATE TABLE order_items (
  order_item_id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(order_id),
  product_id INTEGER REFERENCES products(product_id),
  product_name VARCHAR(255),
  product_image VARCHAR(500),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Wishlists 테이블
CREATE TABLE wishlists (
  wish_id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  product_id INTEGER REFERENCES products(product_id),
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. 샘플 데이터 삽입
```sql
-- 샘플 상품 데이터
INSERT INTO products (product_name, price, description, stock, product_image) VALUES
('에티오피아 예가체프', 25000, '화사한 꽃향과 과일향이 특징인 프리미엄 원두', 50, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80'),
('콜롬비아 수프레모', 22000, '균형잡힌 바디감과 초콜릿 향미', 30, 'https://images.unsplash.com/photo-1607681034540-2c46cc71896d?w=800&q=80'),
('케냐 AA', 28000, '와인같은 산미와 블랙커런트 향', 20, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80'),
('브라질 산토스', 18000, '부드럽고 고소한 너트 향미', 100, 'https://images.unsplash.com/photo-1587049352846-4a222e784390?w=800&q=80');
```

### 4. Spring Boot 백엔드 연동
`application.yml`에 Supabase 연결 정보 추가:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://[YOUR-PROJECT-REF].supabase.co:5432/postgres
    username: postgres
    password: [YOUR-DATABASE-PASSWORD]
    driver-class-name: org.postgresql.Driver

  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
```

### 5. 환경 변수 설정
`.env.local` 파일 생성:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 📱 사용자 플로우

### 1. 회원가입 → 로그인
1. `/signup` 페이지에서 회원가입
2. 이메일, 비밀번호, 이름, 주소 입력
3. 약관 동의 후 가입
4. `/login` 페이지에서 로그인

### 2. 상품 구매 플로우
1. `/products`에서 상품 목록 확인
2. 상품 클릭 → 상세 페이지
3. 위시리스트 추가 (하트 버튼)
4. `/wishlist`에서 수량 조정
5. 전체 주문하기 클릭

### 3. 주문 확인
1. 로그인 상태에서 네비게이션 → 계정 → 주문 내역
2. `/orders`에서 주문 상태 확인
3. 주문 클릭하면 상세 정보 확장

## 🎨 디자인 특징

### 지중해 스타일 컬러 팔레트
- **Mediterranean Blue**: #0EA5E9 (주요 액션)
- **Mediterranean Sky**: #E0F2FE (배경)
- **Mediterranean Sand**: #FEF3C7 (포인트)
- **Mediterranean Terracotta**: #DC2626 (강조)

### 폰트
- **Playfair Display**: 헤딩
- **Montserrat**: 가격, 숫자
- **Noto Sans KR**: 한글 본문

### 애니메이션
- Framer Motion: 페이지 전환, 호버 효과
- GSAP ScrollTrigger: 스크롤 애니메이션
- 3D 카드 효과 (Aceternity UI)

## 🔧 개발 팁

### 1. 백엔드 실행
```bash
cd backend
./gradlew bootRun
```

### 2. 프론트엔드 빌드
```bash
cd frontend
npm run build
npm start
```

### 3. 동시 실행 (개발용)
두 개의 터미널에서:
- 터미널 1: `cd backend && ./gradlew bootRun`
- 터미널 2: `cd frontend && npm run dev`

## 📝 발표 포인트
1. **풀스택 구조**: Spring Boot + Next.js 조합
2. **모던 UI/UX**: 지중해 스타일, 3D 효과
3. **실시간 상태 관리**: Context API 활용
4. **보안**: JWT 토큰 기반 인증
5. **반응형 디자인**: 모바일/데스크톱 최적화

이제 이 가이드를 보면서 프로젝트를 설명하고 시연할 수 있습니다!