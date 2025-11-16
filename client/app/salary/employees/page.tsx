"use client";

import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, User, DollarSign, Calendar, TrendingUp, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmployeeSalary, SalaryStructure } from '@/lib/types';

// Mock data for employee salaries
const mockEmployeeSalaries: EmployeeSalary[] = [
  {
    id: 1,
    employeeId: 1,
    salaryStructure: {
      id: 1,
      structureName: 'Software Engineer Grade 1',
      description: 'Entry level software engineer salary structure',
      effectiveDate: '2024-01-01',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    basicSalary: 25000,
    grossSalary: 45000,
    ctc: 540000,
    effectiveDate: '2024-01-01',
    isActive: true,
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-01T09:00:00Z'
  },
  {
    id: 2,
    employeeId: 2,
    salaryStructure: {
      id: 2,
      structureName: 'Software Engineer Grade 2',
      description: 'Mid-level software engineer salary structure',
      effectiveDate: '2024-01-01',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    basicSalary: 35000,
    grossSalary: 62000,
    ctc: 744000,
    effectiveDate: '2022-11-01',
    isActive: true,
    createdAt: '2022-11-01T09:00:00Z',
    updatedAt: '2022-11-01T09:00:00Z'
  },
  {
    id: 3,
    employeeId: 3,
    salaryStructure: {
      id: 3,
      structureName: 'Tech Lead',
      description: 'Technical lead salary structure',
      effectiveDate: '2024-01-01',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    basicSalary: 50000,
    grossSalary: 85000,
    ctc: 1020000,
    effectiveDate: '2021-06-15',
    isActive: true,
    createdAt: '2021-06-15T09:00:00Z',
    updatedAt: '2021-06-15T09:00:00Z'
  },
  {
    id: 4,
    employeeId: 4,
    salaryStructure: {
      id: 4,
      structureName: 'HR Manager',
      description: 'HR manager salary structure',
      effectiveDate: '2024-01-01',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    basicSalary: 45000,
    grossSalary: 78000,
    ctc: 936000,
    effectiveDate: '2023-03-01',
    isActive: true,
    createdAt: '2023-03-01T09:00:00Z',
    updatedAt: '2023-03-01T09:00:00Z'
  },
  {
    id: 5,
    employeeId: 5,
    salaryStructure: {
      id: 5,
      structureName: 'Finance Manager',
      description: 'Finance manager salary structure',
      effectiveDate: '2024-01-01',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    basicSalary: 48000,
    grossSalary: 82000,
    ctc: 984000,
    effectiveDate: '2022-08-10',
    isActive: true,
    createdAt: '2022-08-10T09:00:00Z',
    updatedAt: '2022-08-10T09:00:00Z'
  }
];

// Mock salary structures for dropdown
const mockSalaryStructures: SalaryStructure[] = [
  {
    id: 1,
    structureName: 'Software Engineer Grade 1',
    description: 'Entry level software engineer salary structure',
    effectiveDate: '2024-01-01',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    structureName: 'Software Engineer Grade 2',
    description: 'Mid-level software engineer salary structure',
    effectiveDate: '2024-01-01',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    structureName: 'Tech Lead',
    description: 'Technical lead salary structure',
    effectiveDate: '2024-01-01',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    structureName: 'HR Manager',
    description: 'HR manager salary structure',
    effectiveDate: '2024-01-01',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    structureName: 'Finance Manager',
    description: 'Finance manager salary structure',
    effectiveDate: '2024-01-01',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export default function EmployeeSalariesPage() {
  const [salaries, setSalaries] = useState<EmployeeSalary[]>(mockEmployeeSalaries);
  const [searchTerm, setSearchTerm] = useState('');
  const [structureFilter, setStructureFilter] = useState<string>('all');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState<EmployeeSalary | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    employeeId: '',
    salaryStructureId: '',
    basicSalary: '',
    grossSalary: '',
    ctc: '',
    effectiveDate: '',
    endDate: ''
  });

  const resetForm = () => {
    setFormData({
      employeeId: '',
      salaryStructureId: '',
      basicSalary: '',
      grossSalary: '',
      ctc: '',
      effectiveDate: '',
      endDate: ''
    });
  };

  const filteredSalaries = salaries.filter(salary => {
    const matchesSearch = salary.employeeId.toString().includes(searchTerm) ||
      salary.salaryStructure.structureName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStructure = structureFilter === 'all' || salary.salaryStructure.id.toString() === structureFilter;
    
    return matchesSearch && matchesStructure;
  });

  const handleAssignSalary = () => {
    // TODO: Implement API call
    console.log('Assigning salary:', formData);
    setIsAssignDialogOpen(false);
    resetForm();
  };

  const handleEditSalary = () => {
    if (!selectedSalary) return;
    // TODO: Implement API call
    console.log('Updating salary:', selectedSalary.id, formData);
    setIsEditDialogOpen(false);
    setSelectedSalary(null);
    resetForm();
  };

  const handleDeleteSalary = (salaryId: number) => {
    if (confirm('Are you sure you want to deactivate this salary assignment?')) {
      setSalaries(salaries.filter(sal => sal.id !== salaryId));
    }
  };

  const openEditDialog = (salary: EmployeeSalary) => {
    setSelectedSalary(salary);
    setFormData({
      employeeId: salary.employeeId.toString(),
      salaryStructureId: salary.salaryStructure.id.toString(),
      basicSalary: salary.basicSalary.toString(),
      grossSalary: salary.grossSalary?.toString() || '',
      ctc: salary.ctc?.toString() || '',
      effectiveDate: salary.effectiveDate,
      endDate: salary.endDate || ''
    });
    setIsEditDialogOpen(true);
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

  // Get unique structures for filter
  const structures = [...new Set(salaries.map(sal => sal.salaryStructure))];

  const SalaryForm = ({ isEdit = false }: { isEdit?: boolean }) => (
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
          <Label htmlFor="salaryStructure">Salary Structure</Label>
          <Select
            value={formData.salaryStructureId}
            onValueChange={(value) => setFormData({ ...formData, salaryStructureId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select salary structure" />
            </SelectTrigger>
            <SelectContent>
              {mockSalaryStructures.map((structure) => (
                <SelectItem key={structure.id} value={structure.id.toString()}>
                  {structure.structureName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="basicSalary">Basic Salary (₹)</Label>
          <Input
            id="basicSalary"
            type="number"
            placeholder="Enter basic salary"
            value={formData.basicSalary}
            onChange={(e) => setFormData({ ...formData, basicSalary: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="grossSalary">Gross Salary (₹)</Label>
          <Input
            id="grossSalary"
            type="number"
            placeholder="Enter gross salary"
            value={formData.grossSalary}
            onChange={(e) => setFormData({ ...formData, grossSalary: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="ctc">CTC (₹)</Label>
          <Input
            id="ctc"
            type="number"
            placeholder="Enter CTC"
            value={formData.ctc}
            onChange={(e) => setFormData({ ...formData, ctc: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="effectiveDate">Effective Date</Label>
          <Input
            id="effectiveDate"
            type="date"
            value={formData.effectiveDate}
            onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endDate">End Date (Optional)</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Salaries</h1>
          <p className="text-muted-foreground">
            Manage salary assignments and track employee compensation history
          </p>
        </div>
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="mr-2 h-4 w-4" />
              Assign Salary
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Assign Salary to Employee</DialogTitle>
              <DialogDescription>
                Assign a salary structure to an employee with specific compensation details.
              </DialogDescription>
            </DialogHeader>
            <SalaryForm />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAssignSalary}>Assign Salary</Button>
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
                  placeholder="Search by employee ID or salary structure..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={structureFilter} onValueChange={setStructureFilter}>
              <SelectTrigger className="w-64">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by structure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Structures</SelectItem>
                {structures.map((structure) => (
                  <SelectItem key={structure.id} value={structure.id.toString()}>
                    {structure.structureName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salaries.length}</div>
            <p className="text-xs text-muted-foreground">
              Active salary assignments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Basic</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                salaries.reduce((sum, sal) => sum + sal.basicSalary, 0) / salaries.length
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Average basic salary
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average CTC</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                salaries.reduce((sum, sal) => sum + (sal.ctc || 0), 0) / salaries.length
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Average annual CTC
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                salaries.reduce((sum, sal) => sum + (sal.grossSalary || 0), 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Monthly gross payroll
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Salaries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Salary Assignments</CardTitle>
          <CardDescription>
            Current salary assignments for all employees with their compensation details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Salary Structure</TableHead>
                <TableHead>Basic Salary</TableHead>
                <TableHead>Gross Salary</TableHead>
                <TableHead>Annual CTC</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSalaries.map((salary) => (
                <TableRow key={salary.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Employee #{salary.employeeId}</div>
                        <div className="text-sm text-muted-foreground">ID: {salary.employeeId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{salary.salaryStructure.structureName}</div>
                      <div className="text-sm text-muted-foreground">
                        {salary.salaryStructure.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{formatCurrency(salary.basicSalary)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {salary.grossSalary ? formatCurrency(salary.grossSalary) : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {salary.ctc ? formatCurrency(salary.ctc) : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {formatDate(salary.effectiveDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log('View salary history:', salary.employeeId)}
                        title="View salary history"
                      >
                        <History className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log('View salary details:', salary.id)}
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(salary)}
                        title="Edit salary"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSalary(salary.id)}
                        title="Deactivate salary"
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
            <DialogTitle>Edit Salary Assignment</DialogTitle>
            <DialogDescription>
              Update the salary assignment details for this employee.
            </DialogDescription>
          </DialogHeader>
          <SalaryForm isEdit />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSalary}>Update Salary</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
