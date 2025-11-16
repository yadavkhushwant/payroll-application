-- File: salary_structure_components.sql

CREATE TABLE IF NOT EXISTS salary_structure_components (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    salary_structure_id BIGINT NOT NULL,
    component_id BIGINT NOT NULL,
    component_value DECIMAL(10,2),
    is_percentage BOOLEAN NOT NULL DEFAULT FALSE,
    percentage_base ENUM('BASIC', 'GROSS', 'CTC'),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    CONSTRAINT fk_structure_comp_structure FOREIGN KEY (salary_structure_id) REFERENCES salary_structures(id),
    CONSTRAINT fk_structure_comp_component FOREIGN KEY (component_id) REFERENCES salary_components(id),
    UNIQUE KEY uk_structure_component (salary_structure_id, component_id),
    INDEX idx_structure_components_structure (salary_structure_id),
    INDEX idx_structure_components_active (is_active)
);
