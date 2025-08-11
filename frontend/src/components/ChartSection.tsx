
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface ChartSectionProps {
  data: any;
}

export const ChartSection: React.FC<ChartSectionProps> = ({ data }) => {
  const featureImportanceData = [
    { feature: 'Rainfall', importance: 85 },
    { feature: 'Temperature', importance: 72 },
    { feature: 'Soil Quality', importance: 68 },
    { feature: 'Fertilizer Usage', importance: 55 },
    { feature: 'Irrigation', importance: 48 },
    { feature: 'Pest Control', importance: 35 }
  ];

  const trendData = [
    { year: '2020', predicted: 3200, actual: 3100 },
    { year: '2021', predicted: 3400, actual: 3350 },
    { year: '2022', predicted: 3600, actual: 3580 },
    { year: '2023', predicted: 3800, actual: 3750 },
    { year: '2024', predicted: 4000, actual: null },
    { year: '2025', predicted: parseInt(data.predictedProduction), actual: null }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-green-200 shadow-lg">
        <CardHeader className="bg-green-50 rounded-t-xl">
          <CardTitle className="text-green-800 flex items-center">
            📊 Feature Importance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureImportanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
              <XAxis 
                dataKey="feature" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="importance" 
                fill="#059669"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-50 rounded-t-xl">
          <CardTitle className="text-blue-800 flex items-center">
            📈 Production Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#2563eb" 
                strokeWidth={3}
                dot={{ fill: '#2563eb', r: 6 }}
                name="Predicted"
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#059669" 
                strokeWidth={3}
                dot={{ fill: '#059669', r: 6 }}
                name="Actual"
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
