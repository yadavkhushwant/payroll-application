import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeService } from '../services/employee-service';
import { Employee, Department, Designation } from '../types';

// Employee hooks
export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: () => employeeService.getEmployees(),
  });
};

export const useEmployee = (id: number) => {
  return useQuery({
    queryKey: ['employees', id],
    queryFn: () => employeeService.getEmployee(id),
    enabled: !!id,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => 
      employeeService.createEmployee(employee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, employee }: { id: number; employee: Partial<Employee> }) => 
      employeeService.updateEmployee(id, employee),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employees', id] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => employeeService.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

// Department hooks
export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: () => employeeService.getDepartments(),
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (department: Omit<Department, 'id'>) => 
      employeeService.createDepartment(department),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
};

// Designation hooks
export const useDesignations = () => {
  return useQuery({
    queryKey: ['designations'],
    queryFn: () => employeeService.getDesignations(),
  });
};

export const useCreateDesignation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (designation: Omit<Designation, 'id'>) => 
      employeeService.createDesignation(designation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designations'] });
    },
  });
};
