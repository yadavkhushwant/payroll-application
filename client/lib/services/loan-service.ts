import { apiClient } from '../api-client';
import type { 
  LoanType, 
  EmployeeLoan,
  LoanApplicationFormData,
  ApiResponse 
} from '../types';

export class LoanService {
  // Loan Type endpoints
  static async getLoanTypes(): Promise<LoanType[]> {
    return apiClient.get<LoanType[]>('/loan-types/get-all-active');
  }

  static async getLoanTypeById(id: number): Promise<LoanType> {
    return apiClient.get<LoanType>(`/loan-types/get/${id}`);
  }

  static async createLoanType(data: Omit<LoanType, 'id' | 'createdAt' | 'updatedAt'>): Promise<LoanType> {
    return apiClient.post<LoanType>('/loan-types/create', data);
  }

  static async updateLoanType(id: number, data: Partial<LoanType>): Promise<LoanType> {
    return apiClient.put<LoanType>(`/loan-types/update/${id}`, data);
  }

  static async deactivateLoanType(id: number): Promise<LoanType> {
    return apiClient.put<LoanType>(`/loan-types/deactivate/${id}`, {});
  }

  static async getLoanTypeByCode(code: string): Promise<LoanType> {
    return apiClient.get<LoanType>(`/loan-types/get-by-code/${code}`);
  }

  static async getAdvanceTypes(): Promise<LoanType[]> {
    return apiClient.get<LoanType[]>('/loan-types/get-advance-types');
  }

  static async getLoanTypesOnly(): Promise<LoanType[]> {
    return apiClient.get<LoanType[]>('/loan-types/get-loan-types');
  }

  // Employee Loan endpoints
  static async applyForLoan(data: LoanApplicationFormData): Promise<EmployeeLoan> {
    return apiClient.post<EmployeeLoan>('/employee-loans/apply', data);
  }

  static async approveLoan(id: number): Promise<EmployeeLoan> {
    return apiClient.put<EmployeeLoan>(`/employee-loans/approve/${id}`, {});
  }

  static async rejectLoan(id: number, reason: string): Promise<EmployeeLoan> {
    return apiClient.put<EmployeeLoan>(`/employee-loans/reject/${id}?reason=${encodeURIComponent(reason)}`, {});
  }

  static async disburseLoan(id: number): Promise<EmployeeLoan> {
    return apiClient.put<EmployeeLoan>(`/employee-loans/disburse/${id}`, {});
  }

  static async closeLoan(id: number): Promise<EmployeeLoan> {
    return apiClient.put<EmployeeLoan>(`/employee-loans/close/${id}`, {});
  }

  static async getLoanById(id: number): Promise<EmployeeLoan> {
    return apiClient.get<EmployeeLoan>(`/employee-loans/get/${id}`);
  }

  static async getLoansByEmployee(employeeId: number): Promise<EmployeeLoan[]> {
    return apiClient.get<EmployeeLoan[]>(`/employee-loans/employee/${employeeId}`);
  }

  static async getActiveLoansByEmployee(employeeId: number): Promise<EmployeeLoan[]> {
    return apiClient.get<EmployeeLoan[]>(`/employee-loans/employee/${employeeId}/active`);
  }

  static async getLoansByType(loanTypeId: number): Promise<EmployeeLoan[]> {
    return apiClient.get<EmployeeLoan[]>(`/employee-loans/loan-type/${loanTypeId}`);
  }

  static async getLoansByStatus(status: string): Promise<EmployeeLoan[]> {
    return apiClient.get<EmployeeLoan[]>(`/employee-loans/status/${status}`);
  }

  static async getPendingApprovalLoans(): Promise<EmployeeLoan[]> {
    return apiClient.get<EmployeeLoan[]>('/employee-loans/pending-approval');
  }

  static async getLoansForDeduction(): Promise<EmployeeLoan[]> {
    return apiClient.get<EmployeeLoan[]>('/employee-loans/due-for-deduction');
  }
}
