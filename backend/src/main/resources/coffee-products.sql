-- 커피 상품 데이터 10개 INSERT
-- 실제 커피 이미지 URL 포함

INSERT INTO product (product_name, category, price, description, product_image, stock, created_at, modified_at) VALUES
('에티오피아 예가체프', 'SINGLE_ORIGIN', 18000, '꽃향기와 과일향이 특징인 에티오피아 예가체프 G1 등급 원두입니다. 밝고 산뜻한 산미가 매력적입니다.', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80', 50, NOW(), NOW()),

('콜롬비아 수프레모', 'SINGLE_ORIGIN', 16000, '균형잡힌 바디감과 초콜릿 향미가 특징인 콜롬비아 최고 등급 원두입니다.', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80', 45, NOW(), NOW()),

('케냐 AA', 'SINGLE_ORIGIN', 22000, '와인같은 산미와 블랙커런트 향이 특징인 케냐 최고등급 AA 원두입니다.', 'https://images.unsplash.com/photo-1587049016823-69ef9d68bd44?w=800&q=80', 30, NOW(), NOW()),

('과테말라 안티구아', 'SINGLE_ORIGIN', 17000, '스모키한 향과 초콜릿 단맛이 조화로운 화산토양에서 자란 원두입니다.', 'https://images.unsplash.com/photo-1580933884097-a05d223c1c90?w=800&q=80', 40, NOW(), NOW()),

('브라질 산토스', 'SINGLE_ORIGIN', 15000, '견과류 향과 부드러운 바디감이 특징인 브라질 대표 원두입니다.', 'https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?w=800&q=80', 60, NOW(), NOW()),

('하우스 블렌드', 'BLEND', 14000, '매일 마시기 좋은 균형잡힌 맛의 하우스 블렌드입니다. 초콜릿과 캐러멜 향이 조화롭습니다.', 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80', 100, NOW(), NOW()),

('에스프레소 블렌드', 'BLEND', 16000, '진한 크레마와 풍부한 바디감을 위해 특별히 배합한 에스프레소 전용 블렌드입니다.', 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&q=80', 80, NOW(), NOW()),

('디카페인 콜롬비아', 'DECAF', 18000, '카페인을 99.9% 제거한 콜롬비아 원두로, 맛은 그대로 즐기실 수 있습니다.', 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=800&q=80', 35, NOW(), NOW()),

('자메이카 블루마운틴', 'SINGLE_ORIGIN', 45000, '세계 3대 커피 중 하나인 자메이카 블루마운틴. 부드럽고 깔끔한 맛이 특징입니다.', 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=800&q=80', 15, NOW(), NOW()),

('코스타리카 따라주', 'SINGLE_ORIGIN', 19000, '밝은 산미와 오렌지, 초콜릿 향이 조화로운 코스타리카 고산지대 원두입니다.', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80', 40, NOW(), NOW());