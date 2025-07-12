import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const ClientLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <Sidebar />
      <main className="transition-all duration-300 pt-16 lg:ml-64">
        <div className="container mx-auto p-4 lg:p-8 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ClientLayout; 