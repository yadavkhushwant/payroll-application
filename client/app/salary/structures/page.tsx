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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Calendar,
  Building2
} from 'lucide-react';
import { SalaryService } from '@/lib/services/salary-service';
import type { SalaryStructure } from '@/lib/types';

// Mock data for development
const mockSalaryStructures: SalaryStructure[] = [
  {
    id: 1,
    structureName: 'Software Engineer - L1',
    description: 'Entry level software engineer salary structure',
    effectiveDate: '2024-01-01',
    endDate: undefined,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    structureName: 'Software Engineer - L2',
    description: 'Mid level software engineer salary structure',
    effectiveDate: '2024-01-01',
    endDate: undefined,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    structureName: 'Manager - Engineering',
    description: 'Engineering manager salary structure',
    effectiveDate: '2024-01-01',
    endDate: undefined,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

interface SalaryStructureFormData {
  structureName: string;
  description: string;
  effectiveDate: string;
  endDate: string;
}

function SalaryStructureForm({ 
  structure, 
  onSave, 
  onCancel 
}: { 
  structure?: SalaryStructure; 
  onSave: (data: SalaryStructureFormData) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<SalaryStructureFormData>({
    structureName: structure?.structureName || '',
    description: structure?.description || '',
    effectiveDate: structure?.effectiveDate || '',
    endDate: structure?.endDate || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="structureName">Structure Name *</Label>
        <Input
          id="structureName"
          value={formData.structureName}
          onChange={(e) => setFormData(prev => ({ ...prev, structureName: e.target.value }))}
          placeholder="e.g., Software Engineer - L1"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description of the salary structure"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="effectiveDate">Effective Date *</Label>
          <Input
            id="effectiveDate"
            type="date"
            value={formData.effectiveDate}
            onChange={(e) => setFormData(prev => ({ ...prev, effectiveDate: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {structure ? 'Update' : 'Create'} Structure
        </Button>
      </div>
    </form>
  );
}

export default function SalaryStructuresPage() {
  const [salaryStructures, setSalaryStructures] = useState<SalaryStructure[]>(mockSalaryStructures);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStructure, setEditingStructure] = useState<SalaryStructure | undefined>();

  const filteredStructures = salaryStructures.filter(structure =>
    structure.structureName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    structure.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateStructure = async (data: SalaryStructureFormData) => {
    try {
      setIsLoading(true);
      // const newStructure = await SalaryService.createSalaryStructure(data);
      
      // Mock implementation
      const newStructure: SalaryStructure = {
        id: Date.now(),
        ...data,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setSalaryStructures(prev => [newStructure, ...prev]);
      setIsDialogOpen(false);
      setEditingStructure(undefined);
    } catch (error) {
      console.error('Error creating salary structure:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStructure = async (data: SalaryStructureFormData) => {
    if (!editingStructure) return;
    
    try {
      setIsLoading(true);
      // const updatedStructure = await SalaryService.updateSalaryStructure(editingStructure.id, data);
      
      // Mock implementation
      const updatedStructure: SalaryStructure = {
        ...editingStructure,
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      setSalaryStructures(prev => 
        prev.map(structure => 
          structure.id === editingStructure.id ? updatedStructure : structure
        )
      );
      setIsDialogOpen(false);
      setEditingStructure(undefined);
    } catch (error) {
      console.error('Error updating salary structure:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivateStructure = async (id: number) => {
    try {
      setIsLoading(true);
      // await SalaryService.deactivateSalaryStructure(id);
      
      // Mock implementation
      setSalaryStructures(prev => 
        prev.map(structure => 
          structure.id === id ? { ...structure, isActive: false } : structure
        )
      );
    } catch (error) {
      console.error('Error deactivating salary structure:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingStructure(undefined);
    setIsDialogOpen(true);
  };

  const openEditDialog = (structure: SalaryStructure) => {
    setEditingStructure(structure);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Salary Structures</h1>
          <p className="text-gray-600 mt-1">
            Manage and configure salary structures for different roles
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Create Structure
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search salary structures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {filteredStructures.length} structures
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Structure Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStructures.map((structure) => (
                <TableRow key={structure.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span>{structure.structureName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {structure.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">
                        {new Date(structure.effectiveDate).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {structure.endDate ? (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">
                          {new Date(structure.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={structure.isActive ? "default" : "secondary"}>
                      {structure.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(structure)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {structure.isActive && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeactivateStructure(structure.id)}
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

          {filteredStructures.length === 0 && (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No salary structures found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Create your first salary structure to get started'}
              </p>
              {!searchTerm && (
                <Button onClick={openCreateDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Structure
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingStructure ? 'Edit Salary Structure' : 'Create New Salary Structure'}
            </DialogTitle>
            <DialogDescription>
              {editingStructure 
                ? 'Update the salary structure details below.'
                : 'Create a new salary structure for your organization.'
              }
            </DialogDescription>
          </DialogHeader>
          <SalaryStructureForm
            structure={editingStructure}
            onSave={editingStructure ? handleUpdateStructure : handleCreateStructure}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
