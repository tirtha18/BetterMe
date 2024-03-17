from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    appointments = db.relationship('Appointment', backref='doctor', lazy=True)
    specialization = db.Column(db.Enum(
        'Cardiologist', 'Endocrinologist', 'General Physician', 'Pediatrician',
        'Gynecologist', 'Neurologist', 'Dermatologist', 'Psychiatrist',
        name='specialization_types'), nullable=False)
    time_slot = db.Column(db.String(100), nullable=False)
    posts = db.relationship('Post', backref='doctor', lazy=True)    
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    appointments = db.relationship('Appointment', backref='patient', lazy=True)
    
class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
    time_slot = db.Column(db.String(100), nullable=False)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_link = db.Column(db.Text, default="image link")
    user_type = db.Column(db.String(100), nullable=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=False) 




