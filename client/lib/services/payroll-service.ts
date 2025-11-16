import { apiClient } from '../api-client';
import type { 
  PayrollSummary,
  ApiResponse 
} from '../types';

export class PayrollService {
  // Advanced Payroll Calculation endpoints
  static async calculatePayroll(employeeId: number, month: number, year: number): Promise<PayrollSummary> {
    return apiClient.post<PayrollSummary>(`/payroll/calculate-advanced/${employeeId}?month=${month}&year=${year}`, {});
  }

  static async calculateBulkPayroll(month: number, year: number, employeeIds?: number[]): Promise<PayrollSummary[]> {
    const body = employeeIds ? employeeIds : null;
    return apiClient.post<PayrollSummary[]>(`/payroll/calculate-bulk?month=${month}&year=${year}`, body);
  }

  static async processLoanDeductions(month: number, year: number): Promise<string> {
    const response = await apiClient.post<{message?: string}>(`/payroll/process-loan-deductions?month=${month}&year=${year}`, {});
    return response.message || 'Loan deductions processed successfully';
  }

  static async processBonuses(month: number, year: number): Promise<string> {
    const response = await apiClient.post<{message?: string}>(`/payroll/process-bonuses?month=${month}&year=${year}`, {});
    return response.message || 'Bonuses processed successfully';
  }

  static async getPayrollSummary(employeeId: number, month: number, year: number): Promise<PayrollSummary> {
    return apiClient.get<PayrollSummary>(`/payroll/summary/${employeeId}?month=${month}&year=${year}`);
  }

  // Basic Payroll Calculation (existing endpoint)
  static async calculateBasicPayroll(employeeId: number, payrollMonth: string): Promise<any> {
    return apiClient.get<any>(`/payroll/calculate/${employeeId}?payrollMonth=${payrollMonth}`);
  }

  static async calculateStatutoryDeductions(grossSalary: number): Promise<Record<string, number>> {
    return apiClient.get<Record<string, number>>(`/payroll/statutory-deductions?grossSalary=${grossSalary}`);
  }
}
