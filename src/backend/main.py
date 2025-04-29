from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, FileResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import pandas as pd
import os

app = FastAPI()

# Allow CORS for frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:3000"] if you want restricted
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files serving
static_dir = os.path.join(os.path.dirname(__file__), "build")
app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")

# Load scoring matrix
excel_file_path = os.path.join(os.path.dirname(__file__), "..", "data", "framework_matrix.xlsx")
try:
    df = pd.read_excel(excel_file_path)
    scoring_data = df.to_dict(orient="records")
except Exception as e:
    print(f"❌ Error reading Excel file: {e}")
    scoring_data = []

framework_data = [
    {"factor": "Team Size", "weight": 3},
    {"factor": "Cross-functional Teams", "weight": 2},
    {"factor": "Deliverable Frequency", "weight": 2},
    {"factor": "Flexibility of Changes", "weight": 2},
    {"factor": "Project Type", "weight": 1},
    {"factor": "Triple Constraint Priority", "weight": 3},
    {"factor": "Workflow Flexibility", "weight": 2},
    {"factor": "Regulations", "weight": 1},
    {"factor": "Use of Tools", "weight": 1},
]

frameworks = [
    "Scrum", "SAFe", "Six Sigma", "PRINCE2", "Stage-Gate",
    "Kanban", "LeSS", "Waterfall", "Disciplined Agile", "Crystal"
]

@app.post("/recommend")
async def recommend(request: Request):
    data = await request.json()
    answers = data.get("answers", {})

    total_scores = {fw: 0 for fw in frameworks}
    fives_count = {fw: 0 for fw in frameworks}

    for item in framework_data:
        factor = item["factor"]
        weight = item["weight"]
        selected = answers.get(factor)
        if not selected:
            continue
        row = next((r for r in scoring_data if r.get("Factor") == factor and r.get("Option") == selected), None)
        if row:
            for fw in frameworks:
                try:
                    score = float(row.get(fw, 0))
                except Exception:
                    score = 0
                total_scores[fw] += score * weight
                if score == 5:
                    fives_count[fw] += 1

    sorted_frameworks = sorted(frameworks, key=lambda fw: (total_scores[fw], fives_count[fw]), reverse=True)
    top3 = sorted_frameworks[:3]

    return JSONResponse({
        "recommendations": top3,
        "totalScores": total_scores,
        "fivesCount": fives_count
    })

# Handle fallback for non-API routes (send React index.html)
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return RedirectResponse("/")
