import DashboardLayout from '@/components/layout/DashboardLayout';

export default function SalaryLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
