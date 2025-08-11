
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface PredictionFormProps {
  onPredict: (data: any) => void;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict }) => {
  const [formData, setFormData] = useState({
    district: '',
    season: '',
    year: '',
    sownExtent: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const districts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Mullaitivu', 'Vavuniya', 'Puttalam', 'Kurunegala', 'Anuradhapura',
    'Polonnaruwa', 'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle'
  ];

  const seasons = ['Maha', 'Yala'];
  const years = ['2023', '2024', '2025', '2026'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onPredict(formData);
    setIsLoading(false);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <Card className="border-green-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
        <CardTitle className="text-2xl text-green-800 flex items-center">
          🌾 Predict Rice Production
        </CardTitle>
        <CardDescription className="text-green-600">
          Enter the farming details below to get accurate production predictions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="district" className="text-gray-700 font-medium">
                District
              </Label>
              <Select value={formData.district} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, district: value }))
              }>
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="season" className="text-gray-700 font-medium">
                Season
              </Label>
              <Select value={formData.season} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, season: value }))
              }>
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue placeholder="Select season" />
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

            <div className="space-y-2">
              <Label htmlFor="year" className="text-gray-700 font-medium">
                Year
              </Label>
              <Select value={formData.year} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, year: value }))
              }>
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue placeholder="Select year" />
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

            <div className="space-y-2">
              <Label htmlFor="sownExtent" className="text-gray-700 font-medium">
                Sown Extent (Hectares)
              </Label>
              <Input
                id="sownExtent"
                type="number"
                placeholder="Enter sown extent"
                value={formData.sownExtent}
                onChange={(e) => setFormData(prev => ({ ...prev, sownExtent: e.target.value }))}
                className="border-green-200 focus:border-green-400"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Predicting...
              </>
            ) : (
              '🌾 Predict Production'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
