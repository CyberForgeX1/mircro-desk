import Navbar from '@/components/user/layout/navbar';
import Footer from '@/components/user/layout/footer';
import MyProvider from '@/providers/myProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <MyProvider>
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </MyProvider>
    </html>
  );
}
