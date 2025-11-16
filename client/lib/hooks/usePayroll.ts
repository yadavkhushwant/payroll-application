import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PayrollService } from '../services/payroll-service';
import { PayrollSummary } from '../types';

// Payroll calculation hooks
export const useCalculatePayroll = () => {
  return useMutation({
    mutationFn: ({ employeeId, month, year }: { employeeId: number; month: number; year: number }) =>
      PayrollService.calculatePayroll(employeeId, month, year),
  });
};

export const useCalculateBulkPayroll = () => {
  return useMutation({
    mutationFn: ({ month, year, employeeIds }: { month: number; year: number; employeeIds?: number[] }) =>
      PayrollService.calculateBulkPayroll(month, year, employeeIds),
  });
};

export const useProcessLoanDeductions = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ month, year }: { month: number; year: number }) =>
      PayrollService.processLoanDeductions(month, year),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll'] });
    },
  });
};

export const useProcessBonuses = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ month, year }: { month: number; year: number }) =>
      PayrollService.processBonuses(month, year),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll'] });
    },
  });
};

export const usePayrollSummary = (employeeId: number, month: number, year: number) => {
  return useQuery({
    queryKey: ['payroll', 'summary', employeeId, month, year],
    queryFn: () => PayrollService.getPayrollSummary(employeeId, month, year),
    enabled: !!employeeId && !!month && !!year,
  });
};

export const useCalculateBasicPayroll = () => {
  return useMutation({
    mutationFn: ({ employeeId, payrollMonth }: { employeeId: number; payrollMonth: string }) =>
      PayrollService.calculateBasicPayroll(employeeId, payrollMonth),
  });
};

export const useCalculateStatutoryDeductions = () => {
  return useMutation({
    mutationFn: (grossSalary: number) => PayrollService.calculateStatutoryDeductions(grossSalary),
  });
};
