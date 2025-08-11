import React from 'react';
import { Menu, Bell, LogOut, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/contexts/AuthContext.tsx";

interface HeaderProps {
  selectedSeason: string;
  setSelectedSeason: (season: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  onToggleSidebar: () => void;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
                                                selectedSeason,
                                                setSelectedSeason,
                                                selectedYear,
                                                setSelectedYear,
                                                onToggleSidebar,
                                                onToggleMobileMenu
                                              }) => {
  const seasons = ['Maha', 'Yala'];
  const years = ['2023', '2024', '2025', '2026'];
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
      <header className="bg-white border-b border-green-100 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Use mobile menu on mobile, desktop sidebar toggle on desktop
                  if (window.innerWidth < 1024) {
                    onToggleMobileMenu();
                  } else {
                    onToggleSidebar();
                  }
                }}
                className="hover:bg-green-50"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌾</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">AgriVerse</h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-sm text-gray-600">Season:</span>
              <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger className="w-24 h-8">
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((season) => (
                      <SelectItem key={season} value={season}>
                        {season}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-sm text-gray-600">Year:</span>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-20 h-8">
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mobile season/year selectors */}
            <div className="flex sm:hidden items-center space-x-1">
              <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger className="w-20 h-8 text-xs">
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((season) => (
                      <SelectItem key={season} value={season}>
                        {season}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-16 h-8 text-xs">
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <Bell className="h-6 w-6"/>
              </button>
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      {user?.name.charAt(0)}
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-base font-medium text-gray-800">
                      {user?.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user?.email}
                    </div>
                  </div>
                  <button onClick={handleLogout}
                          className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                    <LogOut className="h-5 w-5"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
  );
};
