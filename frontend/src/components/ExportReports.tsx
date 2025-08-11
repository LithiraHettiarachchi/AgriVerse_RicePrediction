import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Download,
    FileText,
    BarChart3,
    Calendar,
    Mail,
    Settings,
    Clock,
    CheckCircle,
    AlertCircle,
    Filter
} from 'lucide-react';

export const ExportReports: React.FC = () => {
    const [selectedReportType, setSelectedReportType] = useState('production');
    const [selectedFormat, setSelectedFormat] = useState('pdf');
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');
    const [includeCharts, setIncludeCharts] = useState(true);
    const [includeAnalysis, setIncludeAnalysis] = useState(true);
    const [emailDelivery, setEmailDelivery] = useState(false);

    const reportTypes = [
        {
            id: 'production',
            name: 'Production Summary',
            description: 'Comprehensive production statistics and trends',
            icon: BarChart3,
            size: '2.3 MB',
            pages: '12-15'
        },
        {
            id: 'district',
            name: 'District Analysis',
            description: 'District-wise performance and comparisons',
            icon: FileText,
            size: '1.8 MB',
            pages: '8-10'
        },
        {
            id: 'historical',
            name: 'Historical Trends',
            description: 'Long-term patterns and forecasting',
            icon: Calendar,
            size: '3.1 MB',
            pages: '15-20'
        },
        {
            id: 'weather',
            name: 'Weather Impact',
            description: 'Climate effects on agricultural output',
            icon: AlertCircle,
            size: '1.5 MB',
            pages: '6-8'
        }
    ];

    const recentExports = [
        {
            id: 1,
            name: 'Production Summary - December 2024',
            type: 'PDF',
            date: '2024-12-15',
            status: 'completed',
            size: '2.3 MB'
        },
        {
            id: 2,
            name: 'District Analysis - Q4 2024',
            type: 'Excel',
            date: '2024-12-14',
            status: 'completed',
            size: '1.8 MB'
        },
        {
            id: 3,
            name: 'Historical Trends - 2019-2024',
            type: 'PDF',
            date: '2024-12-13',
            status: 'processing',
            size: '3.1 MB'
        },
        {
            id: 4,
            name: 'Weather Impact - Maha 2024',
            type: 'CSV',
            date: '2024-12-12',
            status: 'completed',
            size: '890 KB'
        }
    ];

    const scheduledReports = [
        {
            id: 1,
            name: 'Monthly Production Report',
            schedule: 'Every 1st of month',
            format: 'PDF',
            recipients: 3,
            status: 'active'
        },
        {
            id: 2,
            name: 'Weekly District Summary',
            schedule: 'Every Monday',
            format: 'Excel',
            recipients: 5,
            status: 'active'
        },
        {
            id: 3,
            name: 'Seasonal Analysis',
            schedule: 'Every 6 months',
            format: 'PDF',
            recipients: 2,
            status: 'paused'
        }
    ];

    const customizationOptions = [
        { id: 'charts', label: 'Include Charts & Graphs', checked: includeCharts },
        { id: 'analysis', label: 'Include Analysis Section', checked: includeAnalysis },
        { id: 'raw_data', label: 'Include Raw Data Tables', checked: false },
        { id: 'weather', label: 'Include Weather Data', checked: true },
        { id: 'forecasts', label: 'Include Forecasts', checked: true },
        { id: 'recommendations', label: 'Include Recommendations', checked: false }
    ];

    const handleGenerateReport = () => {
        console.log('Generating report...', {
            type: selectedReportType,
            format: selectedFormat,
            period: selectedPeriod,
            options: {
                includeCharts,
                includeAnalysis,
                emailDelivery
            }
        });
    };

    const handleCheckboxChange = (optionId: string, checked: boolean | "indeterminate") => {
        const isChecked = checked === true;
        if (optionId === 'charts') setIncludeCharts(isChecked);
        if (optionId === 'analysis') setIncludeAnalysis(isChecked);
    };

    const handleEmailDeliveryChange = (checked: boolean | "indeterminate") => {
        setEmailDelivery(checked === true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'active':
                return 'bg-blue-100 text-blue-800';
            case 'paused':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Export Reports</h1>
                <p className="text-gray-600">Generate and download comprehensive agricultural reports</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Report Generation */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Generate New Report</CardTitle>
                            <CardDescription>Create custom reports with your preferred settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Report Type Selection */}
                            <div>
                                <Label className="text-base font-semibold mb-4 block">Select Report Type</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {reportTypes.map((type) => (
                                        <div
                                            key={type.id}
                                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                                selectedReportType === type.id
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            onClick={() => setSelectedReportType(type.id)}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <type.icon className={`h-5 w-5 mt-1 ${
                                                    selectedReportType === type.id ? 'text-green-600' : 'text-gray-400'
                                                }`} />
                                                <div className="flex-1">
                                                    <p className="font-medium">{type.name}</p>
                                                    <p className="text-sm text-gray-600">{type.description}</p>
                                                    <div className="flex space-x-4 mt-2">
                                                        <span className="text-xs text-gray-500">~{type.size}</span>
                                                        <span className="text-xs text-gray-500">{type.pages} pages</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Configuration */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="format">Export Format</Label>
                                    <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pdf">PDF Document</SelectItem>
                                            <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                                            <SelectItem value="csv">CSV Data</SelectItem>
                                            <SelectItem value="powerpoint">PowerPoint</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="period">Time Period</Label>
                                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="quarterly">Quarterly</SelectItem>
                                            <SelectItem value="yearly">Yearly</SelectItem>
                                            <SelectItem value="custom">Custom Range</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="district">District Filter</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Districts" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Districts</SelectItem>
                                            <SelectItem value="colombo">Colombo</SelectItem>
                                            <SelectItem value="kandy">Kandy</SelectItem>
                                            <SelectItem value="galle">Galle</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Customization Options */}
                            <div>
                                <Label className="text-base font-semibold mb-4 block">Customization Options</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {customizationOptions.map((option) => (
                                        <div key={option.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={option.id}
                                                checked={option.checked}
                                                onCheckedChange={(checked) => handleCheckboxChange(option.id, checked)}
                                            />
                                            <Label htmlFor={option.id} className="text-sm cursor-pointer">
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Email Delivery */}
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-2 mb-3">
                                    <Checkbox
                                        id="email_delivery"
                                        checked={emailDelivery}
                                        onCheckedChange={handleEmailDeliveryChange}
                                    />
                                    <Label htmlFor="email_delivery" className="font-medium cursor-pointer">
                                        Email Delivery
                                    </Label>
                                </div>
                                {emailDelivery && (
                                    <div className="space-y-3">
                                        <Input placeholder="Enter email addresses (comma separated)" />
                                        <Input placeholder="Subject line (optional)" />
                                    </div>
                                )}
                            </div>

                            {/* Generate Button */}
                            <div className="flex space-x-3">
                                <Button onClick={handleGenerateReport} className="flex-1">
                                    <Download className="h-4 w-4 mr-2" />
                                    Generate Report
                                </Button>
                                <Button variant="outline">
                                    <Settings className="h-4 w-4 mr-2" />
                                    Save Template
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions & Status */}
                <div className="space-y-6">
                    {/* Quick Export */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Export</CardTitle>
                            <CardDescription>Generate common reports instantly</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                                <BarChart3 className="h-4 w-4 mr-2" />
                                Current Month Summary
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Calendar className="h-4 w-4 mr-2" />
                                District Comparison
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <FileText className="h-4 w-4 mr-2" />
                                Seasonal Analysis
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Export Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Export Status</CardTitle>
                            <CardDescription>Current generation progress</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Ready to generate</span>
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                </div>
                                <div className="text-xs text-gray-500">
                                    No active exports in queue
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Recent Exports */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Exports</CardTitle>
                    <CardDescription>Your previously generated reports</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Report Name</TableHead>
                                <TableHead>Format</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentExports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-medium">{report.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{report.type}</Badge>
                                    </TableCell>
                                    <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(report.status)}>
                                            {report.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{report.size}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Scheduled Reports */}
            <Card>
                <CardHeader>
                    <CardTitle>Scheduled Reports</CardTitle>
                    <CardDescription>Automated report generation</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Report Name</TableHead>
                                <TableHead>Schedule</TableHead>
                                <TableHead>Format</TableHead>
                                <TableHead>Recipients</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {scheduledReports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-medium">{report.name}</TableCell>
                                    <TableCell>{report.schedule}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{report.format}</Badge>
                                    </TableCell>
                                    <TableCell>{report.recipients}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(report.status)}>
                                            {report.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-1">
                                            <Button variant="ghost" size="sm">
                                                <Settings className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Mail className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
