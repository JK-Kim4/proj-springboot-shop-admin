CREATE TABLE `MAGAZINE` (
	`MAGAZINE_SEQ`				INT	NOT NULL auto_increment PRIMARY KEY COMMENT '고유 번호',
	`QUARTERLY_CATEGORY_SEQ`	INT	NOT NULL  DEFAULT 1 COMMENT '상품 카테고리 고유 번호',
	`MAGAZINE_TITLE`			VARCHAR(150)	NULL COMMENT '상품 제목',
	`MAGAZINE_CONTENT`			TEXT COMMENT '게간지 본문',
	`MAGAZINE_VOLUME`			INT	NULL COMMENT '상품 출간 호수',
	`MAGAZINE_YEAR`				INT NOT NULL DEFAULT (YEAR(NOW())) COMMENT '상품 출간 년도',
	`MAGAZINE_SEASON`			VARCHAR(50)	NULL COMMENT '상품 출간 계절',
	`MAGAZINE_THUMBNAIL_IMAGE`	VARCHAR(300)	NULL COMMENT '2' COMMENT '상품 섬네일 이미지',
	`APPEND_DATE`				DATETIME	NULL COMMENT '등록일',
	`UPDATE_DATE`				DATETIME	NULL COMMENT '수정일',
	`APPEND_USER`				INT	NULL COMMENT '등록자',
	`UPDATE_USER`				INT	NULL COMMENT '수정자',
	`USE_YN`					BOOLEAN	NOT NULL DEFAULT TRUE COMMENT '사용여부',
	`START_DATE`				DATETIME NOT NULL DEFAULT NOW() COMMENT '게시 시작일',
	`END_DATE`					DATETIME NOT NULL DEFAULT (NOW() + INTERVAL 999 YEAR) COMMENT '게시 종료일'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='상품';

CREATE TABLE `MAGAZINE_CATEGORY` (
	`QUARTERLY_CATEGORY_SEQ`	INT	NOT NULL auto_increment PRIMARY KEY COMMENT '고유 번호',
	`QUARTERLY_CATEGORY_VALUE`	VARCHAR(50) NOT NULL COMMENT '카테고리 명'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='상품 카테고리';

CREATE TABLE `ARTICLE_HEAD` (
	`ARTICLE_HEAD_SEQ`			INT	NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '고유 번호',
	`MAGAZINE_SEQ`				INT	NOT NULL COMMENT '(상위)상품 고유 번호',
	`ARTICLE_HEAD_TITLE`		VARCHAR(150)	NULL COMMENT '기사 헤드타이틀 명',
	`ORDERED`					INT	NOT NULL DEFAULT 1 COMMENT '노출 순서'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='상품-기사 헤드타이틀';

CREATE TABLE `ARTICLE` (
	`ARTICLE_SEQ`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '고유 번호',
	`MAGAZINE_SEQ`	INT	NOT NULL COMMENT '(상위)상품 고유 번호',
	`ARTICLE_HEAD_SEQ`	INT	NOT NULL COMMENT '(상위)헤드타이틀 고유 번호',
	`ARTICLE_TITLE`	VARCHAR(150)	NULL COMMENT '기사 제목',
	`ARTICLE_CONTENT`	TEXT	NULL COMMENT '기사 내용',
	`EBOOK_PAGE`	INT	NULL COMMENT 'PDF 쪽수',
	`ORDERED`	INT	NOT NULL DEFAULT 1 COMMENT '순서',
	`VIEW_COUNT`	INT	NOT NULL DEFAULT 0 COMMENT '조회수'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='상품-기사';
