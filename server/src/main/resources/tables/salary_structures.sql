-- File: salary_structures.sql

CREATE TABLE IF NOT EXISTS salary_structures (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    structure_name VARCHAR(100) NOT NULL,
    description TEXT,
    effective_from DATE NOT NULL,
    effective_to DATE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    INDEX idx_salary_structure_name (structure_name),
    INDEX idx_salary_structure_active (is_active),
    INDEX idx_salary_structure_effective (effective_from, effective_to)
);
