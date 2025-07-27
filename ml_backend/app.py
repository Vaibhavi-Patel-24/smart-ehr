# from flask import Flask, request, jsonify
# import pickle
# import pandas as pd
# from flask_cors import CORS
# import numpy as np

# app = Flask(__name__)
# CORS(app)

# # Load model and supporting data
# with open("rf_model.pkl", "rb") as f:
#     model = pickle.load(f)

# with open("label_encoder.pkl", "rb") as f:
#     le = pickle.load(f)

# with open("symptom_list.pkl", "rb") as f:
#     all_symptoms = pickle.load(f)

# # Lowercase the reference symptoms once for comparison
# all_symptoms_lower = [s.lower() for s in all_symptoms]

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json
#         symptoms = data.get("symptoms", [])
#         print("Received symptoms from frontend:", symptoms)

#         # Normalize incoming symptoms
#         symptoms_lower = [s.strip().lower() for s in symptoms]

#         # Create input vector
#         input_vector = [1 if symptom in symptoms_lower else 0 for symptom in all_symptoms_lower]
#         print("Input vector sent to model:", input_vector)

#         input_df = pd.DataFrame([input_vector], columns=all_symptoms_lower)

#         # Predict
#         probas = model.predict_proba(input_df)[0]
#         top_indices = probas.argsort()[-3:][::-1]
#         top_diseases = le.inverse_transform(top_indices)
#         top_confidence = [round(probas[i] * 100, 2) for i in top_indices]

#         return jsonify([
#             {"disease": d, "confidence": c}
#             for d, c in zip(top_diseases, top_confidence)
#         ])
#     except Exception as e:
#         print("Prediction error:", str(e))
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True, port=8000)


from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

# Load models and encoders
with open("rf_disease.pkl", "rb") as f:
    rf_disease = pickle.load(f)

with open("rf_specialization.pkl", "rb") as f:
    rf_specialization = pickle.load(f)

with open("disease_encoder.pkl", "rb") as f:
    disease_encoder = pickle.load(f)

with open("specialization_encoder.pkl", "rb") as f:
    specialization_encoder = pickle.load(f)

# All symptom column names (from training)
all_symptoms = rf_disease.feature_names_in_  # Automatically saved in sklearn >=1.0
all_symptoms_lower = [s.lower() for s in all_symptoms]

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        symptoms = data.get("symptoms", [])
        print("Received symptoms:", symptoms)

        # Normalize input
        symptoms_normalized = [s.strip().lower().replace(" ", "_") for s in symptoms]

        # Create binary vector
        input_vector = [1 if symptom in symptoms_normalized else 0 for symptom in all_symptoms_lower]
        input_np = np.array(input_vector).reshape(1, -1)

        # Predict Disease
        disease_encoded = rf_disease.predict(input_np)[0]
        disease_label = disease_encoder.inverse_transform([disease_encoded])[0]

        # Predict Specialization
        specialization_encoded = rf_specialization.predict(input_np)[0]
        specialization_label = specialization_encoder.inverse_transform([specialization_encoded])[0]

        # Send response
        return jsonify({
            "disease": disease_label,
            "specialization": specialization_label
        })

    except Exception as e:
        print("Prediction error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8000)
