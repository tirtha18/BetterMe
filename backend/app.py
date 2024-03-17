from flask import Flask, request, session, jsonify
from models import db, Doctor, Patient, Appointment, Post
from flask_cors import CORS
from config import ApplicationConfig
from flask import Flask, render_template 
# flask app
import numpy as np
import pickle
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import os
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import re
from dotenv import load_dotenv
import google.generativeai as genai
from PIL import Image
from flask_cors import CORS
load_dotenv() ## load all the environment variables




#glbal session-------------------------------------------------------------------------
global_session = {}
#visual serch model gen ai-------------------------------------------------------------------------------------------------
def get_gemini_repsonse(input_prompt,image,input_text):
    model=genai.GenerativeModel('gemini-pro-vision')
    response=model.generate_content([input_prompt,image[0],input_text])
    return response.text

def input_image_setup(uploaded_file):
    # Check if a file has been uploaded
    if uploaded_file is not None:
        # Read the file into bytes
        bytes_data = uploaded_file.getvalue()

        # Set the MIME type for the image (e.g., 'image/jpeg' or 'image/png')
        mime_type = uploaded_file.mimetype

        image_parts = [
            {
                "mime_type": mime_type,
                "data": bytes_data
            }
        ]
        return image_parts
    else:
        raise FileNotFoundError("No file uploaded")
    
input_prompt = """
You are an expert in nutritionist where you need to see the food items from the image
and calculate the total calories, also provide the details of every food items with calories intake.

Consultation:
Respond based on input text requirement
"""


#GEN AI diet and work out recommendatio model

os.environ["GOOGLE_API_KEY"] = 'AIzaSyA9RMV94gUXQTMLlXvfFH5L_oOv6xsHVwU'
from langchain_google_genai import GoogleGenerativeAI 

generation_config = {"temperature": 0.7, "top_p": 1, "top_k": 1, "max_output_tokens": 4000}

model = GoogleGenerativeAI(  model="gemini-pro", 
                           generation_config=generation_config  )
from langchain.chains import LLMChain

from langchain.prompts import PromptTemplate

prompt= PromptTemplate(
    
    input_variables=['age', 'weight', 'gender', 'height',  'foodtype', 'disease', 'diability_if_any', 'location'],
    template="Your HealthSync Advisor:\n"
             "you are an expert . now recommend me 10 breakfast names, 10 dinner names, and 10 workout names,"
               "based on the following data\n"
             " Age: {age}\n"
             "Weight: {weight}\n"
             "Gender: {gender}\n"
             "Height: {height}\n"
             " Dietary Preferences: {foodtype}\n"
             "Generic disease: {disease}\n"
             " Disability:{diability_if_any}\n"
             " Location: {location}\n"  
)

chain = LLMChain(llm=model, prompt=prompt,verbose=True)

#loading all dataset----
precautions = pd.read_csv("dataset/precautions_df.csv")
description = pd.read_csv("dataset/description.csv")
medications = pd.read_csv('dataset/medications.csv')

# load model===========================================
svc = pickle.load(open('model/svc.pkl','rb'))

#EKHANE HATT DIBI NA  !!!!
#load jupyter code------------------
symptoms_dict = {'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3, 'shivering': 4, 'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8, 'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12, 'spotting_ urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16, 'cold_hands_and_feets': 17, 'mood_swings': 18, 'weight_loss': 19, 'restlessness': 20, 'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24, 'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28, 'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32, 'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36, 'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40, 'mild_fever': 41, 'yellow_urine': 42, 'yellowing_of_eyes': 43, 'acute_liver_failure': 44, 'fluid_overload': 45, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47, 'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50, 'throat_irritation': 51, 'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54, 'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58, 'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61, 'irritation_in_anus': 62, 'neck_pain': 63, 'dizziness': 64, 'cramps': 65, 'bruising': 66, 'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69, 'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71, 'brittle_nails': 72, 'swollen_extremeties': 73, 'excessive_hunger': 74, 'extra_marital_contacts': 75, 'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78, 'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82, 'movement_stiffness': 83, 'spinning_movements': 84, 'loss_of_balance': 85, 'unsteadiness': 86, 'weakness_of_one_body_side': 87, 'loss_of_smell': 88, 'bladder_discomfort': 89, 'foul_smell_of urine': 90, 'continuous_feel_of_urine': 91, 'passage_of_gases': 92, 'internal_itching': 93, 'toxic_look_(typhos)': 94, 'depression': 95, 'irritability': 96, 'muscle_pain': 97, 'altered_sensorium': 98, 'red_spots_over_body': 99, 'belly_pain': 100, 'abnormal_menstruation': 101, 'dischromic _patches': 102, 'watering_from_eyes': 103, 'increased_appetite': 104, 'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107, 'rusty_sputum': 108, 'lack_of_concentration': 109, 'visual_disturbances': 110, 'receiving_blood_transfusion': 111, 'receiving_unsterile_injections': 112, 'coma': 113, 'stomach_bleeding': 114, 'distention_of_abdomen': 115, 'history_of_alcohol_consumption': 116, 'fluid_overload.1': 117, 'blood_in_sputum': 118, 'prominent_veins_on_calf': 119, 'palpitations': 120, 'painful_walking': 121, 'pus_filled_pimples': 122, 'blackheads': 123, 'scurring': 124, 'skin_peeling': 125, 'silver_like_dusting': 126, 'small_dents_in_nails': 127, 'inflammatory_nails': 128, 'blister': 129, 'red_sore_around_nose': 130, 'yellow_crust_ooze': 131}
diseases_list = {15: 'Fungal infection', 4: 'Allergy', 16: 'GERD', 9: 'Chronic cholestasis', 14: 'Drug Reaction', 33: 'Peptic ulcer diseae', 1: 'AIDS', 12: 'Diabetes ', 17: 'Gastroenteritis', 6: 'Bronchial Asthma', 23: 'Hypertension ', 30: 'Migraine', 7: 'Cervical spondylosis', 32: 'Paralysis (brain hemorrhage)', 28: 'Jaundice', 29: 'Malaria', 8: 'Chicken pox', 11: 'Dengue', 37: 'Typhoid', 40: 'hepatitis A', 19: 'Hepatitis B', 20: 'Hepatitis C', 21: 'Hepatitis D', 22: 'Hepatitis E', 3: 'Alcoholic hepatitis', 36: 'Tuberculosis', 10: 'Common Cold', 34: 'Pneumonia', 13: 'Dimorphic hemmorhoids(piles)', 18: 'Heart attack', 39: 'Varicose veins', 26: 'Hypothyroidism', 24: 'Hyperthyroidism', 25: 'Hypoglycemia', 31: 'Osteoarthristis', 5: 'Arthritis', 0: '(vertigo) Paroymsal  Positional Vertigo', 2: 'Acne', 38: 'Urinary tract infection', 35: 'Psoriasis', 27: 'Impetigo'}

# Model Prediction function
def predictDisease(patient_symptoms):
    # Your existing code for predicting the disease
    input_vector = np.zeros(len(symptoms_dict))
    for item in patient_symptoms:
        input_vector[symptoms_dict[item]] = 1
    predicted_disease = diseases_list[svc.predict([input_vector])[0]]

    # Store the predicted disease in the session object
    global_session['predicted_disease'] = predicted_disease

    return predicted_disease

def func(predicted_disease):
    desc = description[description['Disease'] == predicted_disease]['Description']
    desc = " ".join([w for w in desc])

    pre = precautions[precautions['Disease'] == predicted_disease][['Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']]
    
    pre = pre.apply(lambda col: col.dropna().tolist(), axis=1).tolist()
    #pre=[col for col in pre.values]

    med = medications[medications['Disease'] == predicted_disease]['Medication']
    med = [med for med in med.values]

    return desc,pre,med

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
cors = CORS(app, origins=['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'], supports_credentials=True)
db.init_app(app) 

@app.route('/login', methods=['POST', 'GET'])
def login():
    with app.app_context():
        data = request.json
        email = data.get('email')
        password = data.get('password')
        patient = Patient.query.filter_by(email=email, password=password).first()
        doctor = Doctor.query.filter_by(email=email, password=password).first()
        if patient:
            session['user_id'] = patient.id
            session['user_type'] = 'patient'
            return jsonify({'message': 'Login successful', 'user_id': patient.id, 'user_type': 'patient'}), 200
        elif doctor:
            session['user_id'] = doctor.id
            session['user_type'] = 'doctor'
            return jsonify({'message': 'Login successful', 'user_id': doctor.id, 'user_type': 'doctor'}), 200
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
@app.route('/check-login', methods =['GET'])
def check_login():
    if 'user_id' in session:
        return jsonify({'isLoggedIn': True, 'userType': session['user_type']})
    else:
        return jsonify({'isLoggedIn': True, 'userType': None}), 401

@app.route('/logout')
def logout():
    with app.app_context():
        session.pop('user_id', None)
        session.pop('user_type', None)
        return jsonify({'message': 'Logout successful'}), 200

@app.route('/register/patient', methods=['POST'])
def register_patient():
    with app.app_context():
        data = request.json
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        if Patient.query.filter_by(email=email).first():
            return jsonify({'message': 'Email already exists'}), 400
        new_patient = Patient(name=name, email=email, password=password)
        db.session.add(new_patient)
        db.session.commit()
        return jsonify({'message': 'Patient registered successfully'}), 200
    
@app.route('/register/doctor', methods=['POST'])
def register_doctor():
    with app.app_context():
        data = request.json
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        specialization = data.get('specialization')
        time_slot = data.get('time_slot')
        if not specialization:
            return jsonify({'message' : 'Choose your specialization'}), 400
        if not time_slot:
            return jsonify({'message' : 'Choose your time slot'}), 400
        if Doctor.query.filter_by(email=email).first():
            return jsonify({'message': 'Email already exists'}), 400
        new_doctor = Doctor(name=name, email=email, password=password, specialization=specialization, time_slot=time_slot)
        db.session.add(new_doctor)
        db.session.commit()
        return jsonify({'message': 'Doctor registered successfully'}), 200

@app.route('/patient/me', methods=['GET'])
def get_patient():
    patient_id = session.get("user_id")
    if not patient_id:
        return jsonify({"error":"Unauthorized"}), 401
    patient = Patient.query.filter_by(id=patient_id).first()
    return jsonify({"id":patient.id, "email":patient.email, "name":patient.name}), 200

@app.route('/doctor/me', methods=['GET'])
def get_doctor():
    doctor_id = session.get("user_id")
    if not doctor_id:
        return jsonify({"error":"Unauthorized"}), 401
    doctor = Doctor.query.filter_by(id=doctor_id).first()
    return jsonify({"id":doctor.id, "email":doctor.email}), 200

@app.route('/bookappointment', methods=['POST'])
def book_appointment():
    try:
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'success': False, 'message': 'You must be logged in to book an appointment.'}), 401
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': 'Invalid request data.'}), 400
        doctor_id = data.get('doctor_id')
        doctor = Doctor.query.get(doctor_id)
        if not doctor:
            return jsonify({'success': False, 'message': 'Doctor not found.'}), 404
        time_slot = doctor.time_slot
        new_appointment = Appointment(doctor_id=doctor_id, patient_id=user_id, time_slot=time_slot)
        db.session.add(new_appointment)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Appointment booked successfully!', 'appointment_id': new_appointment.id, 'doctor_id' : doctor_id, 'time_slot' : time_slot}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/appointments/patient', methods=['GET'])
def get_appointment_patient():
    try:
        patient_id = session.get('user_id')
        if not patient_id:
            return jsonify({'success': False, 'message': 'You must be logged in to access your appointments.'}), 401
        appointments = Appointment.query.filter_by(patient_id=patient_id).all()
        if not appointments:
            return jsonify({'message': 'You have no appointments booked!'}), 404
        appointment_data = []
        for appointment in appointments: 
            appointment_data.append({
                'id': appointment.id,
                'doctor_id': appointment.doctor_id,
                'doctor_name' : Doctor.query.filter_by(id = appointment.doctor_id).first().name,  
                'patient_id': appointment.patient_id,  
                'time_slot': appointment.time_slot
            })
        return jsonify(appointment_data), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message' : 'Internal server error.'}), 500
    
@app.route('/get_doctors', methods=['GET'])
def get_doctors():
    Doctors = Doctor.query.all()
    if not Doctors:
        return jsonify({'message' : 'There are no doctors to show!'}), 404
    Doctor_data = []
    for doctor in Doctors: 
        Doctor_data.append({
            'id': doctor.id,
            'doctor_name' : doctor.name,  
            'time_slot': doctor.time_slot
        })
    return jsonify(Doctor_data), 200

@app.route('/doctors/cardiologists', methods=['GET'])
def get_cardiologists():
    doctors = Doctor.query.filter_by(specialization='Cardiologist').all()
    if not doctors:
        return jsonify({'message' : 'There are no cardiologists to show!'}), 404
    doctors_data = []
    for doctor in doctors: 
        doctors_data.append({
            'id': doctor.id,
            'doctor_name' : doctor.name,  
            'time_slot': doctor.time_slot
        })
    return jsonify(doctors_data), 200

@app.route('/doctors/pediatricians', methods=['GET'])
def get_pediatricians():
    doctors = Doctor.query.filter_by(specialization='Pediatrician').all()
    if not doctors:
        return jsonify({'message' : 'There are no pediatricians to show!'}), 404
    doctors_data = []
    for doctor in doctors: 
        doctors_data.append({
            'id': doctor.id,
            'doctor_name' : doctor.name,  
            'time_slot': doctor.time_slot
        })
    return jsonify(doctors_data), 200

@app.route('/doctors/endocrinologists', methods=['GET'])
def get_endocrinologists():
    doctors = Doctor.query.filter_by(specialization='Endocrinologist').all()
    if not doctors:
        return jsonify({'message' : 'There are no endocrinologists to show!'}), 404
    doctors_data = []
    for doctor in doctors: 
        doctors_data.append({
            'id': doctor.id,
            'doctor_name' : doctor.name,  
            'time_slot': doctor.time_slot
        })
    return jsonify(doctors_data), 200

@app.route('/doctors/generalphysicians', methods=['GET'])
def get_general_physicians():
    doctors = Doctor.query.filter_by(specialization='General Physician').all()
    if not doctors:
        return jsonify({'message' : 'There are no general physicians to show!'}), 404
    doctors_data = []
    for doctor in doctors: 
        doctors_data.append({
            'id': doctor.id,
            'doctor_name' : doctor.name,  
            'time_slot': doctor.time_slot
        })
    return jsonify(doctors_data), 200
@app.route('/doctors/gynecologists', methods=['GET'])
def get_gynecologists():
    doctors = Doctor.query.filter_by(specialization='Gynecologist').all()
    if not doctors:
        return jsonify({'message' : 'There are no gynecologists to show!'}), 404
    doctors_data = []
    for doctor in doctors: 
        doctors_data.append({
            'id': doctor.id,
            'doctor_name' : doctor.name,  
            'time_slot': doctor.time_slot
        })
    return jsonify(doctors_data), 200

@app.route('/doctors/neurologists', methods=['GET'])
def get_neurologists():
    doctors = Doctor.query.filter_by(specialization='Neurologist').all()
    if not doctors:
        return jsonify({'message' : 'There are no neurologists to show!'}), 404
    doctors_data = []
    for doctor in doctors: 
        doctors_data.append({
            'id': doctor.id,
            'doctor_name' : doctor.name,  
            'time_slot': doctor.time_slot
        })
    return jsonify(doctors_data), 200

@app.route('/doctors/dermatologists', methods=['GET'])
def get_dermatologists():
    doctors = Doctor.query.filter_by(specialization='Dermatologist').all()
    if not doctors:
        return jsonify({'message' : 'There are no dermatologists to show!'}), 404
    doctors_data = []
    for doctor in doctors: 
        doctors_data.append({
            'id': doctor.id,
            'doctor_name' : doctor.name,  
            'time_slot': doctor.time_slot
        })
    return jsonify(doctors_data), 200

@app.route('/doctors/psychiatrists', methods=['GET'])
def get_psychiatrists():
    doctors = Doctor.query.filter_by(specialization='Psychiatrist').all()
    if not doctors:
        return jsonify({'message' : 'There are no psychiatrists to show!'}), 404
    doctors_data = []
    for doctor in doctors: 
        doctors_data.append({
            'id': doctor.id,
            'doctor_name' : doctor.name,  
            'time_slot': doctor.time_slot
        })
    return jsonify(doctors_data), 200

@app.route("/create_post", methods=['POST'])
def create_post():
    try:
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'success': False, 'message': 'You must be logged in to create a post.'}), 401
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message' : 'You must send valid data'}), 400
        user_type = session.get('user_type')

        title = data.get('title')
        content = data.get('content')
        image_link = data.get('image_link')

        new_post = Post(title=title, content=content, image_link = image_link, user_type=user_type, user_id=user_id, )
        db.session.add(new_post)
        db.session.commit()


        return jsonify({'success': True, 'message': 'Post created successfully!', 'post_id': new_post.id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/get_posts', methods=['GET'])
def get_posts():
    try:
        posts = Post.query.all()
        if not posts:
            return jsonify({'message' : 'There are no posts to show!'}), 404
        posts_data=[]
        for post in posts:
            posts_data.append({
                'id' : post.id,
                'title' : post.title,
                'content' : post.content,
                'image_link' : post.image_link,
            })
        return jsonify(posts_data), 200
    except Exception as e:
        return jsonify({'success': False, 'message' : str(e)}), 500
#-----------------------------------------------------------------------------------PRIYO

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    if request.method == 'POST':
        request_data = request.json
        symptoms = request_data.get('symptoms')

        if symptoms == "Symptoms":
            return jsonify({'error': 'Symptoms not provided'})

        # Split the user's input into a list of symptoms (assuming they are comma-separated)
        user_symptoms = [s.strip() for s in symptoms.split(',')]
        # Remove any extra characters, if any
        user_symptoms = [symptom.strip("[]' ") for symptom in user_symptoms]
        predicted_disease = predictDisease(user_symptoms)
        dis_des, precautions, medications = func(predicted_disease)
    
        my_precautions = []
        for i in precautions[0]:
            my_precautions.append(i)
        
        # Prepare JSON response
        response = {
            "predicted_disease": predicted_disease,
            "dis_des": dis_des,
            "precautions": my_precautions,
            "medications": medications
        }

        return jsonify(response)

    return jsonify({'error': 'Method not allowed'})

@app.route('/diet')
def diet():
    return render_template('diet.html')

from flask import jsonify

@app.route('/recommend', methods=['POST'])
def recommend():
    if request.method == "POST":
        request_data = request.get_json()  # Using get_json() instead of json
        
        print("Request Data:", request_data)  # Print request data for debugging
        
        age = request_data.get('age')
        weight = request_data.get('weight')
        gender = request_data.get('gender')
        height = request_data.get('height')
        foodtype = request_data.get('veg_or_nonveg')
        disease = request_data.get('disease')
        diability_if_any = request_data.get('diability_if_any')
        location = request_data.get('location')

        chain = LLMChain(llm=model, prompt=prompt, verbose=True)
        input_data = {
            'age': age,
            'gender': gender,
            'weight': weight,
            'height': height,
            'foodtype': foodtype,
            'disease': disease,
            'location': location,
            'diability_if_any': diability_if_any
        }
        results = chain.invoke(input_data, verbose=True)
        results_text = results['text']
        

        breakfast_pattern = re.compile(r"Breakfast Names:(.*?)Dinner Names:", re.DOTALL)
        dinner_pattern = re.compile(r"Dinner Names:(.*?)Workout Names:", re.DOTALL)
        workout_pattern = re.compile(r"Workout Names:(.*)", re.DOTALL)

        # Extract recommendations
        breakfast_matches = breakfast_pattern.search(results_text)
        dinner_matches = dinner_pattern.search(results_text)
        workout_matches = workout_pattern.search(results_text)

        # Clean up the extracted lists
        def clean_recommendations(recommendations):
            return [line.strip() for line in recommendations.split("\n") if line.strip()]

        breakfast_recommendations = clean_recommendations(breakfast_matches.group(1)) if breakfast_matches else []
        dinner_recommendations = clean_recommendations(dinner_matches.group(1)) if dinner_matches else []
        workout_recommendations = clean_recommendations(workout_matches.group(1)) if workout_matches else []
        

        response_data = {
            'breakfast_recommendations': breakfast_recommendations,
            'dinner_recommendations': dinner_recommendations,
            'workout_recommendations': workout_recommendations
        }
        
        # Render template with response data
        return jsonify(response_data)

    return jsonify({'error': 'Method not allowed'})


#Click here to know more button -------------------------------------------

prompt_template= PromptTemplate(
    input_variables=['disease'],
    template="All you Want to know :\n"
    "you are a senior doctor and personal healthcare consultant. I want you to guide me by providing awarness information on that diseases with detail description within 200 words "
    "dont suggest any medicine just provide valuable inforation and description of the disease that the patient should know  "
    "write in the underentioned format "
    "Detailed Description : .......\n"
    "disease:{disease}\n"
)
new_chain = LLMChain(llm=model, prompt=prompt_template, verbose=True)

@app.route('/click_here_to_know_more')
def click_here_to_know_more():
    if 'predicted_disease' in global_session:
        disease = global_session['predicted_disease']
        input_text = {'disease': disease}
        results_text = new_chain.invoke(input_text)
        results_text = results_text['text']
        results_text = results_text.split('\n')
        return render_template('click_here_to_know_more.html', results_text=results_text)
    return render_template('index.html')

#Visual Search Based Callorie Counter----------------------------------------------

@app.route('/visual_search')
def visual_search():
    return render_template('visual_search.html')


@app.route("/visual", methods=["GET", "POST"])
def visual():
    if request.method == "POST":
        input_text = request.form["input"]
        uploaded_file = request.files["file"]
        if uploaded_file:
            image = Image.open(uploaded_file)
            image.save("uploaded_image.jpg")
            image_data = input_image_setup(uploaded_file)
            response = get_gemini_repsonse(input_prompt, image_data, input_text)
            response_data = response.split('\n')
            return jsonify(response=response_data)  # Return JSON response
    return render_template("visual_search.html")

#posture detection and correction -----------------------------------------------------------------
my_prompt = """
You are an expert gym trainer where you need to see the the posture from the image
and comment on that posture whether it is correct or not.
also provide detailed information how to correct the posture by providing step by step 
process of acheiving the correct posture
"""

@app.route('/posture_detection')
def posture_detection():
    return render_template('posture_detection.html')

@app.route("/posture", methods=["GET", "POST"])
def posture():
    if request.method == "POST":
        input_text = request.form["input"]
        uploaded_file = request.files["file"]
        
        image = Image.open(uploaded_file)
        image.save("uploaded_image.jpg")
        image_data = input_image_setup(uploaded_file)
        response = get_gemini_repsonse(my_prompt, image_data, input_text)
        response = response.split('\n')
    return jsonify(response=response)



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
