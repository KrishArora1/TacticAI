from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import os
import script

app = Flask(__name__)
CORS(app)

@app.route('/script', methods=['POST'])
def run_sports_backend():
    try:
        # Get the input description from the request body
        data = request.get_json()
        description = data.get('description')  # Get the input description from the body

        if not description:
            return jsonify({'error': 'Description is required'}), 400

        os.chdir('../')
        SCRIPT_PATH = os.path.join(os.getcwd(), 'backend/script.py')
        # Call the script and pass the description (you may need to modify your script to accept this input)
        result = subprocess.run(['python3', SCRIPT_PATH, description], capture_output=True, text=True)

        if result.returncode != 0:
            print(f"Error: {result.stderr}")  # Print out any error messages
            return jsonify({'error': 'Script failed', 'details': result.stderr}), 500

        os.chdir('backend')
        # If successful, return the output from the script
        return jsonify({'message': 'Script executed successfully', 'output': script.test()})

    except Exception as e:
        print(f"Exception: {str(e)}")  # Print out any exception
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)