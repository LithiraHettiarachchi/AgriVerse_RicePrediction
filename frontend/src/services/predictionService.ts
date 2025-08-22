
export interface PredictionRequest {
    year: number;
    season: string;
    district: string;
    sown_hect: number;
    previous_yield: number;
    previous_production: number;
}

export async function predictProduction(
    data: PredictionRequest,
    token: string
) {
    const response = await fetch("http://127.0.0.1:8000/production/predict", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
    }

    return await response.json();
}
