
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Wheat, Sprout } from 'lucide-react';

interface PredictionOutputProps {
  data: {
    predictedProduction: string;
    predictedYield: string;
    harvestedExtent: string;
    district: string;
    season: string;
    year: string;
  };
}

export const PredictionOutput: React.FC<PredictionOutputProps> = ({ data }) => {
  const outputCards = [
    {
      title: 'Predicted Production',
      value: `${data.predictedProduction} MT`,
      icon: Wheat,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Total rice production forecast'
    },
    {
      title: 'Predicted Yield',
      value: `${data.predictedYield} MT/Ha`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Yield per hectare'
    },
    {
      title: 'Harvested Extent',
      value: `${data.harvestedExtent} Ha`,
      icon: Sprout,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      description: 'Expected harvested area'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-green-100 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Prediction Results for {data.district}
        </h3>
        <p className="text-gray-600 text-sm">
          Season: {data.season} {data.year}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {outputCards.map((card, index) => (
          <Card 
            key={index} 
            className={`${card.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <CardHeader className={`${card.bgColor} rounded-t-xl pb-2`}>
              <CardTitle className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <card.icon className={`h-5 w-5 ${card.color}`} />
                <span>{card.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className={`text-3xl font-bold ${card.color} mb-1`}>
                {card.value}
              </div>
              <p className="text-xs text-gray-500">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
