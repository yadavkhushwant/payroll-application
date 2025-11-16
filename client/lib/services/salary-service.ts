import { apiClient } from '../api-client';
import type { 
  SalaryStructure, 
  SalaryComponent, 
  EmployeeSalary,
  SalaryStructureFormData,
  ApiResponse,
  PaginatedResponse 
} from '../types';

export class SalaryService {
  // Salary Structure endpoints
  static async getSalaryStructures(): Promise<SalaryStructure[]> {
    return apiClient.get<SalaryStructure[]>('/salary-structures/get-all-active');
  }

  static async getSalaryStructureById(id: number): Promise<SalaryStructure> {
    return apiClient.get<SalaryStructure>(`/salary-structures/get/${id}`);
  }

  static async createSalaryStructure(data: SalaryStructureFormData): Promise<SalaryStructure> {
    return apiClient.post<SalaryStructure>('/salary-structures/create', data);
  }

  static async updateSalaryStructure(id: number, data: SalaryStructureFormData): Promise<SalaryStructure> {
    return apiClient.put<SalaryStructure>(`/salary-structures/update/${id}`, data);
  }

  static async deactivateSalaryStructure(id: number): Promise<SalaryStructure> {
    return apiClient.put<SalaryStructure>(`/salary-structures/deactivate/${id}`, {});
  }

  // Salary Component endpoints
  static async getSalaryComponents(): Promise<SalaryComponent[]> {
    return apiClient.get<SalaryComponent[]>('/salary-components/get-all-active');
  }

  static async getSalaryComponentById(id: number): Promise<SalaryComponent> {
    return apiClient.get<SalaryComponent>(`/salary-components/get/${id}`);
  }

  static async createSalaryComponent(data: Omit<SalaryComponent, 'id' | 'createdAt' | 'updatedAt'>): Promise<SalaryComponent> {
    return apiClient.post<SalaryComponent>('/salary-components/create', data);
  }

  static async updateSalaryComponent(id: number, data: Partial<SalaryComponent>): Promise<SalaryComponent> {
    return apiClient.put<SalaryComponent>(`/salary-components/update/${id}`, data);
  }

  static async deactivateSalaryComponent(id: number): Promise<SalaryComponent> {
    return apiClient.put<SalaryComponent>(`/salary-components/deactivate/${id}`, {});
  }

  static async getEarningComponents(): Promise<SalaryComponent[]> {
    return apiClient.get<SalaryComponent[]>('/salary-components/get-earnings');
  }

  static async getDeductionComponents(): Promise<SalaryComponent[]> {
    return apiClient.get<SalaryComponent[]>('/salary-components/get-deductions');
  }

  // Employee Salary endpoints
  static async getEmployeeSalaries(): Promise<EmployeeSalary[]> {
    return apiClient.get<EmployeeSalary[]>('/employee-salaries/get-all');
  }

  static async getEmployeeSalaryById(id: number): Promise<EmployeeSalary> {
    return apiClient.get<EmployeeSalary>(`/employee-salaries/get/${id}`);
  }

  static async getCurrentEmployeeSalary(employeeId: number): Promise<EmployeeSalary> {
    return apiClient.get<EmployeeSalary>(`/employee-salaries/current/${employeeId}`);
  }

  static async assignSalaryToEmployee(data: Omit<EmployeeSalary, 'id' | 'createdAt' | 'updatedAt'>): Promise<EmployeeSalary> {
    return apiClient.post<EmployeeSalary>('/employee-salaries/assign', data);
  }

  static async updateEmployeeSalary(id: number, data: Partial<EmployeeSalary>): Promise<EmployeeSalary> {
    return apiClient.put<EmployeeSalary>(`/employee-salaries/update/${id}`, data);
  }

  static async getSalaryHistory(employeeId: number): Promise<EmployeeSalary[]> {
    return apiClient.get<EmployeeSalary[]>(`/employee-salaries/history/${employeeId}`);
  }
}
