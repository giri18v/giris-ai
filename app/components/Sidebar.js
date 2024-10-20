import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', path: '/dashboards', icon: '🏠' },
    { name: 'Research Assistant', path: '/research-assistant', icon: '🔬' },
    { name: 'Research Reports', path: '/research-reports', icon: '📄' },
    { name: 'API Playground', path: '/playground', icon: '🧪' },
    { name: 'Invoices', path: '/invoices', icon: '📊' },
    { name: 'Documentation', path: '/documentation', icon: '📚' },
  ];

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-white shadow-md transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-0 -left-16'}`}
    >
      <div className="p-4">
        <h1 className={`text-2xl font-bold text-purple-600 mb-8 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          GIRI's AI
        </h1>
      </div>
      <nav>
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.path}
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 ${
              pathname === item.path ? 'bg-purple-50 text-purple-600' : ''
            } ${isOpen ? '' : 'hidden'}`}
          >
            <span className="mr-3">{item.icon}</span>
            <span className="whitespace-nowrap">
              {item.name}
            </span>
            {item.name === 'Documentation' && (
              <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
