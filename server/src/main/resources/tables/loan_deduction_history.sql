-- File: loan_deduction_history.sql

CREATE TABLE IF NOT EXISTS loan_deduction_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    loan_id BIGINT NOT NULL,
    deduction_month DATE NOT NULL,
    deducted_amount DECIMAL(12,2) NOT NULL,
    principal_amount DECIMAL(12,2),
    interest_amount DECIMAL(12,2),
    outstanding_before DECIMAL(12,2),
    outstanding_after DECIMAL(12,2),
    installment_number INT,
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_by VARCHAR(100),
    
    CONSTRAINT fk_loan_history_loan FOREIGN KEY (loan_id) REFERENCES employee_loans(id),
    
    INDEX idx_loan_history_loan (loan_id),
    INDEX idx_loan_history_month (deduction_month),
    INDEX idx_loan_history_processed (processed_at),
    
    UNIQUE KEY uk_loan_month (loan_id, deduction_month)
);
