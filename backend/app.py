from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/events', methods=['GET'])
def get_events():
    events = [
        {"id": 1, "title": "HackFest 2024", "date": "Oct 15, 2024", "desc": "24-hour national level hackathon.", "tag": "Hackathon"},
        {"id": 2, "title": "Web3.0 Workshop", "date": "Sep 20, 2024", "desc": "Hands-on blockchain & smart contracts.", "tag": "Workshop"},
        {"id": 3, "title": "AI/ML Bootcamp", "date": "Nov 05, 2024", "desc": "Deep dive into machine learning algorithms.", "tag": "Bootcamp"},
        {"id": 4, "title": "CTF Challenge", "date": "Dec 12, 2024", "desc": "Capture The Flag cybersecurity competition.", "tag": "Competition"}
    ]
    return jsonify(events)

@app.route('/contact', methods=['POST'])
def handle_contact():
    data = request.json
    # In a real app, save to DB or send email
    if not data.get('name') or not data.get('email'):
        return jsonify({"error": "Missing fields"}), 400
    return jsonify({"message": "Message sent successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
