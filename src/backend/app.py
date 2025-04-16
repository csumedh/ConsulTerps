from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import os

# Correct static folder path relative to backend
static_dir = os.path.join(os.path.dirname(__file__), "build")

app = Flask(__name__, static_folder=static_dir, static_url_path="")
CORS(app)

# Load scoring matrix
excel_path = os.path.join(os.path.dirname(__file__), "..", "data", "framework_matrix.xlsx")
try:
    df = pd.read_excel(excel_path)
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

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
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

    return jsonify({
        "recommendations": top3,
        "totalScores": total_scores,
        "fivesCount": fives_count
    })

# Fallback for React routes like /recommender or /faq
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_spa(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True)
