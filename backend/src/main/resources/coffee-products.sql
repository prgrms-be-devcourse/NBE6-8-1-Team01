-- 커피 상품 데이터 INSERT (실제 테이블 구조에 맞게)
-- order_count는 판매량이므로 0으로 초기화

INSERT INTO product (product_name, price, description, order_count, product_image, stock, created_at) VALUES
('에티오피아 예가체프', 18000, '꽃향기와 과일향이 특징인 에티오피아 예가체프 G1 등급', 0, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80', 50, NOW()),
('콜롬비아 수프레모', 16000, '균형잡힌 바디감과 초콜릿 향미의 콜롬비아 최고 등급', 0, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80', 45, NOW()),
('케냐 AA', 22000, '와인같은 산미와 블랙커런트 향의 케냐 최고등급 AA', 0, 'https://images.unsplash.com/photo-1587049016823-69ef9d68bd44?w=800&q=80', 30, NOW()),
('과테말라 안티구아', 17000, '스모키한 향과 초콜릿 단맛이 조화로운 화산토양 원두', 0, 'https://images.unsplash.com/photo-1580933884097-a05d223c1c90?w=800&q=80', 40, NOW()),
('브라질 산토스', 15000, '견과류 향과 부드러운 바디감의 브라질 대표 원두', 0, 'https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?w=800&q=80', 60, NOW()),
('하우스 블렌드', 14000, '매일 마시기 좋은 균형잡힌 맛의 하우스 블렌드', 0, 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80', 100, NOW()),
('에스프레소 블렌드', 16000, '진한 크레마와 풍부한 바디감의 에스프레소 전용', 0, 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&q=80', 80, NOW()),
('디카페인 콜롬비아', 18000, '카페인 99.9% 제거, 맛은 그대로', 0, 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=800&q=80', 35, NOW()),
('자메이카 블루마운틴', 45000, '세계 3대 커피, 부드럽고 깔끔한 맛', 0, 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=800&q=80', 15, NOW()),
('코스타리카 따라주', 19000, '밝은 산미와 오렌지, 초콜릿 향의 고산지대 원두', 0, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80', 40, NOW());