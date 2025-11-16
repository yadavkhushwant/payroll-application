-- File: employee_bonuses.sql

CREATE TABLE IF NOT EXISTS employee_bonuses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    bonus_type_id BIGINT NOT NULL,
    bonus_amount DECIMAL(12,2) NOT NULL,
    calculation_base ENUM('FIXED_AMOUNT', 'PERCENTAGE_OF_BASIC', 'PERCENTAGE_OF_GROSS', 'PERCENTAGE_OF_CTC'),
    percentage_value DECIMAL(5,2),
    bonus_period_from DATE,
    bonus_period_to DATE,
    eligible_date DATE NOT NULL,
    payout_month DATE NOT NULL,
    is_taxable BOOLEAN NOT NULL DEFAULT TRUE,
    performance_rating VARCHAR(10),
    performance_score DECIMAL(5,2),
    status ENUM('PENDING', 'APPROVED', 'PAID', 'CANCELLED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    approved_by VARCHAR(100),
    approval_date DATE,
    paid_date DATE,
    remarks TEXT,
    justification TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_employee_bonuses_employee FOREIGN KEY (employee_id) REFERENCES employees(id),
    CONSTRAINT fk_employee_bonuses_type FOREIGN KEY (bonus_type_id) REFERENCES bonus_types(id),
    
    INDEX idx_employee_bonuses_employee (employee_id),
    INDEX idx_employee_bonuses_type (bonus_type_id),
    INDEX idx_employee_bonuses_status (status),
    INDEX idx_employee_bonuses_payout (payout_month),
    INDEX idx_employee_bonuses_active (is_active),
    INDEX idx_employee_bonuses_period (bonus_period_from, bonus_period_to)
);
