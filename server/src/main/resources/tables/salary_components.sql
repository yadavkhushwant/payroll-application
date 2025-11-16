-- File: salary_components.sql

CREATE TABLE IF NOT EXISTS salary_components (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    component_name VARCHAR(100) NOT NULL,
    component_code VARCHAR(50) NOT NULL UNIQUE,
    component_type ENUM('EARNING', 'DEDUCTION') NOT NULL,
    calculation_type ENUM('FIXED', 'PERCENTAGE', 'FORMULA') NOT NULL,
    is_taxable BOOLEAN NOT NULL DEFAULT TRUE,
    is_statutory BOOLEAN NOT NULL DEFAULT FALSE,
    default_value DECIMAL(10,2),
    formula TEXT,
    display_order INT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    INDEX idx_component_type (component_type),
    INDEX idx_component_code (component_code),
    INDEX idx_component_active (is_active)
);

-- Insert default salary components
INSERT INTO salary_components (component_name, component_code, component_type, calculation_type, is_taxable, is_statutory, display_order) VALUES
-- Earnings
('Basic Salary', 'BASIC', 'EARNING', 'FIXED', TRUE, FALSE, 1),
('House Rent Allowance', 'HRA', 'EARNING', 'PERCENTAGE', TRUE, FALSE, 2),
('Dearness Allowance', 'DA', 'EARNING', 'PERCENTAGE', TRUE, FALSE, 3),
('Medical Allowance', 'MEDICAL', 'EARNING', 'FIXED', TRUE, FALSE, 4),
('Transport Allowance', 'TRANSPORT', 'EARNING', 'FIXED', TRUE, FALSE, 5),
('Special Allowance', 'SPECIAL', 'EARNING', 'FIXED', TRUE, FALSE, 6),
('Overtime', 'OVERTIME', 'EARNING', 'FORMULA', TRUE, FALSE, 7),
('Incentive', 'INCENTIVE', 'EARNING', 'FIXED', TRUE, FALSE, 8),
-- Deductions
('Provident Fund', 'PF', 'DEDUCTION', 'PERCENTAGE', FALSE, TRUE, 9),
('Employee State Insurance', 'ESI', 'DEDUCTION', 'PERCENTAGE', FALSE, TRUE, 10),
('Professional Tax', 'PT', 'DEDUCTION', 'FIXED', FALSE, TRUE, 11),
('Income Tax', 'IT', 'DEDUCTION', 'FORMULA', FALSE, TRUE, 12),
('Loan Deduction', 'LOAN', 'DEDUCTION', 'FIXED', FALSE, FALSE, 13),
('Other Deductions', 'OTHER_DED', 'DEDUCTION', 'FIXED', FALSE, FALSE, 14);
