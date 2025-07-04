-- File: employees.sql

CREATE TABLE IF NOT EXISTS employees (
                                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                         employee_code BIGINT NOT NULL UNIQUE,
                                         user_id BIGINT NOT NULL,
                                         first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    department_id BIGINT NOT NULL,
    designation_id BIGINT NOT NULL,
    aadhar_number VARCHAR(255),
    pan_number VARCHAR(255),
    mobile_number VARCHAR(255),
    street VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_employee_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_employee_department FOREIGN KEY (department_id) REFERENCES departments(id),
    CONSTRAINT fk_employee_designation FOREIGN KEY (designation_id) REFERENCES designations(id)
    );
