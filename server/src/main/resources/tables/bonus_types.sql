-- File: bonus_types.sql

CREATE TABLE IF NOT EXISTS bonus_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL UNIQUE,
    type_code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    calculation_base ENUM('FIXED_AMOUNT', 'PERCENTAGE_OF_BASIC', 'PERCENTAGE_OF_GROSS', 'PERCENTAGE_OF_CTC') NOT NULL,
    default_percentage DECIMAL(5,2),
    default_amount DECIMAL(12,2),
    is_taxable BOOLEAN NOT NULL DEFAULT TRUE,
    is_annual BOOLEAN NOT NULL DEFAULT FALSE,
    requires_approval BOOLEAN NOT NULL DEFAULT TRUE,
    requires_performance_rating BOOLEAN NOT NULL DEFAULT FALSE,
    eligibility_months INT DEFAULT 0,
    frequency ENUM('MONTHLY', 'QUARTERLY', 'YEARLY', 'AD_HOC') DEFAULT 'AD_HOC',
    display_order INT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    INDEX idx_bonus_types_code (type_code),
    INDEX idx_bonus_types_active (is_active),
    INDEX idx_bonus_types_frequency (frequency)
);

-- Insert default bonus types
INSERT INTO bonus_types (type_name, type_code, description, calculation_base, default_percentage, default_amount, is_taxable, is_annual, requires_approval, requires_performance_rating, eligibility_months, frequency, display_order, created_by) VALUES
('Performance Bonus', 'PERFORMANCE', 'Performance-based bonus', 'PERCENTAGE_OF_BASIC', 20.00, NULL, TRUE, FALSE, TRUE, TRUE, 6, 'AD_HOC', 1, 'SYSTEM'),
('Annual Bonus', 'ANNUAL', 'Yearly performance bonus', 'PERCENTAGE_OF_GROSS', 100.00, NULL, TRUE, TRUE, TRUE, TRUE, 12, 'YEARLY', 2, 'SYSTEM'),
('Festival Bonus', 'FESTIVAL', 'Festival celebration bonus', 'FIXED_AMOUNT', NULL, 5000.00, TRUE, FALSE, FALSE, FALSE, 3, 'AD_HOC', 3, 'SYSTEM'),
('Retention Bonus', 'RETENTION', 'Employee retention bonus', 'PERCENTAGE_OF_CTC', 15.00, NULL, TRUE, FALSE, TRUE, FALSE, 24, 'AD_HOC', 4, 'SYSTEM'),
('Project Completion Bonus', 'PROJECT_COMPLETION', 'Project milestone bonus', 'FIXED_AMOUNT', NULL, 10000.00, TRUE, FALSE, TRUE, FALSE, 6, 'AD_HOC', 5, 'SYSTEM'),
('Special Achievement', 'SPECIAL_ACHIEVEMENT', 'Special recognition bonus', 'FIXED_AMOUNT', NULL, 15000.00, TRUE, FALSE, TRUE, FALSE, 3, 'AD_HOC', 6, 'SYSTEM'),
('Referral Bonus', 'REFERRAL', 'Employee referral bonus', 'FIXED_AMOUNT', NULL, 7500.00, TRUE, FALSE, FALSE, FALSE, 6, 'AD_HOC', 7, 'SYSTEM'),
('Quarterly Incentive', 'QUARTERLY_INCENTIVE', 'Quarterly performance incentive', 'PERCENTAGE_OF_BASIC', 10.00, NULL, TRUE, FALSE, TRUE, TRUE, 3, 'QUARTERLY', 8, 'SYSTEM'),
('Spot Award', 'SPOT_AWARD', 'Immediate recognition award', 'FIXED_AMOUNT', NULL, 2500.00, TRUE, FALSE, FALSE, FALSE, 1, 'AD_HOC', 9, 'SYSTEM'),
('Long Service Award', 'LONG_SERVICE', 'Long service recognition', 'PERCENTAGE_OF_BASIC', 50.00, NULL, TRUE, FALSE, TRUE, FALSE, 60, 'AD_HOC', 10, 'SYSTEM');
