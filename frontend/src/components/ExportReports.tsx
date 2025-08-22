"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

import { collection, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {db} from "@/firebaseConfig.ts";

export const ExportReports: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleExportExcel = async () => {
        setLoading(true);
        try {
            // get uid from localStorage
            const uid = localStorage.getItem("uid");
            if (!uid) {
                alert("No UID found in localStorage");
                setLoading(false);
                return;
            }

            // fetch predictions
            const snapshot = await getDocs(collection(db, "predictions"));
            const records: any[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.uid === uid) {
                    records.push(data);
                }
            });

            if (records.length === 0) {
                alert("No records found for this user.");
                setLoading(false);
                return;
            }

            // convert to worksheet
            const worksheet = XLSX.utils.json_to_sheet(records);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Predictions");

            // generate Excel buffer
            const excelBuffer = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });

            // save file
            const blob = new Blob([excelBuffer], {
                type: "application/octet-stream",
            });
            saveAs(blob, `predictions_${uid}.xlsx`);
        } catch (error) {
            console.error("Error exporting Excel:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Export Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleExportExcel} disabled={loading}>
                        <Download className="h-4 w-4 mr-2" />
                        {loading ? "Generating..." : "Export to Excel"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};
