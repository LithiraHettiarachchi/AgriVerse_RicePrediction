import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    MapPin,
    Calendar,
    Download,
    Filter,
    BarChart3
} from 'lucide-react';

export const DistrictTrends: React.FC = () => {
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedMetric, setSelectedMetric] = useState('production');

    const districts = [
        { id: 'all', name: 'All Districts' },
        { id: 'colombo', name: 'Colombo' },
        { id: 'kandy', name: 'Kandy' },
        { id: 'galle', name: 'Galle' },
        { id: 'anuradhapura', name: 'Anuradhapura' },
        { id: 'kurunegala', name: 'Kurunegala' },
        { id: 'ratnapura', name: 'Ratnapura' }
    ];

    const productionTrends = [
        { month: 'Jan', production: 2400, yield: 3.2, area: 750 },
        { month: 'Feb', production: 2200, yield: 3.1, area: 710 },
        { month: 'Mar', production: 2800, yield: 3.5, area: 800 },
        { month: 'Apr', production: 3200, yield: 3.8, area: 840 },
        { month: 'May', production: 3800, yield: 4.2, area: 900 },
        { month: 'Jun', production: 4200, yield: 4.5, area: 930 },
        { month: 'Jul', production: 3900, yield: 4.3, area: 910 },
        { month: 'Aug', production: 3600, yield: 4.0, area: 890 },
        { month: 'Sep', production: 3200, yield: 3.7, area: 860 },
        { month: 'Oct', production: 2800, yield: 3.4, area: 820 },
        { month: 'Nov', production: 2600, yield: 3.2, area: 810 },
        { month: 'Dec', production: 2400, yield: 3.0, area: 800 }
    ];

    const districtComparison = [
        { district: 'Anuradhapura', production: 4200, change: 12.5, trend: 'up' },
        { district: 'Kurunegala', production: 3800, change: 8.3, trend: 'up' },
        { district: 'Ratnapura', production: 3200, change: -2.1, trend: 'down' },
        { district: 'Kandy', production: 2900, change: 5.7, trend: 'up' },
        { district: 'Galle', production: 2400, change: -4.2, trend: 'down' },
        { district: 'Colombo', production: 1800, change: 1.5, trend: 'up' }
    ];

    const seasonalData = [
        { name: 'Maha', value: 65, color: '#22c55e' },
        { name: 'Yala', value: 35, color: '#3b82f6' }
    ];

    const topPerformers = [
        { district: 'Anuradhapura', metric: '4.8 MT/Ha', badge: 'Top Yield' },
        { district: 'Kurunegala', metric: '4200 MT', badge: 'Highest Production' },
        { district: 'Kandy', metric: '+15.2%', badge: 'Best Growth' }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">District Trends</h1>
                    <p className="text-gray-600">Analyze production patterns and performance across districts</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent>
                            {districts.map(district => (
                                <SelectItem key={district.id} value={district.id}>
                                    {district.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Top Performers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topPerformers.map((performer, index) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Badge variant="secondary" className="mb-2">{performer.badge}</Badge>
                                    <p className="font-semibold text-gray-900">{performer.district}</p>
                                    <p className="text-2xl font-bold text-green-600">{performer.metric}</p>
                                </div>
                                <MapPin className="h-8 w-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Charts */}
            <Tabs defaultValue="trends" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="trends">Production Trends</TabsTrigger>
                    <TabsTrigger value="comparison">District Comparison</TabsTrigger>
                    <TabsTrigger value="seasonal">Seasonal Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="trends">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Production Trends</CardTitle>
                            <CardDescription>Production, yield, and area trends over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={productionTrends}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="production" stroke="#22c55e" strokeWidth={2} />
                                        <Line type="monotone" dataKey="yield" stroke="#3b82f6" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="comparison">
                    <Card>
                        <CardHeader>
                            <CardTitle>District Performance Comparison</CardTitle>
                            <CardDescription>Production levels and year-over-year changes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80 mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={districtComparison}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="district" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="production" fill="#22c55e" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-3">
                                {districtComparison.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <MapPin className="h-5 w-5 text-gray-500" />
                                            <div>
                                                <p className="font-medium">{item.district}</p>
                                                <p className="text-sm text-gray-600">{item.production} MT</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {item.trend === 'up' ? (
                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <TrendingDown className="h-4 w-4 text-red-500" />
                                            )}
                                            <span className={`font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="seasonal">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Seasonal Distribution</CardTitle>
                                <CardDescription>Production by cultivation season</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={seasonalData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                dataKey="value"
                                                label={({ name, value }) => `${name}: ${value}%`}
                                            >
                                                {seasonalData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Key Insights</CardTitle>
                                <CardDescription>Important trends and observations</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                                        <p className="font-medium text-green-800">Strong Maha Season</p>
                                        <p className="text-sm text-green-600">Maha season accounts for 65% of total production</p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                        <p className="font-medium text-blue-800">District Leadership</p>
                                        <p className="text-sm text-blue-600">Anuradhapura leads in both yield and total production</p>
                                    </div>
                                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                                        <p className="font-medium text-yellow-800">Growth Opportunity</p>
                                        <p className="text-sm text-yellow-600">Western districts show potential for yield improvement</p>
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
