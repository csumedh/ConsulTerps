from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__, static_folder="../build", static_url_path="")  
# Note: We assume the React build output will be placed in a folder called "build" at the project root.
CORS(app)  # Enable CORS for all routes

# --- Load Scoring Data from Excel ---

# Path to the Excel file relative to the backend folder.
excel_file_path = os.path.join("..", "src", "data", "framework_matrix.xlsx")
try:
    df = pd.read_excel(excel_file_path)
except Exception as e:
    print(f"Error reading Excel file: {e}")
    df = pd.DataFrame()

# Convert the dataframe to a list of dicts
scoring_data = df.to_dict(orient="records")

# --- Define framework factors and their weights ---
# (Change these weight values here to adjust scoring as desired)
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

# --- List of Framework Names ---
# These names must correspond to column headers in your Excel file.
frameworks = [
    "Scrum",
    "SAFe",
    "Six Sigma",
    "PRINCE2",
    "Stage-Gate",
    "Kanban",
    "LeSS",
    "Waterfall",
    "Disciplined Agile",
    "Crystal"
]

# --- API Endpoint: Recommendation Calculation ---
@app.route("/recommend", methods=["POST"])
def recommend():
    """
    Expects a JSON payload:
    { "answers": { "Team Size": "Small (1-10 people)", "Cross-functional Teams": "Yes", ... } }
    Returns the top 3 framework recommendations.
    """
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
        # Find the row that matches the factor and the user's selected option.
        matching_rows = [
            row for row in scoring_data
            if row.get("Factor") == factor and row.get("Option") == selected
        ]
        if matching_rows:
            row = matching_rows[0]
            for fw in frameworks:
                try:
                    score = float(row.get(fw, 0))
                except Exception:
                    score = 0
                total_scores[fw] += score * weight
                if score == 5:
                    fives_count[fw] += 1

    # Sort frameworks by score (using fives count as tie-breaker)
    sorted_frameworks = sorted(
        frameworks,
        key=lambda fw: (total_scores[fw], fives_count[fw]),
        reverse=True
    )
    top3 = sorted_frameworks[:3]

    return jsonify({
        "recommendations": top3,
        "totalScores": total_scores,
        "fivesCount": fives_count
    })

# --- Serve React Build Assets ---
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    """
    Serves static files from the React build folder.
    If a file is not found, sends index.html.
    """
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == '__main__':
    # In production, set debug=False
    app.run(debug=True)
