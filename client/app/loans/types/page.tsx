"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  CreditCard,
  Percent,
  DollarSign
} from 'lucide-react';
import { LoanService } from '@/lib/services/loan-service';
import type { LoanType } from '@/lib/types';

// Mock data for development
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
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    loanTypeName: 'Salary Advance',
    loanTypeCode: 'SA',
    description: 'Short-term salary advance',
    maxLoanAmount: 100000,
    maxInstallments: 12,
    interestRate: 0,
    processingFee: 0,
    isAdvanceType: true,
    requiresApproval: false,
    minServiceMonths: 3,
    maxLoanPercentage: 50,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    loanTypeName: 'Emergency Loan',
    loanTypeCode: 'EL',
    description: 'Emergency financial assistance',
    maxLoanAmount: 200000,
    maxInstallments: 24,
    interestRate: 8.5,
    processingFee: 500,
    isAdvanceType: false,
    requiresApproval: true,
    minServiceMonths: 6,
    maxLoanPercentage: 60,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

interface LoanTypeFormData {
  loanTypeName: string;
  loanTypeCode: string;
  description: string;
  maxLoanAmount: number;
  maxInstallments: number;
  interestRate: number;
  processingFee: number;
  isAdvanceType: boolean;
  requiresApproval: boolean;
  minServiceMonths: number;
  maxLoanPercentage: number;
}

function LoanTypeForm({ 
  loanType, 
  onSave, 
  onCancel 
}: { 
  loanType?: LoanType; 
  onSave: (data: LoanTypeFormData) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<LoanTypeFormData>({
    loanTypeName: loanType?.loanTypeName || '',
    loanTypeCode: loanType?.loanTypeCode || '',
    description: loanType?.description || '',
    maxLoanAmount: loanType?.maxLoanAmount || 0,
    maxInstallments: loanType?.maxInstallments || 12,
    interestRate: loanType?.interestRate || 0,
    processingFee: loanType?.processingFee || 0,
    isAdvanceType: loanType?.isAdvanceType || false,
    requiresApproval: loanType?.requiresApproval || true,
    minServiceMonths: loanType?.minServiceMonths || 6,
    maxLoanPercentage: loanType?.maxLoanPercentage || 50
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="loanTypeName">Loan Type Name *</Label>
          <Input
            id="loanTypeName"
            value={formData.loanTypeName}
            onChange={(e) => setFormData(prev => ({ ...prev, loanTypeName: e.target.value }))}
            placeholder="e.g., Personal Loan"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanTypeCode">Loan Code *</Label>
          <Input
            id="loanTypeCode"
            value={formData.loanTypeCode}
            onChange={(e) => setFormData(prev => ({ ...prev, loanTypeCode: e.target.value.toUpperCase() }))}
            placeholder="e.g., PL"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description of the loan type"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maxLoanAmount">Max Loan Amount (₹) *</Label>
          <Input
            id="maxLoanAmount"
            type="number"
            value={formData.maxLoanAmount}
            onChange={(e) => setFormData(prev => ({ ...prev, maxLoanAmount: Number(e.target.value) }))}
            placeholder="500000"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxInstallments">Max Installments *</Label>
          <Input
            id="maxInstallments"
            type="number"
            value={formData.maxInstallments}
            onChange={(e) => setFormData(prev => ({ ...prev, maxInstallments: Number(e.target.value) }))}
            placeholder="60"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="interestRate">Interest Rate (%) *</Label>
          <Input
            id="interestRate"
            type="number"
            step="0.1"
            value={formData.interestRate}
            onChange={(e) => setFormData(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
            placeholder="12.5"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="processingFee">Processing Fee (₹)</Label>
          <Input
            id="processingFee"
            type="number"
            value={formData.processingFee}
            onChange={(e) => setFormData(prev => ({ ...prev, processingFee: Number(e.target.value) }))}
            placeholder="1000"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minServiceMonths">Min Service Months *</Label>
          <Input
            id="minServiceMonths"
            type="number"
            value={formData.minServiceMonths}
            onChange={(e) => setFormData(prev => ({ ...prev, minServiceMonths: Number(e.target.value) }))}
            placeholder="12"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxLoanPercentage">Max Loan % of Salary *</Label>
          <Input
            id="maxLoanPercentage"
            type="number"
            value={formData.maxLoanPercentage}
            onChange={(e) => setFormData(prev => ({ ...prev, maxLoanPercentage: Number(e.target.value) }))}
            placeholder="80"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="isAdvanceType">Type</Label>
          <Select 
            value={formData.isAdvanceType ? 'advance' : 'loan'}
            onValueChange={(value) => setFormData(prev => ({ ...prev, isAdvanceType: value === 'advance' }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="loan">Loan</SelectItem>
              <SelectItem value="advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="requiresApproval">Approval Required</Label>
          <Select 
            value={formData.requiresApproval ? 'yes' : 'no'}
            onValueChange={(value) => setFormData(prev => ({ ...prev, requiresApproval: value === 'yes' }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {loanType ? 'Update' : 'Create'} Loan Type
        </Button>
      </div>
    </form>
  );
}

export default function LoanTypesPage() {
  const [loanTypes, setLoanTypes] = useState<LoanType[]>(mockLoanTypes);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLoanType, setEditingLoanType] = useState<LoanType | undefined>();

  const filteredLoanTypes = loanTypes.filter(loanType =>
    loanType.loanTypeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loanType.loanTypeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loanType.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateLoanType = async (data: LoanTypeFormData) => {
    try {
      setIsLoading(true);
      // const newLoanType = await LoanService.createLoanType(data);
      
      // Mock implementation
      const newLoanType: LoanType = {
        id: Date.now(),
        ...data,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setLoanTypes(prev => [newLoanType, ...prev]);
      setIsDialogOpen(false);
      setEditingLoanType(undefined);
    } catch (error) {
      console.error('Error creating loan type:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateLoanType = async (data: LoanTypeFormData) => {
    if (!editingLoanType) return;
    
    try {
      setIsLoading(true);
      // const updatedLoanType = await LoanService.updateLoanType(editingLoanType.id, data);
      
      // Mock implementation
      const updatedLoanType: LoanType = {
        ...editingLoanType,
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      setLoanTypes(prev => 
        prev.map(loanType => 
          loanType.id === editingLoanType.id ? updatedLoanType : loanType
        )
      );
      setIsDialogOpen(false);
      setEditingLoanType(undefined);
    } catch (error) {
      console.error('Error updating loan type:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivateLoanType = async (id: number) => {
    try {
      setIsLoading(true);
      // await LoanService.deactivateLoanType(id);
      
      // Mock implementation
      setLoanTypes(prev => 
        prev.map(loanType => 
          loanType.id === id ? { ...loanType, isActive: false } : loanType
        )
      );
    } catch (error) {
      console.error('Error deactivating loan type:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingLoanType(undefined);
    setIsDialogOpen(true);
  };

  const openEditDialog = (loanType: LoanType) => {
    setEditingLoanType(loanType);
    setIsDialogOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Loan Types</h1>
          <p className="text-gray-600 mt-1">
            Configure different types of loans and advances available to employees
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Create Loan Type
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search loan types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {filteredLoanTypes.length} types
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan Type</TableHead>
                <TableHead>Max Amount</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Max Installments</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLoanTypes.map((loanType) => (
                <TableRow key={loanType.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{loanType.loanTypeName}</div>
                        <div className="text-sm text-gray-500">{loanType.loanTypeCode}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-gray-400" />
                      <span>{formatCurrency(loanType.maxLoanAmount)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Percent className="h-3 w-3 text-gray-400" />
                      <span>{loanType.interestRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{loanType.maxInstallments} months</TableCell>
                  <TableCell>
                    <Badge variant={loanType.isAdvanceType ? "secondary" : "default"}>
                      {loanType.isAdvanceType ? 'Advance' : 'Loan'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={loanType.requiresApproval ? "destructive" : "default"}>
                      {loanType.requiresApproval ? 'Required' : 'Not Required'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={loanType.isActive ? "default" : "secondary"}>
                      {loanType.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(loanType)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {loanType.isActive && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeactivateLoanType(loanType.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredLoanTypes.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No loan types found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Create your first loan type to get started'}
              </p>
              {!searchTerm && (
                <Button onClick={openCreateDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Loan Type
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingLoanType ? 'Edit Loan Type' : 'Create New Loan Type'}
            </DialogTitle>
            <DialogDescription>
              {editingLoanType 
                ? 'Update the loan type details below.'
                : 'Create a new loan type for your organization.'
              }
            </DialogDescription>
          </DialogHeader>
          <LoanTypeForm
            loanType={editingLoanType}
            onSave={editingLoanType ? handleUpdateLoanType : handleCreateLoanType}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
