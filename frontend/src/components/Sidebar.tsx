
import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  History, 
  FileOutput, 
  Home,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  mobileMenuOpen: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
                                                  collapsed,
                                                  mobileMenuOpen,
                                                  activeSection,
                                                  setActiveSection,
                                                  onCloseMobile
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'predict', label: 'Predict Production', icon: BarChart3 },
    { id: 'trends', label: 'District Trends', icon: TrendingUp },
    { id: 'historical', label: 'Historical Analysis', icon: History },
    { id: 'export', label: 'Export Reports', icon: FileOutput },
  ];
  const handleItemClick = (itemId: string) => {
    setActiveSection(itemId);
    onCloseMobile(); // Close mobile menu when item is selected
  };

  return (
      <aside
          className={cn(
              "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-green-100 shadow-sm transition-all duration-300 z-40",
              collapsed ? "lg:w-16" : "lg:w-64",
              // Mobile behavior - show/hide based on mobileMenuOpen
              mobileMenuOpen ? "block w-64" : "hidden",
              // Always show on desktop
              "lg:block"
          )}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
              <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                      "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left group",
                      activeSection === item.id
                          ? "bg-green-100 text-green-700 shadow-sm"
                          : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                  )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0"/>
                {(!collapsed || mobileMenuOpen) && (
                    <>
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"/>
                    </>
                )}
              </button>
          ))}
        </nav>

        {(!collapsed || mobileMenuOpen) && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4">
                <div className="text-sm font-medium text-green-800 mb-1">
                  🌱 Sri Lanka Agriculture
                </div>
                <div className="text-xs text-green-600">
                  Empowering data-driven decisions for sustainable farming
                </div>
              </div>
            </div>
        )}
      </aside>
  );
};
