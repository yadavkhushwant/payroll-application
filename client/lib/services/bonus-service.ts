import { apiClient } from '../api-client';
import type { 
  BonusType, 
  EmployeeBonus,
  BonusAllocationFormData,
  ApiResponse 
} from '../types';

export class BonusService {
  // Bonus Type endpoints
  static async getBonusTypes(): Promise<BonusType[]> {
    return apiClient.get<BonusType[]>('/bonus-types/get-all-active');
  }

  static async getBonusTypeById(id: number): Promise<BonusType> {
    return apiClient.get<BonusType>(`/bonus-types/get/${id}`);
  }

  static async createBonusType(data: Omit<BonusType, 'id' | 'createdAt' | 'updatedAt'>): Promise<BonusType> {
    return apiClient.post<BonusType>('/bonus-types/create', data);
  }

  static async updateBonusType(id: number, data: Partial<BonusType>): Promise<BonusType> {
    return apiClient.put<BonusType>(`/bonus-types/update/${id}`, data);
  }

  static async deactivateBonusType(id: number): Promise<BonusType> {
    return apiClient.put<BonusType>(`/bonus-types/deactivate/${id}`, {});
  }

  static async getBonusTypeByCode(code: string): Promise<BonusType> {
    return apiClient.get<BonusType>(`/bonus-types/get-by-code/${code}`);
  }

  static async getBonusTypesByFrequency(frequency: string): Promise<BonusType[]> {
    return apiClient.get<BonusType[]>(`/bonus-types/get-by-frequency/${frequency}`);
  }

  // Employee Bonus endpoints
  static async createBonus(data: BonusAllocationFormData): Promise<EmployeeBonus> {
    return apiClient.post<EmployeeBonus>('/employee-bonuses/create', data);
  }

  static async approveBonus(id: number): Promise<EmployeeBonus> {
    return apiClient.put<EmployeeBonus>(`/employee-bonuses/approve/${id}`, {});
  }

  static async rejectBonus(id: number, reason: string): Promise<EmployeeBonus> {
    return apiClient.put<EmployeeBonus>(`/employee-bonuses/reject/${id}?reason=${encodeURIComponent(reason)}`, {});
  }

  static async payBonus(id: number): Promise<EmployeeBonus> {
    return apiClient.put<EmployeeBonus>(`/employee-bonuses/pay/${id}`, {});
  }

  static async getBonusById(id: number): Promise<EmployeeBonus> {
    return apiClient.get<EmployeeBonus>(`/employee-bonuses/get/${id}`);
  }

  static async getBonusesByEmployee(employeeId: number): Promise<EmployeeBonus[]> {
    return apiClient.get<EmployeeBonus[]>(`/employee-bonuses/employee/${employeeId}`);
  }

  static async getBonusesByType(bonusTypeId: number): Promise<EmployeeBonus[]> {
    return apiClient.get<EmployeeBonus[]>(`/employee-bonuses/bonus-type/${bonusTypeId}`);
  }

  static async getBonusesByStatus(status: string): Promise<EmployeeBonus[]> {
    return apiClient.get<EmployeeBonus[]>(`/employee-bonuses/status/${status}`);
  }

  static async getPendingApprovalBonuses(): Promise<EmployeeBonus[]> {
    return apiClient.get<EmployeeBonus[]>('/employee-bonuses/pending-approval');
  }

  static async getBonusesForPayout(): Promise<EmployeeBonus[]> {
    return apiClient.get<EmployeeBonus[]>('/employee-bonuses/for-payout');
  }
}
