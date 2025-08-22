"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "@/firebaseConfig.ts";

type PredictionRecord = {
    createdAt: string;
    district: string;
    predicted_extent: number;
    predicted_production: number;
    prediction_id: string;
    previous_yield: number;
    season: string;
    sown_hect: number;
    uid: string;
    year: number;
};

export const HistoricalAnalysis: React.FC = () => {
    const [records, setRecords] = useState<PredictionRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const uid = localStorage.getItem("uid");
                if (!uid) {
                    console.warn("No UID found in localStorage");
                    setLoading(false);
                    return;
                }

                const q = query(
                    collection(db, "predictions"),
                    where("uid", "==", uid)
                );

                const querySnapshot = await getDocs(q);
                const data: PredictionRecord[] = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                })) as PredictionRecord[];

                setRecords(data);
            } catch (error) {
                console.error("Error fetching prediction records:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    if (loading) {
        return <p className="text-gray-500">Loading history...</p>;
    }

    if (!records.length) {
        return <p className="text-gray-500">No history records found.</p>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">User Prediction History</h1>
            <p className="text-gray-600">Showing past prediction records</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {records.map((record, index) => (
                    <Card key={index} className="shadow-md">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{record.district}</CardTitle>
                                <Badge>{record.season}</Badge>
                            </div>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                <Calendar className="h-4 w-4" /> Year: {record.year}
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Predicted Extent</span>
                                <span className="font-semibold">
                  {record.predicted_extent?.toLocaleString()} Ha
                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Predicted Production</span>
                                <span className="font-semibold">
                  {record.predicted_production?.toLocaleString()} MT
                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Previous Yield</span>
                                <span className="font-semibold">{record.previous_yield}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Sown Area</span>
                                <span className="font-semibold">
                  {record.sown_hect?.toLocaleString()} Ha
                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Prediction ID</span>
                                <span className="text-xs text-gray-500">{record.prediction_id}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
