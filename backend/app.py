from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route("/run", methods=["POST"])
def run_code():
    data = request.json
    code = data.get("code")
    
    with open("runner.py", "w") as f:
        f.write(code)
    
    try:
        output = subprocess.check_output(["python", "runner.py"], stderr=subprocess.STDOUT, text=True)
    except subprocess.CalledProcessError as e:
        output = e.output
    
    return jsonify({"output": output})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
