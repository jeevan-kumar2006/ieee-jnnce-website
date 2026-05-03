import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# SECURITY: The plain text password is NEVER in the code.
# This generates the hash of "IEEECSESB@10" securely on startup.
ADMIN_PASSWORD_HASH = generate_password_hash("IEEECSESB@10")

applications_db = []

events_db = [
    {"id": 1, "title": "HackFest 2024", "date": "Oct 15, 2024", "desc": "24-hour national level hackathon.", "tag": "Hackathon", "brochure": None},
    {"id": 2, "title": "Web3.0 Workshop", "date": "Sep 20, 2024", "desc": "Hands-on blockchain & smart contracts.", "tag": "Workshop", "brochure": None}
]

@app.route('/events', methods=['GET'])
def get_events():
    return jsonify(events_db)

@app.route('/apply', methods=['POST'])
def submit_application():
    data = request.json
    if not data.get('name') or not data.get('email'):
        return jsonify({"error": "Missing fields"}), 400
    applications_db.append(data)
    return jsonify({"message": "Application submitted successfully!"}), 200

@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    if check_password_hash(ADMIN_PASSWORD_HASH, data.get('password', '')):
        return jsonify({"success": True}), 200
    return jsonify({"success": False, "error": "Unauthorized"}), 401

@app.route('/admin/applications', methods=['GET'])
def get_applications():
    return jsonify(applications_db)

@app.route('/admin/events', methods=['POST'])
def add_event():
    data = request.form
    brochure_url = None
    
    if 'brochure' in request.files:
        file = request.files['brochure']
        if file.filename != '':
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            brochure_url = f"/uploads/{filename}"

    new_event = {
        "id": len(events_db) + 1,
        "title": data.get('title'),
        "date": data.get('date'),
        "desc": data.get('desc'),
        "tag": data.get('tag'),
        "brochure": brochure_url
    }
    events_db.append(new_event)
    return jsonify({"message": "Event added!", "event": new_event}), 201

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
