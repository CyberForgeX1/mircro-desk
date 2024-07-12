"use client";
import AdminLayout from '@/components/admin/layout';
import MyProvider from '@/providers/myProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MyProvider>
      <AdminLayout>{children}</AdminLayout>
    </MyProvider>
  );
}
