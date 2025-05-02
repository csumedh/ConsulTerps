from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import os
import json
import uuid

static_dir = os.path.join(os.path.dirname(__file__), "build")
app = Flask(__name__, static_folder=static_dir, static_url_path="")
CORS(app)

# Load Excel scoring matrix
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

# ================
# Save & Retrieve
# ================
RESULTS_FILE = os.path.join(os.path.dirname(__file__), "results.json")

def load_results():
    if not os.path.exists(RESULTS_FILE):
        return []
    with open(RESULTS_FILE, "r") as f:
        return json.load(f)

def save_result_entry(entry):
    results = load_results()
    results.append(entry)
    with open(RESULTS_FILE, "w") as f:
        json.dump(results, f, indent=2)

@app.route("/save-result", methods=["POST"])
def save_result():
    data = request.get_json()
    recommendations = data.get("recommendations", [])
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()

    if not recommendations:
        return jsonify({"error": "Missing recommendations"}), 400

    results = load_results()
    for entry in results:
        if entry.get("name", "").lower() == name.lower() and entry.get("recommendations") == recommendations:
            if not email or entry.get("email", "").lower() == email.lower():
                return jsonify({"id": entry["id"]})

    new_id = "CT-" + uuid.uuid4().hex[:6]
    new_entry = {
        "id": new_id,
        "name": name,
        "email": email,
        "recommendations": recommendations
    }
    save_result_entry(new_entry)
    return jsonify({"id": new_id})

@app.route("/results/<id>", methods=["GET"])
def get_result(id):
    results = load_results()
    result = next((r for r in results if r["id"] == id), None)
    if result:
        return jsonify(result)
    return jsonify({"error": "Result not found"}), 404

# Serve frontend
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_spa(path):
    full_path = os.path.join(app.static_folder, path)
    if path != "" and os.path.exists(full_path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True)
