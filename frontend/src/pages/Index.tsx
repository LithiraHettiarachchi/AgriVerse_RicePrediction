
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { PredictionForm } from '@/components/PredictionForm';
import { PredictionOutput } from '@/components/PredictionOutput';
import { ChartSection } from '@/components/ChartSection';
import {DistrictTrends} from "@/components/DistrictTrends.tsx";
import {HistoricalAnalysis} from "@/components/HistoricalAnalysis.tsx";
import {ExportReports} from "@/components/ExportReports.tsx";


const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [predictionData, setPredictionData] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState('Maha');
  const [selectedYear, setSelectedYear] = useState('2025');

  const handlePrediction = (formData: any) => {
    // Simulate prediction with realistic values
    const mockPrediction = {
      predictedProduction: (Math.random() * 5000 + 2000).toFixed(0),
      predictedYield: (Math.random() * 2 + 3).toFixed(2),
      harvestedExtent: (formData.sownExtent * (0.85 + Math.random() * 0.1)).toFixed(0),
      district: formData.district,
      season: formData.season,
      year: formData.year
    };
    setPredictionData(mockPrediction);
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveSection} />;
      case 'predict':
        return (
          <div className="space-y-6">
            <PredictionForm onPredict={handlePrediction} />
            {predictionData && (
              <>
                <PredictionOutput data={predictionData} />
                <ChartSection data={predictionData} />
              </>
            )}
          </div>
        );
      case 'trends':
        return <DistrictTrends />
      case 'historical':
        return <HistoricalAnalysis/>
      case 'export':
        return <ExportReports/>
      default:
        return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header 
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      
      <div className="flex">
        <Sidebar 
          collapsed={sidebarCollapsed}
          mobileMenuOpen={mobileMenuOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} p-4 lg:p-6`}>
          <div className="max-w-7xl mx-auto">
            {renderMainContent()}
          </div>
        </main>
      </div>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
          <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
          />
      )}
    </div>
  );
};

export default Index;
