from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///visualization.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY']="thisIsASecretKey"
db = SQLAlchemy(app)

class register_db(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(20), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/')
def dashboard():
    if 'user_id' not in session:
        flash("Please log in first.", "warning")
        return redirect(url_for('login'))
    return render_template("wixdash.html")

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Extract form data
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        print("Received data:", username, email, password)

        # Create a new user and add to the database
        new_user = register_db(username=username, email=email, password=password)
        db.session.add(new_user)
        
        try:
            db.session.commit()
            print("Data saved to database")
        except Exception as e:
            db.session.rollback()
            print("Error saving data:", e)
        
        return redirect(url_for('dashboard'))

    return render_template("register.html")

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Retrieve form data
        email = request.form.get('email')
        password = request.form.get('password')
        
        # Query the database for the user
        user = register_db.query.filter_by(email=email, password=password).first()
        
        if user:
            # If user exists and credentials match
            session['user_id'] = user.sno  # Store user ID in session
            flash(f"Welcome back, {user.username}!", "success")
            return redirect(url_for('dashboard'))  # Redirect to home or dashboard page
        else:
            # If credentials are incorrect
            flash("Invalid email or password. Please try again.", "danger")
    
    # Render login page if GET request or if credentials are invalid
    return render_template("login.html")

@app.route('/logout')
def logout():
    session.pop('user_id', None)  # Remove user ID from session
    flash("You've been logged out.", "info")
    return redirect(url_for('login'))
if __name__ == "__main__":
    app.run(debug=True, port=8000)
