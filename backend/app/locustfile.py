from locust import HttpUser, task, between
import random

class PredictionUser(HttpUser):
    wait_time = between(1, 2)  # Wait between requests (in seconds)

    @task
    def predict_yala(self):
        payload = {
            "year": random.randint(2000, 2024),
            "season": "Yala",
            "district": "ANURADHAPURA",
            "sown_hect": round(random.uniform(1000.0, 5000.0), 2),
            "previous_yield": round(random.uniform(3000.0, 8000.0), 2)
        }

        with self.client.post("/predict/", json=payload, catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Failed with status code {response.status_code}")
