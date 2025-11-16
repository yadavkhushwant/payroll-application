// Authentication Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface User {
  username: string;
  authenticated: boolean;
}

// Employee Types
export interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  dateOfJoining: string;
  designation: string;
  department: string;
  managerId?: number;
  employmentType: 'PERMANENT' | 'CONTRACT' | 'INTERN' | 'CONSULTANT';
  status: 'ACTIVE' | 'INACTIVE' | 'TERMINATED';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: number;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
}

export interface Designation {
  id: number;
  title: string;
  code: string;
  description?: string;
  level: number;
  isActive: boolean;
}

// Salary Structure Types
export interface SalaryStructure {
  id: number;
  structureName: string;
  description?: string;
  effectiveDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SalaryComponent {
  id: number;
  componentName: string;
  componentCode: string;
  componentType: 'EARNING' | 'DEDUCTION';
  calculationMethod: 'FIXED' | 'PERCENTAGE_OF_BASIC' | 'PERCENTAGE_OF_GROSS' | 'PERCENTAGE_OF_CTC';
  value: number;
  isStatutory: boolean;
  isTaxable: boolean;
  isActive: boolean;
  displayOrder: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalaryStructureComponent {
  id: number;
  salaryStructure: SalaryStructure;
  salaryComponent: SalaryComponent;
  value: number;
  calculationMethod: string;
  isActive: boolean;
}

export interface EmployeeSalary {
  id: number;
  employeeId: number;
  salaryStructure: SalaryStructure;
  basicSalary: number;
  grossSalary?: number;
  ctc?: number;
  effectiveDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Loan Types
export interface LoanType {
  id: number;
  loanTypeName: string;
  loanTypeCode: string;
  description?: string;
  maxLoanAmount: number;
  maxInstallments: number;
  interestRate: number;
  processingFee: number;
  isAdvanceType: boolean;
  requiresApproval: boolean;
  minServiceMonths: number;
  maxLoanPercentage: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeLoan {
  id: number;
  employeeId: number;
  loanType: LoanType;
  loanAmount: number;
  interestRate: number;
  numberOfInstallments: number;
  installmentAmount: number;
  outstandingAmount: number;
  startDeductionFrom: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'DEFAULTED' | 'REJECTED';
  applicationDate: string;
  approvalDate?: string;
  disbursementDate?: string;
  rejectionReason?: string;
  purpose?: string;
  guarantorName?: string;
  guarantorEmployeeId?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Bonus Types
export interface BonusType {
  id: number;
  bonusTypeName: string;
  bonusTypeCode: string;
  description?: string;
  calculationBase: 'FIXED_AMOUNT' | 'PERCENTAGE_OF_BASIC' | 'PERCENTAGE_OF_GROSS' | 'PERCENTAGE_OF_CTC';
  value: number;
  frequency: 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'YEARLY' | 'ONE_TIME';
  requiresApproval: boolean;
  maxAmount?: number;
  minPerformanceRating?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeBonus {
  id: number;
  employeeId: number;
  bonusType: BonusType;
  bonusAmount: number;
  calculatedAmount?: number;
  performanceRating?: number;
  bonusPeriodFrom: string;
  bonusPeriodTo: string;
  eligibleDate: string;
  payoutDate?: string;
  payoutMonth?: string;
  status: 'PENDING' | 'APPROVED' | 'PAID' | 'CANCELLED' | 'REJECTED';
  approvalDate?: string;
  paidDate?: string;
  rejectionReason?: string;
  remarks?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Payroll Types
export interface PayrollSummary {
  employeeId: number;
  employeeName: string;
  month: number;
  year: number;
  payrollDate: string;
  basicSalary: number;
  grossSalary: number;
  totalEarnings: number;
  totalDeductions: number;
  totalLoanDeductions: number;
  totalBonuses: number;
  providentFund: number;
  professionalTax: number;
  incomeTax: number;
  esiDeduction: number;
  netSalary: number;
  earningComponents: ComponentDetail[];
  deductionComponents: ComponentDetail[];
  loanDeductions: LoanDeduction[];
  bonuses: BonusDetail[];
}

export interface ComponentDetail {
  componentName: string;
  componentType: string;
  amount: number;
  calculationBasis: string;
}

export interface LoanDeduction {
  loanId: number;
  loanType: string;
  deductionAmount: number;
  remainingBalance: number;
  remainingInstallments: number;
}

export interface BonusDetail {
  bonusId: number;
  bonusType: string;
  bonusAmount: number;
  frequency: string;
  performanceRating?: string;
}

// Employee Types
export interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  departmentId?: number;
  designationId?: number;
  dateOfJoining: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Payroll Types
export interface PayrollSummary {
  employeeId: number;
  payrollMonth: string;
  payrollYear: number;
  basicSalary: number;
  grossSalary: number;
  totalEarnings: number;
  totalDeductions: number;
  netSalary: number;
  earnings: PayrollComponent[];
  deductions: PayrollComponent[];
  loanDeductions: LoanDeduction[];
  bonusPayments: BonusPayment[];
  attendanceDetails?: AttendanceDetails;
  calculatedOn: string;
}

export interface PayrollComponent {
  componentId: number;
  componentName: string;
  componentCode: string;
  componentType: 'EARNING' | 'DEDUCTION';
  calculationMethod: string;
  value: number;
  calculatedAmount: number;
  isStatutory: boolean;
}

export interface LoanDeduction {
  loanId: number;
  loanType: string;
  installmentAmount: number;
  remainingInstallments: number;
  totalLoanAmount: number;
  outstandingAmount: number;
}

export interface BonusPayment {
  bonusId: number;
  bonusType: string;
  bonusAmount: number;
  bonusPeriod: string;
  payoutMonth: string;
}

export interface AttendanceDetails {
  totalWorkingDays: number;
  actualWorkingDays: number;
  presentDays: number;
  absentDays: number;
  holidayDays: number;
  overtimeHours: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

// Form Types
export interface SalaryStructureFormData {
  structureName: string;
  description?: string;
  effectiveDate: string;
  endDate?: string;
  components: SalaryStructureComponentFormData[];
}

export interface SalaryStructureComponentFormData {
  salaryComponentId: number;
  value: number;
  calculationMethod: string;
}

export interface LoanApplicationFormData {
  loanTypeId: number;
  loanAmount: number;
  numberOfInstallments: number;
  startDeductionFrom: string;
  purpose?: string;
  guarantorEmployeeId?: number;
}

export interface BonusAllocationFormData {
  employeeId: number;
  bonusTypeId: number;
  bonusAmount?: number;
  performanceRating?: number;
  bonusPeriodFrom: string;
  bonusPeriodTo: string;
  eligibleDate: string;
  payoutMonth?: string;
  remarks?: string;
}
