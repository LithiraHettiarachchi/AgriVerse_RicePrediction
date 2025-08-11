
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MapPin, 
  Calendar,
  BarChart3,
  ArrowRight,
  Leaf,
  Sun,
  CloudRain
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const quickStats = [
    {
      title: 'Total Districts',
      value: '25',
      change: '+2.5%',
      trend: 'up' as const,
      icon: MapPin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Predictions',
      value: '1,247',
      change: '+12.3%',
      trend: 'up' as const,
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Avg. Yield (MT/Ha)',
      value: '4.2',
      change: '-0.8%',
      trend: 'down' as const,
      icon: Leaf,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Coverage Area',
      value: '285K Ha',
      change: '+5.2%',
      trend: 'up' as const,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const seasonProgress = [
    { season: 'Maha 2025', progress: 75, status: 'Active', color: 'bg-green-500' },
    { season: 'Yala 2025', progress: 25, status: 'Planning', color: 'bg-blue-500' },
  ];

  const recentActivity = [
    { district: 'Colombo', action: 'New prediction generated', time: '2 hours ago' },
    { district: 'Kandy', action: 'Yield forecast updated', time: '4 hours ago' },
    { district: 'Galle', action: 'Historical data analyzed', time: '6 hours ago' },
    { district: 'Anuradhapura', action: 'Report exported', time: '1 day ago' },
  ];

  const weatherData = [
    { region: 'Western Province', condition: 'Sunny', temp: '28°C', icon: Sun },
    { region: 'Central Province', condition: 'Rainy', temp: '24°C', icon: CloudRain },
    { region: 'Southern Province', condition: 'Cloudy', temp: '26°C', icon: Sun },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to AgriVerse</h1>
        <p className="text-green-100 mb-4">
          Monitor and predict rice production across Sri Lanka with advanced analytics
        </p>
        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            onClick={() => onNavigate('predict')}
            className="bg-white text-green-600 hover:bg-green-50"
          >
            Start Prediction
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onNavigate('trends')}
            className="border-white text-green-600 hover:bg-white/10"
          >
            View Trends
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Season Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              Season Progress
            </CardTitle>
            <CardDescription>Current cultivation seasons status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {seasonProgress.map((season, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{season.season}</span>
                  <Badge variant={season.status === 'Active' ? 'default' : 'secondary'}>
                    {season.status}
                  </Badge>
                </div>
                <Progress value={season.progress} className="h-2" />
                <p className="text-sm text-gray-600">{season.progress}% complete</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest predictions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.district}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weather Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Weather Overview</CardTitle>
            <CardDescription>Current conditions by province</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weatherData.map((weather, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <weather.icon className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-sm">{weather.region}</p>
                      <p className="text-xs text-gray-600">{weather.condition}</p>
                    </div>
                  </div>
                  <span className="font-bold text-lg">{weather.temp}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Access key features and tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => onNavigate('predict')}
            >
              <BarChart3 className="h-6 w-6" />
              <span>Create Prediction</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => onNavigate('trends')}
            >
              <TrendingUp className="h-6 w-6" />
              <span>View Trends</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => onNavigate('export')}
            >
              <Users className="h-6 w-6" />
              <span>Export Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
