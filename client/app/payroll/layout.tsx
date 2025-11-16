import Link from 'next/link';
import { Calculator, FileText, TrendingUp, Users, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const navItems = [
  {
    title: 'Calculate Payroll',
    href: '/payroll/calculate',
    icon: Calculator,
    description: 'Calculate individual or bulk payroll'
  },
  {
    title: 'Payroll Reports',
    href: '/payroll/reports',
    icon: FileText,
    description: 'View and generate payroll reports'
  },
  {
    title: 'Payroll History',
    href: '/payroll/history',
    icon: TrendingUp,
    description: 'View historical payroll data'
  },
  {
    title: 'Bulk Operations',
    href: '/payroll/bulk',
    icon: Users,
    description: 'Process bulk payroll operations'
  },
  {
    title: 'Payroll Settings',
    href: '/payroll/settings',
    icon: Settings,
    description: 'Configure payroll settings'
  }
];

export default function PayrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/10">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            <span className="text-lg font-semibold">Payroll System</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Complete payroll management solution
          </p>
        </div>
        
        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
            >
              <item.icon className="h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 mt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">New Feature</Badge>
            </div>
            <p className="text-sm text-blue-700">
              Try our new automated payroll calculation with bonus and loan processing!
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
