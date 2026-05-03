import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

app = Flask(__name__)
# Allow all origins for local development
CORS(resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Force pbkdf2:sha256 to ensure it works flawlessly across all Werkzeug versions
ADMIN_PASSWORD_HASH = generate_password_hash("IEEECSESB@10", method='pbkdf2:sha256')

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
    try:
        data = request.get_json(silent=True)
        if not data or not data.get('name') or not data.get('email'):
            return jsonify({"error": "Missing name or email"}), 400
        
        applications_db.append(data)
        return jsonify({"message": "Application submitted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/admin/login', methods=['POST'])
def admin_login():
    try:
        data = request.get_json(silent=True)
        if not data or 'password' not in data:
            return jsonify({"success": False, "error": "Missing password field"}), 400
            
        if check_password_hash(ADMIN_PASSWORD_HASH, data['password']):
            return jsonify({"success": True}), 200
            
        return jsonify({"success": False, "error": "Incorrect password"}), 401
    except Exception as e:
        return jsonify({"success": False, "error": "Server login error"}), 500

@app.route('/admin/applications', methods=['GET'])
def get_applications():
    try:
        return jsonify(applications_db), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/admin/events', methods=['POST'])
def add_event():
    try:
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
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
