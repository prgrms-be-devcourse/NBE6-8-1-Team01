# 브라우저에서 확인할 내용

1. Console에서 다음 명령어 실행:
```javascript
// 위시리스트 데이터 확인
console.table(JSON.parse(localStorage.getItem('debug_wishlist') || '[]'))
```

2. 주문 페이지에서 Console에 있는 "검증된 주문 데이터" 옆의 화살표를 클릭하여 펼쳐보기

3. 특히 다음 필드들 확인:
- 주문의 items 배열이 비어있는지
- 위시리스트의 각 항목이 같은 productId를 가지고 있는지
