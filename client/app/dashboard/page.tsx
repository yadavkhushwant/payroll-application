"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  CreditCard, 
  Gift, 
  TrendingUp, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface DashboardStats {
  totalEmployees: number;
  activeLoans: number;
  pendingBonuses: number;
  monthlyPayroll: number;
  pendingApprovals: number;
  completedPayrolls: number;
}

const mockStats: DashboardStats = {
  totalEmployees: 245,
  activeLoans: 23,
  pendingBonuses: 12,
  monthlyPayroll: 1250000,
  pendingApprovals: 8,
  completedPayrolls: 11
};

const recentActivities = [
  {
    id: 1,
    type: 'loan_approval',
    message: 'Personal loan approved for John Doe',
    time: '2 hours ago',
    status: 'approved'
  },
  {
    id: 2,
    type: 'payroll',
    message: 'December 2024 payroll processed for Engineering dept',
    time: '4 hours ago',
    status: 'completed'
  },
  {
    id: 3,
    type: 'bonus',
    message: 'Year-end bonus pending approval for 15 employees',
    time: '6 hours ago',
    status: 'pending'
  },
  {
    id: 4,
    type: 'salary',
    message: 'Salary revision applied for Marketing team',
    time: '1 day ago',
    status: 'completed'
  }
];

const quickActions = [
  {
    title: 'Calculate Payroll',
    description: 'Process monthly payroll',
    href: '/payroll/calculate',
    icon: DollarSign,
    color: 'bg-blue-500'
  },
  {
    title: 'Approve Loans',
    description: 'Review pending loan applications',
    href: '/loans/approvals',
    icon: CreditCard,
    color: 'bg-green-500'
  },
  {
    title: 'Manage Bonuses',
    description: 'Allocate performance bonuses',
    href: '/bonuses/employee-bonuses',
    icon: Gift,
    color: 'bg-purple-500'
  },
  {
    title: 'View Reports',
    description: 'Generate payroll reports',
    href: '/reports',
    icon: TrendingUp,
    color: 'bg-orange-500'
  }
];

function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend = 'up' 
}: { 
  title: string; 
  value: string | number; 
  change?: string; 
  icon: any; 
  trend?: 'up' | 'down';
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {trend === 'up' ? (
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
            )}
            <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
              {change}
            </span>
            <span className="ml-1">from last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Here you would fetch real data from your API
    // setStats(await fetchDashboardStats());
  }, []);

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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's your payroll overview for {currentDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {currentDate.toLocaleDateString('en-IN')}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          change="+2.5%"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Active Loans"
          value={stats.activeLoans}
          change="+5 this month"
          icon={CreditCard}
          trend="up"
        />
        <StatCard
          title="Pending Bonuses"
          value={stats.pendingBonuses}
          icon={Gift}
        />
        <StatCard
          title="Monthly Payroll"
          value={formatCurrency(stats.monthlyPayroll)}
          change="+8.2%"
          icon={DollarSign}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                className="w-full justify-start h-auto p-3"
                asChild
              >
                <a href={action.href}>
                  <div className={`${action.color} rounded-md p-2 mr-3`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-gray-500">{action.description}</div>
                  </div>
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge 
                    variant={activity.status === 'completed' ? 'default' : 
                             activity.status === 'approved' ? 'secondary' : 'destructive'}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Loan Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingApprovals}</div>
            <p className="text-sm text-gray-600">Loans pending approval</p>
            <Button variant="outline" size="sm" className="mt-3" asChild>
              <a href="/loans/approvals">Review Applications</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bonus Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.pendingBonuses}</div>
            <p className="text-sm text-gray-600">Bonuses pending approval</p>
            <Button variant="outline" size="sm" className="mt-3" asChild>
              <a href="/bonuses/approvals">Review Bonuses</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payroll Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completedPayrolls}/12</div>
            <p className="text-sm text-gray-600">Months completed this year</p>
            <Button variant="outline" size="sm" className="mt-3" asChild>
              <a href="/payroll/calculate">Process Payroll</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
