import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SalaryService } from '../services/salary-service';
import { SalaryStructure, SalaryComponent, EmployeeSalary, SalaryStructureFormData } from '../types';

// Salary Structure hooks
export const useSalaryStructures = () => {
  return useQuery({
    queryKey: ['salary-structures'],
    queryFn: () => SalaryService.getSalaryStructures(),
  });
};

export const useSalaryStructure = (id: number) => {
  return useQuery({
    queryKey: ['salary-structures', id],
    queryFn: () => SalaryService.getSalaryStructureById(id),
    enabled: !!id,
  });
};

export const useCreateSalaryStructure = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SalaryStructureFormData) => SalaryService.createSalaryStructure(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salary-structures'] });
    },
  });
};

export const useUpdateSalaryStructure = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: SalaryStructureFormData }) => 
      SalaryService.updateSalaryStructure(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['salary-structures'] });
      queryClient.invalidateQueries({ queryKey: ['salary-structures', id] });
    },
  });
};

export const useDeactivateSalaryStructure = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => SalaryService.deactivateSalaryStructure(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salary-structures'] });
    },
  });
};

// Salary Component hooks
export const useSalaryComponents = () => {
  return useQuery({
    queryKey: ['salary-components'],
    queryFn: () => SalaryService.getSalaryComponents(),
  });
};

export const useSalaryComponent = (id: number) => {
  return useQuery({
    queryKey: ['salary-components', id],
    queryFn: () => SalaryService.getSalaryComponentById(id),
    enabled: !!id,
  });
};

export const useCreateSalaryComponent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<SalaryComponent, 'id' | 'createdAt' | 'updatedAt'>) => 
      SalaryService.createSalaryComponent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salary-components'] });
    },
  });
};

export const useUpdateSalaryComponent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SalaryComponent> }) => 
      SalaryService.updateSalaryComponent(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['salary-components'] });
      queryClient.invalidateQueries({ queryKey: ['salary-components', id] });
    },
  });
};

export const useDeactivateSalaryComponent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => SalaryService.deactivateSalaryComponent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salary-components'] });
    },
  });
};

export const useEarningComponents = () => {
  return useQuery({
    queryKey: ['salary-components', 'earnings'],
    queryFn: () => SalaryService.getEarningComponents(),
  });
};

export const useDeductionComponents = () => {
  return useQuery({
    queryKey: ['salary-components', 'deductions'],
    queryFn: () => SalaryService.getDeductionComponents(),
  });
};

// Employee Salary hooks
export const useEmployeeSalaries = () => {
  return useQuery({
    queryKey: ['employee-salaries'],
    queryFn: () => SalaryService.getEmployeeSalaries(),
  });
};

export const useEmployeeSalary = (id: number) => {
  return useQuery({
    queryKey: ['employee-salaries', id],
    queryFn: () => SalaryService.getEmployeeSalaryById(id),
    enabled: !!id,
  });
};

export const useCurrentEmployeeSalary = (employeeId: number) => {
  return useQuery({
    queryKey: ['employee-salaries', 'current', employeeId],
    queryFn: () => SalaryService.getCurrentEmployeeSalary(employeeId),
    enabled: !!employeeId,
  });
};

export const useAssignSalaryToEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<EmployeeSalary, 'id' | 'createdAt' | 'updatedAt'>) => 
      SalaryService.assignSalaryToEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee-salaries'] });
    },
  });
};

export const useUpdateEmployeeSalary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<EmployeeSalary> }) => 
      SalaryService.updateEmployeeSalary(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['employee-salaries'] });
      queryClient.invalidateQueries({ queryKey: ['employee-salaries', id] });
    },
  });
};

export const useSalaryHistory = (employeeId: number) => {
  return useQuery({
    queryKey: ['employee-salaries', 'history', employeeId],
    queryFn: () => SalaryService.getSalaryHistory(employeeId),
    enabled: !!employeeId,
  });
};
