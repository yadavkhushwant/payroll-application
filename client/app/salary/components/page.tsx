"use client";

import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Calculator, TrendingUp, TrendingDown, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SalaryComponent } from '@/lib/types';
import { useSalaryComponents, useCreateSalaryComponent, useUpdateSalaryComponent, useDeactivateSalaryComponent } from '@/lib/hooks/useSalary';

// Mock data for salary components (until backend is connected)
const mockSalaryComponents: SalaryComponent[] = [
  {
    id: 1,
    componentName: 'Basic Salary',
    componentCode: 'BASIC',
    componentType: 'EARNING',
    calculationMethod: 'FIXED',
    value: 0,
    isStatutory: false,
    isTaxable: true,
    isActive: true,
    displayOrder: 1,
    description: 'Basic salary component',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    componentName: 'House Rent Allowance',
    componentCode: 'HRA',
    componentType: 'EARNING',
    calculationMethod: 'PERCENTAGE_OF_BASIC',
    value: 50,
    isStatutory: false,
    isTaxable: true,
    isActive: true,
    displayOrder: 2,
    description: 'House rent allowance - 50% of basic salary',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    componentName: 'Medical Allowance',
    componentCode: 'MEDICAL',
    componentType: 'EARNING',
    calculationMethod: 'FIXED',
    value: 1250,
    isStatutory: false,
    isTaxable: true,
    isActive: true,
    displayOrder: 3,
    description: 'Medical allowance',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    componentName: 'Transport Allowance',
    componentCode: 'TRANSPORT',
    componentType: 'EARNING',
    calculationMethod: 'FIXED',
    value: 1600,
    isStatutory: false,
    isTaxable: false,
    isActive: true,
    displayOrder: 4,
    description: 'Transport allowance',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    componentName: 'Provident Fund',
    componentCode: 'PF',
    componentType: 'DEDUCTION',
    calculationMethod: 'PERCENTAGE_OF_BASIC',
    value: 12,
    isStatutory: true,
    isTaxable: false,
    isActive: true,
    displayOrder: 1,
    description: 'Employee Provident Fund - 12% of basic salary',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 6,
    componentName: 'Employee State Insurance',
    componentCode: 'ESI',
    componentType: 'DEDUCTION',
    calculationMethod: 'PERCENTAGE_OF_GROSS',
    value: 0.75,
    isStatutory: true,
    isTaxable: false,
    isActive: true,
    displayOrder: 2,
    description: 'Employee State Insurance - 0.75% of gross salary',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 7,
    componentName: 'Professional Tax',
    componentCode: 'PT',
    componentType: 'DEDUCTION',
    calculationMethod: 'FIXED',
    value: 200,
    isStatutory: true,
    isTaxable: false,
    isActive: true,
    displayOrder: 3,
    description: 'Professional tax',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 8,
    componentName: 'Income Tax',
    componentCode: 'IT',
    componentType: 'DEDUCTION',
    calculationMethod: 'PERCENTAGE_OF_GROSS',
    value: 10,
    isStatutory: true,
    isTaxable: false,
    isActive: true,
    displayOrder: 4,
    description: 'Income tax deduction',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export default function SalaryComponentsPage() {
  const [components, setComponents] = useState<SalaryComponent[]>(mockSalaryComponents);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<SalaryComponent | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    componentName: '',
    componentCode: '',
    componentType: '',
    calculationMethod: '',
    value: '',
    isStatutory: false,
    isTaxable: true,
    displayOrder: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      componentName: '',
      componentCode: '',
      componentType: '',
      calculationMethod: '',
      value: '',
      isStatutory: false,
      isTaxable: true,
      displayOrder: '',
      description: ''
    });
  };

  const filteredComponents = components.filter(component => {
    const matchesSearch = component.componentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.componentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || component.componentType === typeFilter;
    const matchesMethod = methodFilter === 'all' || component.calculationMethod === methodFilter;
    
    return matchesSearch && matchesType && matchesMethod;
  });

  const handleCreateComponent = () => {
    // TODO: Implement API call
    console.log('Creating component:', formData);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEditComponent = () => {
    if (!selectedComponent) return;
    // TODO: Implement API call
    console.log('Updating component:', selectedComponent.id, formData);
    setIsEditDialogOpen(false);
    setSelectedComponent(null);
    resetForm();
  };

  const handleDeleteComponent = (componentId: number) => {
    if (confirm('Are you sure you want to deactivate this salary component?')) {
      setComponents(components.filter(comp => comp.id !== componentId));
    }
  };

  const openEditDialog = (component: SalaryComponent) => {
    setSelectedComponent(component);
    setFormData({
      componentName: component.componentName,
      componentCode: component.componentCode,
      componentType: component.componentType,
      calculationMethod: component.calculationMethod,
      value: component.value.toString(),
      isStatutory: component.isStatutory,
      isTaxable: component.isTaxable,
      displayOrder: component.displayOrder.toString(),
      description: component.description || ''
    });
    setIsEditDialogOpen(true);
  };

  const getComponentTypeBadge = (type: string) => {
    const typeConfig = {
      'EARNING': { label: 'Earning', variant: 'default' as const, icon: TrendingUp },
      'DEDUCTION': { label: 'Deduction', variant: 'destructive' as const, icon: TrendingDown }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || { label: type, variant: 'outline' as const, icon: Calculator };
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getCalculationMethodBadge = (method: string) => {
    const methodConfig = {
      'FIXED': { label: 'Fixed Amount', variant: 'outline' as const },
      'PERCENTAGE_OF_BASIC': { label: '% of Basic', variant: 'secondary' as const },
      'PERCENTAGE_OF_GROSS': { label: '% of Gross', variant: 'secondary' as const },
      'PERCENTAGE_OF_CTC': { label: '% of CTC', variant: 'secondary' as const }
    };

    const config = methodConfig[method as keyof typeof methodConfig] || { label: method, variant: 'outline' as const };

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {method.includes('PERCENTAGE') && <Percent className="h-3 w-3" />}
        {config.label}
      </Badge>
    );
  };

  const formatValue = (value: number, method: string) => {
    if (method === 'FIXED') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    } else {
      return `${value}%`;
    }
  };

  const ComponentForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="componentName">Component Name</Label>
          <Input
            id="componentName"
            placeholder="Enter component name"
            value={formData.componentName}
            onChange={(e) => setFormData({ ...formData, componentName: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="componentCode">Component Code</Label>
          <Input
            id="componentCode"
            placeholder="Enter component code"
            value={formData.componentCode}
            onChange={(e) => setFormData({ ...formData, componentCode: e.target.value.toUpperCase() })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="componentType">Component Type</Label>
          <Select
            value={formData.componentType}
            onValueChange={(value) => setFormData({ ...formData, componentType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select component type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EARNING">Earning</SelectItem>
              <SelectItem value="DEDUCTION">Deduction</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="calculationMethod">Calculation Method</Label>
          <Select
            value={formData.calculationMethod}
            onValueChange={(value) => setFormData({ ...formData, calculationMethod: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select calculation method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FIXED">Fixed Amount</SelectItem>
              <SelectItem value="PERCENTAGE_OF_BASIC">Percentage of Basic</SelectItem>
              <SelectItem value="PERCENTAGE_OF_GROSS">Percentage of Gross</SelectItem>
              <SelectItem value="PERCENTAGE_OF_CTC">Percentage of CTC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="value">
            Value {formData.calculationMethod === 'FIXED' ? '(₹)' : '(%)'}
          </Label>
          <Input
            id="value"
            type="number"
            step="0.01"
            placeholder={formData.calculationMethod === 'FIXED' ? 'Enter amount' : 'Enter percentage'}
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="displayOrder">Display Order</Label>
          <Input
            id="displayOrder"
            type="number"
            placeholder="Enter display order"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isStatutory"
            checked={formData.isStatutory}
            onChange={(e) => setFormData({ ...formData, isStatutory: e.target.checked })}
            className="rounded"
          />
          <Label htmlFor="isStatutory">Statutory Component</Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isTaxable"
            checked={formData.isTaxable}
            onChange={(e) => setFormData({ ...formData, isTaxable: e.target.checked })}
            className="rounded"
          />
          <Label htmlFor="isTaxable">Taxable Component</Label>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter component description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
          <h1 className="text-3xl font-bold tracking-tight">Salary Components</h1>
          <p className="text-muted-foreground">
            Manage individual salary components for earnings and deductions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Component
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Salary Component</DialogTitle>
              <DialogDescription>
                Add a new salary component for earnings or deductions.
              </DialogDescription>
            </DialogHeader>
            <ComponentForm />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateComponent}>Create Component</Button>
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
                  placeholder="Search by component name, code, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="EARNING">Earnings</SelectItem>
                <SelectItem value="DEDUCTION">Deductions</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-48">
                <Calculator className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="FIXED">Fixed Amount</SelectItem>
                <SelectItem value="PERCENTAGE_OF_BASIC">% of Basic</SelectItem>
                <SelectItem value="PERCENTAGE_OF_GROSS">% of Gross</SelectItem>
                <SelectItem value="PERCENTAGE_OF_CTC">% of CTC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Components</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{components.length}</div>
            <p className="text-xs text-muted-foreground">
              All salary components
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {components.filter(comp => comp.componentType === 'EARNING').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Earning components
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deductions</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {components.filter(comp => comp.componentType === 'DEDUCTION').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Deduction components
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Statutory</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {components.filter(comp => comp.isStatutory).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Statutory components
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Components Table */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Components</CardTitle>
          <CardDescription>
            Configure individual salary components used in salary structures.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Calculation</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Properties</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComponents.map((component) => (
                <TableRow key={component.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{component.componentName}</div>
                      <div className="text-sm text-muted-foreground">{component.componentCode}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getComponentTypeBadge(component.componentType)}
                  </TableCell>
                  <TableCell>
                    {getCalculationMethodBadge(component.calculationMethod)}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {formatValue(component.value, component.calculationMethod)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {component.isStatutory && (
                        <Badge variant="outline" className="text-xs">
                          Statutory
                        </Badge>
                      )}
                      {component.isTaxable && (
                        <Badge variant="secondary" className="text-xs">
                          Taxable
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{component.displayOrder}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log('View component details:', component.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(component)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteComponent(component.id)}
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
            <DialogTitle>Edit Salary Component</DialogTitle>
            <DialogDescription>
              Update the salary component details and configuration.
            </DialogDescription>
          </DialogHeader>
          <ComponentForm isEdit />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditComponent}>Update Component</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
