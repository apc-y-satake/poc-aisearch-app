import { FC } from 'react';
import { LayoutProps } from '../types/types';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-auto min-h-screen relative overflow-hidden">
      <div className="flex flex-col items-center justify-between max-w-3xl w-full min-h-full h-auto mx-auto">
        <Navbar />
        <main className="w-full pb-12 px-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
