package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.tenant.entity.*;
import com.codemantri.payroll.tenant.repository.*;
import com.codemantri.payroll.tenant.dto.PayrollSummaryDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;

@Service
@Transactional("tenantTransactionManager")
public class AdvancedPayrollCalculationService {
    
    private final EmployeeLoanRepository loanRepository;
    private final EmployeeBonusRepository bonusRepository;
    private final LoanDeductionHistoryRepository loanDeductionHistoryRepository;
    private final EmployeeSalaryService employeeSalaryService;
    
    public AdvancedPayrollCalculationService(
            EmployeeLoanRepository loanRepository,
            EmployeeBonusRepository bonusRepository,
            LoanDeductionHistoryRepository loanDeductionHistoryRepository,
            EmployeeSalaryService employeeSalaryService) {
        this.loanRepository = loanRepository;
        this.bonusRepository = bonusRepository;
        this.loanDeductionHistoryRepository = loanDeductionHistoryRepository;
        this.employeeSalaryService = employeeSalaryService;
    }

    public Map<String, Object> calculateComprehensivePayroll(Long employeeId, YearMonth payrollMonth) {
        Map<String, Object> payrollResult = new HashMap<>();
        LocalDate payrollDate = payrollMonth.atDay(1);
        
        // Get employee's current salary
        EmployeeSalaryEntity employeeSalary = employeeSalaryService.getCurrentEmployeeSalary(employeeId, payrollDate);
        
        // Basic salary components
        BigDecimal basicSalary = employeeSalary.getBasicSalary();
        BigDecimal grossSalary = employeeSalary.getGrossSalary() != null ? 
            employeeSalary.getGrossSalary() : basicSalary;
        
        payrollResult.put("basicSalary", basicSalary);
        payrollResult.put("grossSalary", grossSalary);
        
        // Calculate bonuses for this month
        Map<String, Object> bonusDetails = calculateMonthlyBonuses(employeeId, payrollDate);
        BigDecimal totalBonus = (BigDecimal) bonusDetails.get("totalAmount");
        payrollResult.put("bonuses", bonusDetails);
        
        // Calculate loan deductions
        Map<String, Object> loanDetails = calculateAndProcessLoanDeductions(employeeId, payrollDate);
        BigDecimal totalLoanDeduction = (BigDecimal) loanDetails.get("totalDeduction");
        payrollResult.put("loanDeductions", loanDetails);
        
        // Calculate statutory deductions
        BigDecimal adjustedGross = grossSalary.add(totalBonus);
        Map<String, BigDecimal> statutoryDeductions = calculateStatutoryDeductions(adjustedGross);
        BigDecimal totalStatutoryDeductions = statutoryDeductions.values().stream()
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        payrollResult.put("statutoryDeductions", statutoryDeductions);
        
        // Calculate net salary
        BigDecimal netSalary = adjustedGross.subtract(totalStatutoryDeductions).subtract(totalLoanDeduction);
        payrollResult.put("netSalary", netSalary);
        payrollResult.put("totalEarnings", adjustedGross);
        payrollResult.put("totalDeductions", totalStatutoryDeductions.add(totalLoanDeduction));
        
        return payrollResult;
    }
    
    public Map<String, Object> calculateMonthlyBonuses(Long employeeId, LocalDate payoutMonth) {
        List<EmployeeBonusEntity> bonuses = bonusRepository
            .findByEmployeeIdAndPayoutMonthAndStatusAndIsActive(employeeId, payoutMonth, BonusStatus.APPROVED, true);
        
        Map<String, Object> bonusDetails = new HashMap<>();
        Map<String, BigDecimal> bonusByType = new HashMap<>();
        BigDecimal totalAmount = BigDecimal.ZERO;
        
        for (EmployeeBonusEntity bonus : bonuses) {
            String typeName = bonus.getBonusType().getTypeName();
            bonusByType.put(typeName, bonus.getBonusAmount());
            totalAmount = totalAmount.add(bonus.getBonusAmount());
        }
        
        bonusDetails.put("bonusByType", bonusByType);
        bonusDetails.put("totalAmount", totalAmount);
        bonusDetails.put("count", bonuses.size());
        
        return bonusDetails;
    }
    
    public Map<String, Object> calculateAndProcessLoanDeductions(Long employeeId, LocalDate deductionMonth) {
        List<EmployeeLoanEntity> activeLoans = loanRepository
            .findActiveLoansForDeduction(employeeId, deductionMonth);
        
        Map<String, Object> loanDetails = new HashMap<>();
        Map<String, BigDecimal> deductionsByLoanType = new HashMap<>();
        BigDecimal totalDeduction = BigDecimal.ZERO;
        
        for (EmployeeLoanEntity loan : activeLoans) {
            BigDecimal deductionAmount = calculateLoanDeduction(loan, deductionMonth);
            if (deductionAmount.compareTo(BigDecimal.ZERO) > 0) {
                processLoanDeduction(loan, deductionAmount, deductionMonth);
                
                String loanTypeName = loan.getLoanType().getTypeName();
                deductionsByLoanType.merge(loanTypeName, deductionAmount, BigDecimal::add);
                totalDeduction = totalDeduction.add(deductionAmount);
            }
        }
        
        loanDetails.put("deductionsByType", deductionsByLoanType);
        loanDetails.put("totalDeduction", totalDeduction);
        loanDetails.put("activeLoansCount", activeLoans.size());
        
        return loanDetails;
    }
    
    private BigDecimal calculateLoanDeduction(EmployeeLoanEntity loan, LocalDate deductionMonth) {
        // Check if already deducted for this month
        if (loanDeductionHistoryRepository.existsByLoanIdAndDeductionMonth(loan.getId(), deductionMonth)) {
            return BigDecimal.ZERO;
        }
        
        BigDecimal monthlyDeduction = loan.getMonthlyDeduction();
        BigDecimal outstandingAmount = loan.getOutstandingAmount();
        
        // If outstanding is less than monthly deduction, deduct only outstanding
        return outstandingAmount.min(monthlyDeduction);
    }
    
    private void processLoanDeduction(EmployeeLoanEntity loan, BigDecimal deductionAmount, LocalDate deductionMonth) {
        // Calculate interest and principal
        BigDecimal interestRate = loan.getInterestRate() != null ? 
            loan.getInterestRate().divide(BigDecimal.valueOf(1200), 6, RoundingMode.HALF_UP) : BigDecimal.ZERO;
        
        BigDecimal interestAmount = loan.getOutstandingAmount()
            .multiply(interestRate).setScale(2, RoundingMode.HALF_UP);
        
        BigDecimal principalAmount = deductionAmount.subtract(interestAmount);
        if (principalAmount.compareTo(BigDecimal.ZERO) < 0) {
            principalAmount = deductionAmount;
            interestAmount = BigDecimal.ZERO;
        }
        
        // Update loan
        BigDecimal outstandingBefore = loan.getOutstandingAmount();
        BigDecimal newOutstanding = outstandingBefore.subtract(principalAmount);
        
        loan.setOutstandingAmount(newOutstanding);
        loan.setPaidInstallments(loan.getPaidInstallments() + 1);
        
        if (newOutstanding.compareTo(BigDecimal.ZERO) <= 0) {
            loan.setStatus(LoanStatus.COMPLETED);
            loan.setActualCompletionDate(deductionMonth);
        }
        
        loanRepository.save(loan);
        
        // Create deduction history
        LoanDeductionHistoryEntity history = new LoanDeductionHistoryEntity();
        history.setLoan(loan);
        history.setDeductionMonth(deductionMonth);
        history.setDeductedAmount(deductionAmount);
        history.setPrincipalAmount(principalAmount);
        history.setInterestAmount(interestAmount);
        history.setOutstandingBefore(outstandingBefore);
        history.setOutstandingAfter(newOutstanding);
        history.setInstallmentNumber(loan.getPaidInstallments());
        
        loanDeductionHistoryRepository.save(history);
    }
    
    public Map<String, BigDecimal> calculateStatutoryDeductions(BigDecimal grossSalary) {
        Map<String, BigDecimal> deductions = new HashMap<>();
        
        // PF Calculation (12% of basic salary up to 15,000)
        BigDecimal pfEligibleSalary = grossSalary.min(BigDecimal.valueOf(15000));
        BigDecimal pf = pfEligibleSalary.multiply(BigDecimal.valueOf(0.12)).setScale(2, RoundingMode.HALF_UP);
        deductions.put("PF", pf);
        
        // ESI Calculation (0.75% if gross salary <= 21,000)
        if (grossSalary.compareTo(BigDecimal.valueOf(21000)) <= 0) {
            BigDecimal esi = grossSalary.multiply(BigDecimal.valueOf(0.0075)).setScale(2, RoundingMode.HALF_UP);
            deductions.put("ESI", esi);
        } else {
            deductions.put("ESI", BigDecimal.ZERO);
        }
        
        // Professional Tax
        BigDecimal pt = calculateProfessionalTax(grossSalary);
        deductions.put("PT", pt);
        
        return deductions;
    }
    
    private BigDecimal calculateProfessionalTax(BigDecimal grossSalary) {
        if (grossSalary.compareTo(BigDecimal.valueOf(21000)) <= 0) {
            return BigDecimal.valueOf(175);
        } else {
            return BigDecimal.valueOf(200);
        }
    }
    
    public EmployeeLoanEntity createLoan(EmployeeLoanEntity loan) {
        // Validate loan against loan type constraints
        validateLoanAgainstType(loan);
        
        // Set default values from loan type if not provided
        if (loan.getInterestRate() == null && loan.getLoanType().getDefaultInterestRate() != null) {
            loan.setInterestRate(loan.getLoanType().getDefaultInterestRate());
        }
        
        // Calculate monthly deduction if not provided
        if (loan.getMonthlyDeduction() == null && loan.getTotalInstallments() != null) {
            BigDecimal monthlyDeduction = loan.getLoanAmount()
                .divide(BigDecimal.valueOf(loan.getTotalInstallments()), 2, RoundingMode.HALF_UP);
            loan.setMonthlyDeduction(monthlyDeduction);
        }
        
        // Set expected completion date
        if (loan.getStartDeductionFrom() != null && loan.getTotalInstallments() != null) {
            LocalDate expectedCompletion = loan.getStartDeductionFrom()
                .plusMonths(loan.getTotalInstallments());
            loan.setExpectedCompletionDate(expectedCompletion);
        }
        
        loan.setOutstandingAmount(loan.getLoanAmount());
        loan.setIsActive(true);
        
        return loanRepository.save(loan);
    }
    
    private void validateLoanAgainstType(EmployeeLoanEntity loan) {
        LoanTypeEntity loanType = loan.getLoanType();
        
        // Check maximum amount
        if (loanType.getMaxAmountAllowed() != null && 
            loan.getLoanAmount().compareTo(loanType.getMaxAmountAllowed()) > 0) {
            throw new IllegalArgumentException("Loan amount exceeds maximum allowed for this type: " + 
                loanType.getMaxAmountAllowed());
        }
        
        // Check maximum installments
        if (loanType.getMaxInstallments() != null && loan.getTotalInstallments() != null &&
            loan.getTotalInstallments() > loanType.getMaxInstallments()) {
            throw new IllegalArgumentException("Installments exceed maximum allowed for this type: " + 
                loanType.getMaxInstallments());
        }
        
        // Check maximum outstanding loans
        if (loanType.getMaxOutstandingLoans() != null) {
            Long currentLoans = loanRepository.countActiveLoansForEmployeeAndType(
                loan.getEmployee().getId(), loanType.getId());
            if (currentLoans >= loanType.getMaxOutstandingLoans()) {
                throw new IllegalArgumentException("Maximum outstanding loans exceeded for this type: " + 
                    loanType.getMaxOutstandingLoans());
            }
        }
    }
    
    public EmployeeBonusEntity createBonus(EmployeeBonusEntity bonus) {
        // Calculate bonus amount if percentage-based
        if (bonus.getCalculationBase() != CalculationBase.FIXED_AMOUNT && bonus.getPercentageValue() != null) {
            BigDecimal baseAmount = getBaseAmountForBonus(bonus);
            BigDecimal calculatedAmount = baseAmount.multiply(bonus.getPercentageValue())
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
            bonus.setBonusAmount(calculatedAmount);
        }
        
        // Set taxable status from bonus type if not specified
        if (bonus.getIsTaxable() == null) {
            bonus.setIsTaxable(bonus.getBonusType().getIsTaxable());
        }
        
        bonus.setIsActive(true);
        return bonusRepository.save(bonus);
    }
    
    private BigDecimal getBaseAmountForBonus(EmployeeBonusEntity bonus) {
        EmployeeSalaryEntity salary = employeeSalaryService.getCurrentEmployeeSalary(bonus.getEmployee().getId());
        
        return switch (bonus.getCalculationBase()) {
            case PERCENTAGE_OF_BASIC -> salary.getBasicSalary();
            case PERCENTAGE_OF_GROSS -> salary.getGrossSalary() != null ? salary.getGrossSalary() : salary.getBasicSalary();
            case PERCENTAGE_OF_CTC -> salary.getCtc() != null ? salary.getCtc() : salary.getBasicSalary();
            default -> salary.getBasicSalary();
        };
    }
    
    // New methods for controller integration
    public PayrollSummaryDto calculatePayroll(Long employeeId, int month, int year) {
        YearMonth payrollMonth = YearMonth.of(year, month);
        Map<String, Object> payrollData = calculateComprehensivePayroll(employeeId, payrollMonth);
        
        // Convert to DTO
        PayrollSummaryDto dto = new PayrollSummaryDto(employeeId, "Employee " + employeeId, month, year);
        
        // Set basic salary data
        dto.setBasicSalary(((BigDecimal) payrollData.get("basicSalary")).doubleValue());
        dto.setGrossSalary(((BigDecimal) payrollData.get("grossSalary")).doubleValue());
        dto.setTotalLoanDeductions(((BigDecimal) payrollData.get("totalLoanDeductions")).doubleValue());
        dto.setTotalBonuses(((BigDecimal) payrollData.get("totalBonuses")).doubleValue());
        dto.setNetSalary(((BigDecimal) payrollData.get("netSalary")).doubleValue());
        
        return dto;
    }
    
    public List<PayrollSummaryDto> calculateBulkPayroll(List<Long> employeeIds, int month, int year) {
        List<PayrollSummaryDto> results = new ArrayList<>();
        for (Long employeeId : employeeIds) {
            try {
                PayrollSummaryDto payroll = calculatePayroll(employeeId, month, year);
                results.add(payroll);
            } catch (Exception e) {
                // Log error and continue with next employee
                System.err.println("Error calculating payroll for employee " + employeeId + ": " + e.getMessage());
            }
        }
        return results;
    }
    
    public List<PayrollSummaryDto> calculateAllEmployeesPayroll(int month, int year) {
        // This would need employee repository to get all active employees
        // For now, return empty list - implement when employee repository is available
        return new ArrayList<>();
    }
    
    public void processLoanDeductions(int month, int year) {
        YearMonth payrollMonth = YearMonth.of(year, month);
        LocalDate payrollDate = payrollMonth.atDay(1);
        
        // Get all active loans for deduction
        List<EmployeeLoanEntity> allLoans = loanRepository.findByStatusAndIsActiveTrueOrderByLoanDate(LoanStatus.ACTIVE);
        
        for (EmployeeLoanEntity loan : allLoans) {
            try {
                // Check if loan is due for deduction this month
                if (loan.getMonthlyDeduction() != null && loan.getMonthlyDeduction().compareTo(BigDecimal.ZERO) > 0) {
                    processLoanDeduction(loan, loan.getMonthlyDeduction(), payrollDate);
                }
            } catch (Exception e) {
                System.err.println("Error processing loan deduction for loan " + loan.getId() + ": " + e.getMessage());
            }
        }
    }
    
    public void processBonuses(int month, int year) {
        YearMonth payrollMonth = YearMonth.of(year, month);
        LocalDate payrollDate = payrollMonth.atDay(1);
        
        // Get all approved bonuses for payout
        List<EmployeeBonusEntity> allBonuses = bonusRepository.findByStatusAndIsActiveTrueOrderByEligibleDate(BonusStatus.APPROVED);
        
        for (EmployeeBonusEntity bonus : allBonuses) {
            try {
                // Check if bonus is due for payout this month
                if (bonus.getPayoutMonth() == null || !bonus.getPayoutMonth().isAfter(payrollDate)) {
                    // Mark bonus as processed/paid
                    bonus.setStatus(BonusStatus.PAID);
                    bonus.setPaidDate(LocalDate.now());
                    bonusRepository.save(bonus);
                }
            } catch (Exception e) {
                System.err.println("Error processing bonus for bonus " + bonus.getId() + ": " + e.getMessage());
            }
        }
    }
    
    public PayrollSummaryDto getPayrollSummary(Long employeeId, int month, int year) {
        // For now, this is the same as calculatePayroll
        // In a real system, this might fetch already calculated/stored payroll data
        return calculatePayroll(employeeId, month, year);
    }
}
