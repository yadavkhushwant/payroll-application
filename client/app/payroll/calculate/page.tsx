"use client";

import { useState } from 'react';
import { Calculator, Users, Play, Download, Eye, Calendar, DollarSign, TrendingUp, TrendingDown, FileText, Clock, CheckCircle, AlertCircle, CreditCard, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PayrollSummary, PayrollComponent } from '@/lib/types';
import { useCalculatePayroll, useCalculateBulkPayroll, useProcessLoanDeductions, useProcessBonuses } from '@/lib/hooks/usePayroll';

// Mock payroll data for demonstration
const mockPayrollSummary: PayrollSummary = {
  employeeId: 1,
  payrollMonth: 'JANUARY',
  payrollYear: 2024,
  basicSalary: 25000,
  grossSalary: 45000,
  totalEarnings: 46850,
  totalDeductions: 8175,
  netSalary: 38675,
  earnings: [
    {
      componentId: 1,
      componentName: 'Basic Salary',
      componentCode: 'BASIC',
      componentType: 'EARNING',
      calculationMethod: 'FIXED',
      value: 25000,
      calculatedAmount: 25000,
      isStatutory: false
    },
    {
      componentId: 2,
      componentName: 'House Rent Allowance',
      componentCode: 'HRA',
      componentType: 'EARNING',
      calculationMethod: 'PERCENTAGE_OF_BASIC',
      value: 50,
      calculatedAmount: 12500,
      isStatutory: false
    },
    {
      componentId: 3,
      componentName: 'Medical Allowance',
      componentCode: 'MEDICAL',
      componentType: 'EARNING',
      calculationMethod: 'FIXED',
      value: 1250,
      calculatedAmount: 1250,
      isStatutory: false
    },
    {
      componentId: 4,
      componentName: 'Transport Allowance',
      componentCode: 'TRANSPORT',
      componentType: 'EARNING',
      calculationMethod: 'FIXED',
      value: 1600,
      calculatedAmount: 1600,
      isStatutory: false
    },
    {
      componentId: 8,
      componentName: 'Performance Bonus',
      componentCode: 'PERF_BONUS',
      componentType: 'EARNING',
      calculationMethod: 'FIXED',
      value: 5000,
      calculatedAmount: 5000,
      isStatutory: false
    }
  ],
  deductions: [
    {
      componentId: 5,
      componentName: 'Provident Fund',
      componentCode: 'PF',
      componentType: 'DEDUCTION',
      calculationMethod: 'PERCENTAGE_OF_BASIC',
      value: 12,
      calculatedAmount: 3000,
      isStatutory: true
    },
    {
      componentId: 6,
      componentName: 'Employee State Insurance',
      componentCode: 'ESI',
      componentType: 'DEDUCTION',
      calculationMethod: 'PERCENTAGE_OF_GROSS',
      value: 0.75,
      calculatedAmount: 337.5,
      isStatutory: true
    },
    {
      componentId: 7,
      componentName: 'Professional Tax',
      componentCode: 'PT',
      componentType: 'DEDUCTION',
      calculationMethod: 'FIXED',
      value: 200,
      calculatedAmount: 200,
      isStatutory: true
    },
    {
      componentId: 9,
      componentName: 'Income Tax',
      componentCode: 'IT',
      componentType: 'DEDUCTION',
      calculationMethod: 'PERCENTAGE_OF_GROSS',
      value: 10,
      calculatedAmount: 4500,
      isStatutory: true
    }
  ],
  loanDeductions: [
    {
      loanId: 1,
      loanType: 'Personal Loan',
      installmentAmount: 8333.33,
      remainingInstallments: 24,
      totalLoanAmount: 250000,
      outstandingAmount: 180000,
      deductionAmount: 8333.33,
      remainingBalance: 180000
    }
  ],
  bonusPayments: [
    {
      bonusId: 1,
      bonusType: 'Performance Bonus',
      bonusAmount: 5000,
      bonusPeriod: 'Q4 2023',
      payoutMonth: 'JANUARY'
    }
  ],
  attendanceDetails: {
    totalWorkingDays: 22,
    actualWorkingDays: 22,
    presentDays: 20,
    absentDays: 2,
    holidayDays: 8,
    overtimeHours: 10
  },
  calculatedOn: '2024-01-31T23:59:59Z'
};

const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

export default function PayrollCalculatePage() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [calculationResults, setCalculationResults] = useState<PayrollSummary | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [bulkEmployeeIds, setBulkEmployeeIds] = useState<string>('');

  const calculatePayrollMutation = useCalculatePayroll();
  const calculateBulkPayrollMutation = useCalculateBulkPayroll();
  const processLoanDeductionsMutation = useProcessLoanDeductions();
  const processBonusesMutation = useProcessBonuses();

  const handleSingleCalculation = async () => {
    if (!selectedEmployeeId || !selectedMonth || !selectedYear) {
      alert('Please select employee, month, and year');
      return;
    }

    setIsCalculating(true);
    try {
      // For demo purposes, using mock data
      // In real implementation, uncomment the line below:
      // const result = await calculatePayrollMutation.mutateAsync({
      //   employeeId: parseInt(selectedEmployeeId),
      //   month: parseInt(selectedMonth),
      //   year: parseInt(selectedYear)
      // });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCalculationResults(mockPayrollSummary);
      
    } catch (error) {
      console.error('Calculation failed:', error);
      alert('Payroll calculation failed');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleBulkCalculation = async () => {
    if (!selectedMonth || !selectedYear) {
      alert('Please select month and year');
      return;
    }

    setIsCalculating(true);
    try {
      const employeeIds = bulkEmployeeIds
        ? bulkEmployeeIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
        : undefined;

      // For demo purposes, using mock data
      // In real implementation, uncomment the line below:
      // const results = await calculateBulkPayrollMutation.mutateAsync({
      //   month: parseInt(selectedMonth),
      //   year: parseInt(selectedYear),
      //   employeeIds
      // });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert(`Bulk payroll calculation completed for ${employeeIds?.length || 'all'} employees`);
      
    } catch (error) {
      console.error('Bulk calculation failed:', error);
      alert('Bulk payroll calculation failed');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleProcessLoanDeductions = async () => {
    if (!selectedMonth || !selectedYear) {
      alert('Please select month and year');
      return;
    }

    try {
      // For demo purposes, showing success message
      // In real implementation, uncomment the line below:
      // await processLoanDeductionsMutation.mutateAsync({
      //   month: parseInt(selectedMonth),
      //   year: parseInt(selectedYear)
      // });
      
      alert('Loan deductions processed successfully');
    } catch (error) {
      console.error('Loan deduction processing failed:', error);
      alert('Failed to process loan deductions');
    }
  };

  const handleProcessBonuses = async () => {
    if (!selectedMonth || !selectedYear) {
      alert('Please select month and year');
      return;
    }

    try {
      // For demo purposes, showing success message
      // In real implementation, uncomment the line below:
      // await processBonusesMutation.mutateAsync({
      //   month: parseInt(selectedMonth),
      //   year: parseInt(selectedYear)
      // });
      
      alert('Bonuses processed successfully');
    } catch (error) {
      console.error('Bonus processing failed:', error);
      alert('Failed to process bonuses');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getComponentBadge = (component: PayrollComponent) => {
    if (component.componentType === 'EARNING') {
      return <Badge variant="default" className="flex items-center gap-1">
        <TrendingUp className="h-3 w-3" />
        Earning
      </Badge>;
    } else {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <TrendingDown className="h-3 w-3" />
        Deduction
      </Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll Calculator</h1>
          <p className="text-muted-foreground">
            Calculate payroll for individual employees or process bulk payroll operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleProcessLoanDeductions}
            disabled={!selectedMonth || !selectedYear}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Process Loans
          </Button>
          <Button
            variant="outline"
            onClick={handleProcessBonuses}
            disabled={!selectedMonth || !selectedYear}
          >
            <Gift className="mr-2 h-4 w-4" />
            Process Bonuses
          </Button>
        </div>
      </div>

      {/* Calculation Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Calculation</CardTitle>
          <CardDescription>
            Calculate payroll for individual employees or process bulk calculations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="single" className="space-y-4">
            <TabsList>
              <TabsTrigger value="single">Single Employee</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Processing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single" className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    type="number"
                    placeholder="Enter employee ID"
                    value={selectedEmployeeId}
                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="month">Month</Label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value.toString()}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="year">Year</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>&nbsp;</Label>
                  <Button 
                    onClick={handleSingleCalculation}
                    disabled={isCalculating || !selectedEmployeeId || !selectedMonth || !selectedYear}
                    className="w-full"
                  >
                    {isCalculating ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-4 w-4" />
                        Calculate
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bulk" className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="employeeIds">Employee IDs (Optional)</Label>
                  <Input
                    id="employeeIds"
                    placeholder="1,2,3 or leave blank for all"
                    value={bulkEmployeeIds}
                    onChange={(e) => setBulkEmployeeIds(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bulkMonth">Month</Label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value.toString()}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bulkYear">Year</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>&nbsp;</Label>
                  <Button 
                    onClick={handleBulkCalculation}
                    disabled={isCalculating || !selectedMonth || !selectedYear}
                    className="w-full"
                  >
                    {isCalculating ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Users className="mr-2 h-4 w-4" />
                        Bulk Calculate
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Calculation Results */}
      {calculationResults && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gross Salary</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(calculationResults.grossSalary)}</div>
                <p className="text-xs text-muted-foreground">
                  Basic: {formatCurrency(calculationResults.basicSalary)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(calculationResults.totalEarnings)}</div>
                <p className="text-xs text-muted-foreground">
                  {calculationResults.earnings.length} components
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{formatCurrency(calculationResults.totalDeductions)}</div>
                <p className="text-xs text-muted-foreground">
                  {calculationResults.deductions.length} components
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Salary</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(calculationResults.netSalary)}</div>
                <p className="text-xs text-muted-foreground">
                  Final take-home amount
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Earnings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Earnings Breakdown
                </CardTitle>
                <CardDescription>
                  Detailed breakdown of all earning components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculationResults.earnings.map((earning) => (
                      <TableRow key={earning.componentId}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{earning.componentName}</div>
                            <div className="text-sm text-muted-foreground">{earning.componentCode}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{earning.calculationMethod.replace('_', ' ')}</Badge>
                        </TableCell>
                        <TableCell>
                          {earning.calculationMethod === 'FIXED' 
                            ? formatCurrency(earning.value)
                            : `${earning.value}%`
                          }
                        </TableCell>
                        <TableCell className="font-medium text-green-600">
                          {formatCurrency(earning.calculatedAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Deductions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                  Deductions Breakdown
                </CardTitle>
                <CardDescription>
                  Detailed breakdown of all deduction components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculationResults.deductions.map((deduction) => (
                      <TableRow key={deduction.componentId}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{deduction.componentName}</div>
                            <div className="text-sm text-muted-foreground">
                              {deduction.componentCode}
                              {deduction.isStatutory && (
                                <Badge variant="secondary" className="ml-1 text-xs">Statutory</Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{deduction.calculationMethod.replace('_', ' ')}</Badge>
                        </TableCell>
                        <TableCell>
                          {deduction.calculationMethod === 'FIXED' 
                            ? formatCurrency(deduction.value)
                            : `${deduction.value}%`
                          }
                        </TableCell>
                        <TableCell className="font-medium text-red-600">
                          {formatCurrency(deduction.calculatedAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Loan Deductions */}
            {calculationResults.loanDeductions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Loan Deductions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Loan Type</TableHead>
                        <TableHead>Installment</TableHead>
                        <TableHead>Remaining</TableHead>
                        <TableHead>Outstanding</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calculationResults.loanDeductions.map((loan) => (
                        <TableRow key={loan.loanId}>
                          <TableCell className="font-medium">{loan.loanType}</TableCell>
                          <TableCell>{formatCurrency(loan.installmentAmount)}</TableCell>
                          <TableCell>{loan.remainingInstallments}</TableCell>
                          <TableCell>{formatCurrency(loan.outstandingAmount)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Bonus Payments */}
            {calculationResults.bonusPayments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Bonus Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bonus Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Payout</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calculationResults.bonusPayments.map((bonus) => (
                        <TableRow key={bonus.bonusId}>
                          <TableCell className="font-medium">{bonus.bonusType}</TableCell>
                          <TableCell>{formatCurrency(bonus.bonusAmount)}</TableCell>
                          <TableCell>{bonus.bonusPeriod}</TableCell>
                          <TableCell>{bonus.payoutMonth}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Attendance Details */}
          {calculationResults.attendanceDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Attendance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{calculationResults.attendanceDetails.totalWorkingDays}</div>
                    <div className="text-sm text-muted-foreground">Working Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{calculationResults.attendanceDetails.presentDays}</div>
                    <div className="text-sm text-muted-foreground">Present</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{calculationResults.attendanceDetails.absentDays}</div>
                    <div className="text-sm text-muted-foreground">Absent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{calculationResults.attendanceDetails.holidayDays}</div>
                    <div className="text-sm text-muted-foreground">Holidays</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{calculationResults.attendanceDetails.overtimeHours}</div>
                    <div className="text-sm text-muted-foreground">OT Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{calculationResults.attendanceDetails.actualWorkingDays}</div>
                    <div className="text-sm text-muted-foreground">Actual Days</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Payslip
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
