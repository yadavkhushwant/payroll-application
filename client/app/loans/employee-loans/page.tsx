"use client";

import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Calendar, DollarSign, User, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { EmployeeLoan, LoanType } from '@/lib/types';

// Mock data for employee loans
const mockEmployeeLoans: EmployeeLoan[] = [
  {
    id: 1,
    employeeId: 1001,
    loanType: {
      id: 1,
      loanTypeName: 'Personal Loan',
      loanTypeCode: 'PL',
      description: 'Personal loan for employees',
      maxLoanAmount: 500000,
      maxInstallments: 60,
      interestRate: 12.5,
      processingFee: 1000,
      isAdvanceType: false,
      requiresApproval: true,
      minServiceMonths: 12,
      maxLoanPercentage: 80,
      isActive: true,
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z'
    },
    loanAmount: 250000,
    interestRate: 12.5,
    numberOfInstallments: 36,
    installmentAmount: 8333.33,
    outstandingAmount: 180000,
    startDeductionFrom: '2024-02-01',
    status: 'ACTIVE',
    applicationDate: '2024-01-15T09:00:00Z',
    approvalDate: '2024-01-20T14:30:00Z',
    disbursementDate: '2024-01-25T11:00:00Z',
    purpose: 'Home renovation',
    guarantorName: 'John Smith',
    guarantorEmployeeId: 1002,
    isActive: true,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-25T11:00:00Z'
  },
  {
    id: 2,
    employeeId: 1003,
    loanType: {
      id: 2,
      loanTypeName: 'Emergency Loan',
      loanTypeCode: 'EL',
      description: 'Emergency loan for urgent needs',
      maxLoanAmount: 100000,
      maxInstallments: 24,
      interestRate: 10.0,
      processingFee: 500,
      isAdvanceType: false,
      requiresApproval: true,
      minServiceMonths: 6,
      maxLoanPercentage: 60,
      isActive: true,
      createdAt: '2024-01-10T08:00:00Z',
      updatedAt: '2024-01-10T08:00:00Z'
    },
    loanAmount: 75000,
    interestRate: 10.0,
    numberOfInstallments: 18,
    installmentAmount: 4722.22,
    outstandingAmount: 75000,
    startDeductionFrom: '2024-03-01',
    status: 'PENDING_APPROVAL',
    applicationDate: '2024-02-10T10:00:00Z',
    purpose: 'Medical emergency',
    guarantorName: 'Jane Doe',
    guarantorEmployeeId: 1004,
    isActive: true,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  },
  {
    id: 3,
    employeeId: 1005,
    loanType: {
      id: 3,
      loanTypeName: 'Salary Advance',
      loanTypeCode: 'SA',
      description: 'Advance against salary',
      maxLoanAmount: 50000,
      maxInstallments: 6,
      interestRate: 0.0,
      processingFee: 0,
      isAdvanceType: true,
      requiresApproval: false,
      minServiceMonths: 3,
      maxLoanPercentage: 50,
      isActive: true,
      createdAt: '2024-01-05T07:00:00Z',
      updatedAt: '2024-01-05T07:00:00Z'
    },
    loanAmount: 30000,
    interestRate: 0.0,
    numberOfInstallments: 3,
    installmentAmount: 10000,
    outstandingAmount: 10000,
    startDeductionFrom: '2024-02-01',
    status: 'ACTIVE',
    applicationDate: '2024-01-28T09:00:00Z',
    approvalDate: '2024-01-28T09:00:00Z',
    disbursementDate: '2024-01-30T15:00:00Z',
    purpose: 'Salary advance',
    isActive: true,
    createdAt: '2024-01-28T09:00:00Z',
    updatedAt: '2024-01-30T15:00:00Z'
  }
];

// Mock loan types for dropdown
const mockLoanTypes: LoanType[] = [
  {
    id: 1,
    loanTypeName: 'Personal Loan',
    loanTypeCode: 'PL',
    description: 'Personal loan for employees',
    maxLoanAmount: 500000,
    maxInstallments: 60,
    interestRate: 12.5,
    processingFee: 1000,
    isAdvanceType: false,
    requiresApproval: true,
    minServiceMonths: 12,
    maxLoanPercentage: 80,
    isActive: true,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z'
  },
  {
    id: 2,
    loanTypeName: 'Emergency Loan',
    loanTypeCode: 'EL',
    description: 'Emergency loan for urgent needs',
    maxLoanAmount: 100000,
    maxInstallments: 24,
    interestRate: 10.0,
    processingFee: 500,
    isAdvanceType: false,
    requiresApproval: true,
    minServiceMonths: 6,
    maxLoanPercentage: 60,
    isActive: true,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z'
  },
  {
    id: 3,
    loanTypeName: 'Salary Advance',
    loanTypeCode: 'SA',
    description: 'Advance against salary',
    maxLoanAmount: 50000,
    maxInstallments: 6,
    interestRate: 0.0,
    processingFee: 0,
    isAdvanceType: true,
    requiresApproval: false,
    minServiceMonths: 3,
    maxLoanPercentage: 50,
    isActive: true,
    createdAt: '2024-01-05T07:00:00Z',
    updatedAt: '2024-01-05T07:00:00Z'
  }
];

export default function EmployeeLoansPage() {
  const [loans, setLoans] = useState<EmployeeLoan[]>(mockEmployeeLoans);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<EmployeeLoan | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    employeeId: '',
    loanTypeId: '',
    loanAmount: '',
    numberOfInstallments: '',
    startDeductionFrom: '',
    purpose: '',
    guarantorName: '',
    guarantorEmployeeId: ''
  });

  const resetForm = () => {
    setFormData({
      employeeId: '',
      loanTypeId: '',
      loanAmount: '',
      numberOfInstallments: '',
      startDeductionFrom: '',
      purpose: '',
      guarantorName: '',
      guarantorEmployeeId: ''
    });
  };

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.employeeId.toString().includes(searchTerm) ||
      loan.loanType.loanTypeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.purpose?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.guarantorName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateLoan = () => {
    // TODO: Implement API call
    console.log('Creating loan:', formData);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEditLoan = () => {
    if (!selectedLoan) return;
    // TODO: Implement API call
    console.log('Updating loan:', selectedLoan.id, formData);
    setIsEditDialogOpen(false);
    setSelectedLoan(null);
    resetForm();
  };

  const handleDeleteLoan = (loanId: number) => {
    if (confirm('Are you sure you want to delete this loan?')) {
      setLoans(loans.filter(loan => loan.id !== loanId));
    }
  };

  const openEditDialog = (loan: EmployeeLoan) => {
    setSelectedLoan(loan);
    setFormData({
      employeeId: loan.employeeId.toString(),
      loanTypeId: loan.loanType.id.toString(),
      loanAmount: loan.loanAmount.toString(),
      numberOfInstallments: loan.numberOfInstallments.toString(),
      startDeductionFrom: loan.startDeductionFrom,
      purpose: loan.purpose || '',
      guarantorName: loan.guarantorName || '',
      guarantorEmployeeId: loan.guarantorEmployeeId?.toString() || ''
    });
    setIsEditDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'PENDING_APPROVAL': { label: 'Pending Approval', variant: 'secondary' as const, icon: Clock },
      'APPROVED': { label: 'Approved', variant: 'default' as const, icon: CheckCircle },
      'ACTIVE': { label: 'Active', variant: 'default' as const, icon: CheckCircle },
      'COMPLETED': { label: 'Completed', variant: 'outline' as const, icon: CheckCircle },
      'CANCELLED': { label: 'Cancelled', variant: 'destructive' as const, icon: XCircle },
      'DEFAULTED': { label: 'Defaulted', variant: 'destructive' as const, icon: XCircle },
      'REJECTED': { label: 'Rejected', variant: 'destructive' as const, icon: XCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'outline' as const, icon: Clock };
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const LoanForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="employeeId">Employee ID</Label>
          <Input
            id="employeeId"
            type="number"
            placeholder="Enter employee ID"
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="loanType">Loan Type</Label>
          <Select
            value={formData.loanTypeId}
            onValueChange={(value) => setFormData({ ...formData, loanTypeId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select loan type" />
            </SelectTrigger>
            <SelectContent>
              {mockLoanTypes.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.loanTypeName} ({type.loanTypeCode})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
          <Input
            id="loanAmount"
            type="number"
            placeholder="Enter loan amount"
            value={formData.loanAmount}
            onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="installments">Number of Installments</Label>
          <Input
            id="installments"
            type="number"
            placeholder="Enter number of installments"
            value={formData.numberOfInstallments}
            onChange={(e) => setFormData({ ...formData, numberOfInstallments: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="startDate">Start Deduction From</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDeductionFrom}
            onChange={(e) => setFormData({ ...formData, startDeductionFrom: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="guarantorEmployeeId">Guarantor Employee ID</Label>
          <Input
            id="guarantorEmployeeId"
            type="number"
            placeholder="Enter guarantor employee ID"
            value={formData.guarantorEmployeeId}
            onChange={(e) => setFormData({ ...formData, guarantorEmployeeId: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="guarantorName">Guarantor Name</Label>
        <Input
          id="guarantorName"
          placeholder="Enter guarantor name"
          value={formData.guarantorName}
          onChange={(e) => setFormData({ ...formData, guarantorName: e.target.value })}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="purpose">Purpose</Label>
        <Textarea
          id="purpose"
          placeholder="Enter loan purpose"
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Loans</h1>
          <p className="text-muted-foreground">
            Manage employee loan applications and disbursements
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="mr-2 h-4 w-4" />
              New Loan Application
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Loan Application</DialogTitle>
              <DialogDescription>
                Add a new loan application for an employee.
              </DialogDescription>
            </DialogHeader>
            <LoanForm />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateLoan}>Create Loan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by employee ID, loan type, purpose, or guarantor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="PENDING_APPROVAL">Pending Approval</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="DEFAULTED">Defaulted</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loans.length}</div>
            <p className="text-xs text-muted-foreground">
              All loan applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loans.filter(loan => loan.status === 'ACTIVE').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently active loans
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loans.filter(loan => loan.status === 'PENDING_APPROVAL').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                loans
                  .filter(loan => loan.status === 'ACTIVE')
                  .reduce((sum, loan) => sum + loan.outstandingAmount, 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Total outstanding amount
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Loans Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Loans</CardTitle>
          <CardDescription>
            A list of all employee loan applications and their current status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Installments</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Application Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLoans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {loan.employeeId}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{loan.loanType.loanTypeName}</div>
                      <div className="text-sm text-muted-foreground">{loan.loanType.loanTypeCode}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{formatCurrency(loan.loanAmount)}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(loan.installmentAmount)}/month
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{loan.numberOfInstallments}</div>
                      <div className="text-sm text-muted-foreground">
                        {loan.interestRate}% interest
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{formatCurrency(loan.outstandingAmount)}</div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(loan.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {formatDate(loan.applicationDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log('View loan details:', loan.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(loan)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteLoan(loan.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Loan Application</DialogTitle>
            <DialogDescription>
              Update the loan application details.
            </DialogDescription>
          </DialogHeader>
          <LoanForm isEdit />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditLoan}>Update Loan</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
