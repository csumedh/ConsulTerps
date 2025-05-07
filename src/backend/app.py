from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import pandas as pd
import os
import json
import uuid

# Serve from local build folder
static_dir = os.path.join(os.path.dirname(__file__), "build")
app = Flask(__name__, static_folder=static_dir, static_url_path="")
CORS(app)

# Load Excel scoring matrix
excel_file_path = os.path.join(os.path.dirname(__file__), "..", "data", "Framework_matrix_new.xlsx")
try:
    df = pd.read_excel(excel_file_path)
    scoring_data = df.to_dict(orient="records")
except Exception as e:
    print(f"❌ Error reading Excel file: {e}")
    scoring_data = []

# Extract all frameworks from the sheet (excluding 'Factor', 'Option', 'Multiplying weight')
if scoring_data:
    all_columns = df.columns.tolist()
    frameworks = [col for col in all_columns if col not in ["Factor", "Option", "Multiplying weight"]]
else:
    frameworks = []

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    answers = data.get("answers", {})
    total_scores = {fw: 0 for fw in frameworks}
    fives_count = {fw: 0 for fw in frameworks}

    for row in scoring_data:
        factor = row.get("Factor")
        option = row.get("Option")
        weight = row.get("Multiplying weight", 1)

        selected = answers.get(factor)
        if selected != option:
            continue

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

@app.errorhandler(404)
def not_found(e):
    return send_file(os.path.join(app.static_folder, "index.html"))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)