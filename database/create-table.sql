CREATE DATABASE IF NOT EXISTS ers DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE ers;

CREATE TABLE IF NOT EXISTS issue (
    id               BIGINT         NOT NULL AUTO_INCREMENT,
    title            VARCHAR(200)   NOT NULL,
    description      TEXT           NOT NULL,
    longitude        DECIMAL(10,7)  NOT NULL,
    latitude         DECIMAL(10,7)  NOT NULL,
    address          VARCHAR(500),
    deadline         DATETIME       NOT NULL,
    recruit_count    INT,
    skill_requirement VARCHAR(500),
    created_by       VARCHAR(100)   NOT NULL,
    created_at       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
