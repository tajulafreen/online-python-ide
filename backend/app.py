from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route("/run", methods=["POST"])
def run_code():
    data = request.json
    code = data.get("code", "")
    user_input = data.get("input", "")  # 💡 Get user input

    # Save the user code to a file
    with open("runner.py", "w") as f:
        f.write(code)

    try:
        # Execute the code with input
        result = subprocess.run(
            ["python", "runner.py"],
            input=user_input,                 # 🧠 Pass input here!
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            timeout=5                         # Optional: timeout to prevent long runs
        )
        output = result.stdout
    except subprocess.CalledProcessError as e:
        output = e.output
    except Exception as e:
        output = str(e)

    return jsonify({"output": output})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

