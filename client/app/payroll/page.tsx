"use client";

import Link from 'next/link';
import { Calculator, FileText, TrendingUp, Users, Settings, Clock, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const quickActions = [
  {
    title: 'Calculate Payroll',
    description: 'Process payroll for individual employees or bulk operations',
    href: '/payroll/calculate',
    icon: Calculator,
    color: 'bg-blue-500'
  },
  {
    title: 'View Reports',
    description: 'Generate and view comprehensive payroll reports',
    href: '/payroll/reports',
    icon: FileText,
    color: 'bg-green-500'
  },
  {
    title: 'Payroll History',
    description: 'Review historical payroll data and trends',
    href: '/payroll/history',
    icon: TrendingUp,
    color: 'bg-purple-500'
  },
  {
    title: 'Settings',
    description: 'Configure payroll settings and parameters',
    href: '/payroll/settings',
    icon: Settings,
    color: 'bg-orange-500'
  }
];

const recentActivity = [
  {
    action: 'Payroll Calculated',
    details: 'January 2024 payroll for 125 employees',
    time: '2 hours ago',
    status: 'completed',
    amount: '₹12,45,000'
  },
  {
    action: 'Bonus Processing',
    details: 'Q4 2023 performance bonuses',
    time: '1 day ago',
    status: 'completed',
    amount: '₹2,85,000'
  },
  {
    action: 'Loan Deductions',
    details: 'Monthly loan installments processed',
    time: '3 days ago',
    status: 'completed',
    amount: '₹1,45,000'
  },
  {
    action: 'Bulk Payroll',
    details: 'December 2023 payroll processing',
    time: '1 week ago',
    status: 'completed',
    amount: '₹11,85,000'
  }
];

const payrollStats = [
  {
    label: 'Total Employees',
    value: '145',
    change: '+5',
    changeType: 'positive'
  },
  {
    label: 'Monthly Payroll',
    value: '₹12,45,000',
    change: '+8.5%',
    changeType: 'positive'
  },
  {
    label: 'Active Loans',
    value: '23',
    change: '-2',
    changeType: 'negative'
  },
  {
    label: 'Pending Bonuses',
    value: '8',
    change: 'No change',
    changeType: 'neutral'
  }
];

export default function PayrollPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payroll Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and process payroll operations for your organization
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {payrollStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === 'positive' ? 'text-green-600' :
                stat.changeType === 'negative' ? 'text-red-600' :
                'text-muted-foreground'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={action.href}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest payroll operations and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(activity.status)}
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">{activity.details}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{activity.amount}</div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-green-800">All Systems Operational</div>
                  <div className="text-sm text-green-600">Payroll system is running smoothly</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-blue-800">Next Payroll Due</div>
                  <div className="text-sm text-blue-600">February 2024 in 5 days</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <div>
                  <div className="font-medium text-yellow-800">Pending Approvals</div>
                  <div className="text-sm text-yellow-600">3 bonus requests need approval</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Ready to Process Payroll?</h3>
            <p className="text-blue-100">
              Calculate payroll for this month with automated bonus and loan processing
            </p>
          </div>
          <Link href="/payroll/calculate">
            <Button variant="secondary" size="lg">
              <Calculator className="mr-2 h-5 w-5" />
              Start Calculation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
