# Payroll Processing Features - Implementation Guide

## Sprint 1: Foundation Setup - COMPLETED ✅

### What Has Been Implemented

#### 1. Core Salary Management Entities
- **SalaryStructureEntity**: Defines salary structure templates
- **SalaryComponentEntity**: Individual salary components (Basic, HRA, PF, etc.)
- **EmployeeSalaryEntity**: Employee-specific salary assignments
- **SalaryStructureComponentEntity**: Links components to structures with values
- **Enums**: ComponentType, CalculationType, PercentageBase

#### 2. Database Tables Created
- `salary_structures` - Salary structure templates
- `salary_components` - Salary components with default data
- `employee_salary` - Employee salary assignments
- `salary_structure_components` - Structure-component mappings

#### 3. Repository Layer
- SalaryStructureRepository - with custom queries for active structures
- SalaryComponentRepository - with queries by type and code
- EmployeeSalaryRepository - with queries for current/latest salary
- SalaryStructureComponentRepository - with queries by structure

#### 4. Service Layer
- **SalaryStructureService**: CRUD operations for salary structures
- **SalaryComponentService**: CRUD operations for salary components
- **EmployeeSalaryService**: Salary assignment and history management
- **PayrollCalculationService**: Basic payroll calculation engine
- **PayrollDataInitializationService**: Setup default data

#### 5. Controller Layer (REST APIs)
- **SalaryStructureController**: `/api/salary-structures/*`
- **SalaryComponentController**: `/api/salary-components/*`
- **EmployeeSalaryController**: `/api/employee-salary/*`
- **PayrollController**: `/api/payroll/*`
- **PayrollSetupController**: `/api/payroll-setup/*`

### API Endpoints Available

#### Salary Structure Management
```
POST   /api/salary-structures/create
PUT    /api/salary-structures/update/{id}
PUT    /api/salary-structures/deactivate/{id}
GET    /api/salary-structures/get/{id}
GET    /api/salary-structures/get-all-active
GET    /api/salary-structures/get-by-name/{name}
GET    /api/salary-structures/get-active-on-date?date=2024-01-01
```

#### Salary Component Management
```
POST   /api/salary-components/create
PUT    /api/salary-components/update/{id}
PUT    /api/salary-components/deactivate/{id}
GET    /api/salary-components/get/{id}
GET    /api/salary-components/get-all-active
GET    /api/salary-components/get-by-type/{EARNING|DEDUCTION}
GET    /api/salary-components/get-by-code/{code}
GET    /api/salary-components/get-statutory
```

#### Employee Salary Management
```
POST   /api/employee-salary/assign
PUT    /api/employee-salary/update/{id}
PUT    /api/employee-salary/deactivate/{id}
GET    /api/employee-salary/get/{id}
GET    /api/employee-salary/get-history/{employeeId}
GET    /api/employee-salary/get-current/{employeeId}
GET    /api/employee-salary/get-current-on-date/{employeeId}?asOfDate=2024-01-01
GET    /api/employee-salary/get-latest/{employeeId}
GET    /api/employee-salary/get-by-structure/{structureId}
```

#### Payroll Calculation
```
GET    /api/payroll/calculate/{employeeId}?payrollMonth=2024-01
GET    /api/payroll/statutory-deductions?grossSalary=50000
```

#### Setup & Initialization
```
POST   /api/payroll-setup/initialize-default-structure
POST   /api/payroll-setup/assign-default-salary/{employeeId}?basicSalary=25000
```

### Default Salary Components Included

**Earnings:**
- Basic Salary (BASIC)
- House Rent Allowance (HRA) - 50% of basic
- Dearness Allowance (DA)
- Medical Allowance (MEDICAL) - ₹1,250
- Transport Allowance (TRANSPORT) - ₹1,600
- Special Allowance, Overtime, Incentive

**Deductions:**
- Provident Fund (PF) - 12% of basic
- Employee State Insurance (ESI) - 0.75% (if gross ≤ ₹21,000)
- Professional Tax (PT) - ₹175/₹200 based on salary
- Income Tax (IT) - Formula-based
- Loan Deductions, Other Deductions

### How to Test the Implementation

#### 1. Initialize Default Data
```bash
# First, initialize the default salary structure
POST /api/payroll-setup/initialize-default-structure

# Then assign salary to an employee
POST /api/payroll-setup/assign-default-salary/1?basicSalary=25000
```

#### 2. Calculate Payroll
```bash
# Calculate payroll for an employee for January 2024
GET /api/payroll/calculate/1?payrollMonth=2024-01
```

#### 3. View Salary Components
```bash
# Get all active salary components
GET /api/salary-components/get-all-active

# Get only earning components
GET /api/salary-components/get-by-type/EARNING

# Get only deduction components
GET /api/salary-components/get-by-type/DEDUCTION
```

#### 4. View Employee Salary Details
```bash
# Get current salary for employee
GET /api/employee-salary/get-current/1

# Get salary history
GET /api/employee-salary/get-history/1
```

### Calculation Logic Implemented

#### Statutory Deductions:
1. **PF**: 12% of basic salary (max ₹15,000)
2. **ESI**: 0.75% of gross (if gross ≤ ₹21,000)
3. **PT**: ₹175 (gross ≤ ₹21,000) or ₹200 (gross > ₹21,000)

#### Percentage Calculations:
- Supports percentage of BASIC, GROSS, or CTC
- Automatic calculation based on component configuration
- Formula-based components for complex calculations

### Database Schema Features

#### Audit Trail:
- All entities have `created_at`, `updated_at` timestamps
- `created_by`, `updated_by` fields for user tracking
- Soft delete with `is_active` flags

#### Effective Dating:
- `effective_from` and `effective_to` for salary structures
- Automatic deactivation of previous salaries when new ones are assigned
- Historical salary tracking

### Next Steps (Upcoming Sprints)

#### Sprint 2: Attendance Management
- Attendance tracking entities
- Shift management
- Overtime calculations
- Leave integration

#### Sprint 3: Payslip Generation
- Payslip entity and generation
- PDF creation
- Email distribution
- Employee self-service portal

#### Sprint 4: Advanced Features
- Tax calculations
- Statutory reports
- Dashboard and analytics
- Batch processing

### Technical Notes

1. **Transaction Management**: All payroll operations use `@Transactional("tenantTransactionManager")`
2. **Multi-tenancy**: All tables respect tenant context
3. **Error Handling**: Comprehensive exception handling with custom messages
4. **Validation**: Input validation on all API endpoints
5. **Performance**: Optimized queries with proper indexing

The foundation is now ready for building advanced payroll features! 🚀
