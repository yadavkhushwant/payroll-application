import { apiClient } from '../api-client';
import { Employee, Department, Designation } from '../types';

export const employeeService = {
  // Employee operations
  async getEmployees(): Promise<Employee[]> {
    return apiClient.get<Employee[]>('/employees');
  },

  async getEmployee(id: number): Promise<Employee> {
    return apiClient.get<Employee>(`/employees/${id}`);
  },

  async createEmployee(employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> {
    return apiClient.post<Employee>('/employees', employee);
  },

  async updateEmployee(id: number, employee: Partial<Employee>): Promise<Employee> {
    return apiClient.put<Employee>(`/employees/${id}`, employee);
  },

  async deleteEmployee(id: number): Promise<void> {
    return apiClient.delete<void>(`/employees/${id}`);
  },

  // Department operations
  async getDepartments(): Promise<Department[]> {
    return apiClient.get<Department[]>('/departments');
  },

  async createDepartment(department: Omit<Department, 'id'>): Promise<Department> {
    return apiClient.post<Department>('/departments', department);
  },

  // Designation operations
  async getDesignations(): Promise<Designation[]> {
    return apiClient.get<Designation[]>('/designations');
  },

  async createDesignation(designation: Omit<Designation, 'id'>): Promise<Designation> {
    return apiClient.post<Designation>('/designations', designation);
  }
};
