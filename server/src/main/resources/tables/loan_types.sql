-- File: loan_types.sql

CREATE TABLE IF NOT EXISTS loan_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL UNIQUE,
    type_code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    max_amount_allowed DECIMAL(12,2),
    max_installments INT,
    default_interest_rate DECIMAL(5,2) DEFAULT 0,
    requires_approval BOOLEAN NOT NULL DEFAULT TRUE,
    is_advance_type BOOLEAN NOT NULL DEFAULT FALSE,
    eligibility_months INT DEFAULT 0,
    max_outstanding_loans INT DEFAULT 1,
    display_order INT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    INDEX idx_loan_types_code (type_code),
    INDEX idx_loan_types_active (is_active)
);

-- Insert default loan types
INSERT INTO loan_types (type_name, type_code, description, max_amount_allowed, max_installments, default_interest_rate, requires_approval, is_advance_type, eligibility_months, display_order, created_by) VALUES
('Salary Advance', 'SALARY_ADVANCE', 'Advance against upcoming salary', 50000.00, 3, 0.00, FALSE, TRUE, 3, 1, 'SYSTEM'),
('Personal Loan', 'PERSONAL_LOAN', 'Personal loan for employees', 200000.00, 36, 12.00, TRUE, FALSE, 12, 2, 'SYSTEM'),
('Emergency Loan', 'EMERGENCY_LOAN', 'Emergency financial assistance', 100000.00, 12, 6.00, TRUE, FALSE, 6, 3, 'SYSTEM'),
('Festival Advance', 'FESTIVAL_ADVANCE', 'Festival advance for celebrations', 25000.00, 6, 0.00, FALSE, TRUE, 6, 4, 'SYSTEM'),
('Medical Emergency Loan', 'MEDICAL_EMERGENCY', 'Medical emergency financial support', 150000.00, 24, 3.00, TRUE, FALSE, 3, 5, 'SYSTEM'),
('Educational Loan', 'EDUCATIONAL_LOAN', 'Educational loan for employee/family', 300000.00, 60, 8.00, TRUE, FALSE, 12, 6, 'SYSTEM'),
('Vehicle Loan', 'VEHICLE_LOAN', 'Vehicle purchase loan', 500000.00, 84, 10.00, TRUE, FALSE, 24, 7, 'SYSTEM');
