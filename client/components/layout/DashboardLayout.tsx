"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Calculator, 
  CreditCard, 
  Gift, 
  FileText,
  Settings,
  Menu,
  X,
  Building2,
  DollarSign,
  TrendingUp,
  LogOut,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLogout, useAuth } from '@/lib/hooks/useAuth';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Employees',
    href: '/employees',
    icon: Users
  },
  {
    title: 'Salary Management',
    icon: DollarSign,
    children: [
      { title: 'Salary Structures', href: '/salary/structures' },
      { title: 'Salary Components', href: '/salary/components' },
      { title: 'Employee Salaries', href: '/salary/employees' }
    ]
  },
  {
    title: 'Loan Management',
    icon: CreditCard,
    children: [
      { title: 'Loan Types', href: '/loans/types' },
      { title: 'Employee Loans', href: '/loans/employee-loans' },
      { title: 'Loan Approvals', href: '/loans/approvals' }
    ]
  },
  {
    title: 'Bonus Management',
    icon: Gift,
    children: [
      { title: 'Bonus Types', href: '/bonuses/types' },
      { title: 'Employee Bonuses', href: '/bonuses/employee-bonuses' },
      { title: 'Bonus Approvals', href: '/bonuses/approvals' }
    ]
  },
  {
    title: 'Payroll',
    icon: Calculator,
    children: [
      { title: 'Calculate Payroll', href: '/payroll/calculate' },
      { title: 'Payroll History', href: '/payroll/history' },
      { title: 'Payslips', href: '/payroll/payslips' }
    ]
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: TrendingUp
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings
  }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo and close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">PayrollPro</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isExpanded = expandedItems.includes(item.title);
            const hasChildren = item.children && item.children.length > 0;
            
            if (hasChildren) {
              return (
                <div key={item.title}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => toggleExpanded(item.title)}
                  >
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    {item.title}
                  </Button>
                  {isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-md transition-colors",
                            pathname === child.href
                              ? "bg-blue-100 text-blue-700 font-medium"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href!}
                onClick={onClose}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {item.icon && <item.icon className="mr-3 h-4 w-4" />}
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: user } = useAuth();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Welcome back{user?.username ? `, ${user.username}` : ''}!
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
