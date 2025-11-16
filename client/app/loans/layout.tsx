import DashboardLayout from '@/components/layout/DashboardLayout';

export default function LoansLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
