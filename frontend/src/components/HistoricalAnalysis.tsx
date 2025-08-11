
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ScatterChart,
    Scatter
} from 'recharts';
import {
    Calendar,
    TrendingUp,
    AlertTriangle,
    Download,
    Search,
    Filter,
    BarChart3,
    Clock,
    Target
} from 'lucide-react';

export const HistoricalAnalysis: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('5years');
    const [selectedMetric, setSelectedMetric] = useState('production');
    const [selectedDistrict, setSelectedDistrict] = useState('all');

    const historicalData = [
        { year: '2019', production: 3200, yield: 3.8, area: 842, weather: 'normal' },
        { year: '2020', production: 2800, yield: 3.4, area: 824, weather: 'drought' },
        { year: '2021', production: 3600, yield: 4.1, area: 878, weather: 'flood' },
        { year: '2022', production: 3900, yield: 4.3, area: 907, weather: 'normal' },
        { year: '2023', production: 4100, yield: 4.5, area: 911, weather: 'normal' },
        { year: '2024', production: 4300, yield: 4.7, area: 915, weather: 'normal' }
    ];

    const seasonalHistory = [
        { year: '2019', maha: 2100, yala: 1100 },
        { year: '2020', maha: 1800, yala: 1000 },
        { year: '2021', maha: 2400, yala: 1200 },
        { year: '2022', maha: 2600, yala: 1300 },
        { year: '2023', maha: 2700, yala: 1400 },
        { year: '2024', maha: 2800, yala: 1500 }
    ];

    const weatherImpact = [
        { event: 'Drought 2020', impact: -12.5, affected: 'All districts', duration: '3 months' },
        { event: 'Flood 2021', impact: -8.2, affected: 'Western Province', duration: '1 month' },
        { event: 'Cyclone 2022', impact: -5.1, affected: 'Northern districts', duration: '2 weeks' }
    ];

    const keyStatistics = [
        {
            title: 'Average Growth Rate',
            value: '6.2%',
            description: 'Annual production increase',
            trend: 'positive'
        },
        {
            title: 'Yield Improvement',
            value: '+23.7%',
            description: 'Since 2019',
            trend: 'positive'
        },
        {
            title: 'Weather Events',
            value: '7',
            description: 'Major disruptions in 5 years',
            trend: 'neutral'
        },
        {
            title: 'Recovery Time',
            value: '8.5 months',
            description: 'Average bounce-back period',
            trend: 'neutral'
        }
    ];

    const patterns = [
        {
            title: 'Seasonal Predictability',
            description: 'Maha season consistently outperforms Yala by 65-70%',
            confidence: 95,
            type: 'seasonal'
        },
        {
            title: 'Weather Sensitivity',
            description: 'Production drops 8-15% during extreme weather events',
            confidence: 88,
            type: 'weather'
        },
        {
            title: 'Recovery Pattern',
            description: 'Full recovery typically achieved within 2-3 seasons',
            confidence: 92,
            type: 'recovery'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Historical Analysis</h1>
                    <p className="text-gray-600">Deep dive into production patterns and historical trends</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Time Period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1year">Last Year</SelectItem>
                            <SelectItem value="3years">3 Years</SelectItem>
                            <SelectItem value="5years">5 Years</SelectItem>
                            <SelectItem value="10years">10 Years</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="District" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Districts</SelectItem>
                            <SelectItem value="colombo">Colombo</SelectItem>
                            <SelectItem value="kandy">Kandy</SelectItem>
                            <SelectItem value="galle">Galle</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Analysis
                    </Button>
                </div>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {keyStatistics.map((stat, index) => (
                    <Card key={index}>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <Clock className="h-5 w-5 text-gray-400" />
                                <Badge variant={stat.trend === 'positive' ? 'default' : 'secondary'}>
                                    {stat.trend === 'positive' ? 'Improving' : 'Stable'}
                                </Badge>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="font-medium text-gray-700">{stat.title}</p>
                            <p className="text-sm text-gray-500">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Analysis */}
            <Tabs defaultValue="trends" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="trends">Long-term Trends</TabsTrigger>
                    <TabsTrigger value="seasonal">Seasonal Patterns</TabsTrigger>
                    <TabsTrigger value="weather">Weather Impact</TabsTrigger>
                    <TabsTrigger value="insights">Key Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="trends">
                    <Card>
                        <CardHeader>
                            <CardTitle>Production & Yield Trends (2019-2024)</CardTitle>
                            <CardDescription>Historical performance with trend analysis</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80 mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={historicalData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="year" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="production" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                                        <Area type="monotone" dataKey="yield" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <h4 className="font-semibold text-green-800 mb-2">Growth Trajectory</h4>
                                    <p className="text-sm text-green-600">
                                        Consistent upward trend with 34.4% total growth over 5 years.
                                        Average annual growth rate of 6.2% indicates healthy sector development.
                                    </p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <h4 className="font-semibold text-blue-800 mb-2">Yield Efficiency</h4>
                                    <p className="text-sm text-blue-600">
                                        Yield per hectare improved from 3.8 to 4.7 MT/Ha, showing
                                        successful adoption of modern farming techniques and better resource management.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="seasonal">
                    <Card>
                        <CardHeader>
                            <CardTitle>Maha vs Yala Production Patterns</CardTitle>
                            <CardDescription>Historical comparison of cultivation seasons</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80 mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={seasonalHistory}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="year" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="maha" stroke="#22c55e" strokeWidth={3} />
                                        <Line type="monotone" dataKey="yala" stroke="#3b82f6" strokeWidth={3} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Maha Season Dominance</p>
                                        <p className="text-sm text-gray-600">Consistently 65-70% of total production</p>
                                    </div>
                                    <Badge className="bg-green-100 text-green-800">Stable Pattern</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Yala Season Growth</p>
                                        <p className="text-sm text-gray-600">36.4% improvement over 5 years</p>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-800">Growing</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="weather">
                    <Card>
                        <CardHeader>
                            <CardTitle>Weather Event Impact Analysis</CardTitle>
                            <CardDescription>How climate events affected production</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 mb-6">
                                {weatherImpact.map((event, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                                            <div>
                                                <p className="font-medium">{event.event}</p>
                                                <p className="text-sm text-gray-600">{event.affected} • {event.duration}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-red-600">{event.impact}%</p>
                                            <p className="text-sm text-gray-500">Production impact</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                                    <h4 className="font-semibold text-orange-800">Drought Impact</h4>
                                    <p className="text-sm text-orange-600">
                                        Most severe impact with 12.5% production drop. Primarily affects
                                        rain-fed cultivation areas.
                                    </p>
                                </div>
                                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                                    <h4 className="font-semibold text-red-800">Recovery Resilience</h4>
                                    <p className="text-sm text-red-600">
                                        Sector shows strong recovery capability with bounce-back
                                        typically achieved within 2-3 seasons.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="insights">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Identified Patterns</CardTitle>
                                <CardDescription>Key trends discovered through analysis</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {patterns.map((pattern, index) => (
                                        <div key={index} className="p-4 border rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium">{pattern.title}</h4>
                                                <Badge variant="outline">{pattern.confidence}% confidence</Badge>
                                            </div>
                                            <p className="text-sm text-gray-600">{pattern.description}</p>
                                            <div className="mt-2">
                                                <Badge className={`text-xs ${
                                                    pattern.type === 'seasonal' ? 'bg-green-100 text-green-800' :
                                                        pattern.type === 'weather' ? 'bg-orange-100 text-orange-800' :
                                                            'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {pattern.type}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Future Projections</CardTitle>
                                <CardDescription>Based on historical patterns</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Target className="h-5 w-5 text-green-600" />
                                            <h4 className="font-semibold text-green-800">2025 Outlook</h4>
                                        </div>
                                        <p className="text-sm text-green-600 mb-2">Expected production: 4,500-4,700 MT</p>
                                        <p className="text-xs text-green-700">Based on current growth trajectory</p>
                                    </div>

                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 mb-2">Key Recommendations</h4>
                                        <ul className="text-sm text-blue-600 space-y-1">
                                            <li>• Strengthen drought mitigation strategies</li>
                                            <li>• Improve Yala season productivity</li>
                                            <li>• Enhance early warning systems</li>
                                            <li>• Promote climate-resilient varieties</li>
                                        </ul>
                                    </div>

                                    <div className="p-4 bg-purple-50 rounded-lg">
                                        <h4 className="font-semibold text-purple-800 mb-2">Risk Factors</h4>
                                        <ul className="text-sm text-purple-600 space-y-1">
                                            <li>• Climate change impacts</li>
                                            <li>• Water resource constraints</li>
                                            <li>• Market price volatility</li>
                                            <li>• Labor shortage trends</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};
