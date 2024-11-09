from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
import random
import string
import hashlib
import os
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///visualization.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY']="thisIsASecretKey"
db = SQLAlchemy(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'         # Replace with your SMTP server
app.config['MAIL_PORT'] = 587                          # Replace with your SMTP port
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = '22_19045vanshika@dsc.du.ac.in'
app.config['MAIL_PASSWORD'] = 'Awaken$333'    
mail = Mail(app)


class register_db(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(20), nullable=False)

with app.app_context():
    db.create_all()


@app.route('/')
def Home():
    # Check if the user is logged in (if session doesn't have 'user_id', redirect to login)
    if 'user_id' not in session:
        flash("You must be logged in to access the dashboard.", "warning")
        return redirect(url_for('wixdash'))  # Redirect to login page if not logged in

    return render_template('wixdash1.html')  # Show the dashboard if logged in

@app.route("/wixdash")
def wixdash():
    return render_template('wixdash.html')

# forgot 
@app.route('/forgot', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form['email']
        user = register_db.query.filter_by(email=email).first()

        if user:
            new_password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
            user.password = new_password  # For production, hash this password
            db.session.commit()
            send_email(email, new_password)
            flash("A new password has been sent to your email.", "success")
            return redirect(url_for('login'))
        else:
            flash("No account found with that email.", "danger")
    return render_template("forgot.html")

@app.route('/send-email')
def send_email(email, new_password):
    msg = Message('Hello from Flask', sender=app.config['MAIL_USERNAME'], recipients=['recipient@example.com'])
    msg.body = 'This is a test email sent from a Flask application using Gmail SMTP.'
    mail.send(msg)
    return "Email sent successfully!"



@app.route('/')
def Home():
    # Check if the user is logged in (if session doesn't have 'user_id', redirect to login)
    if 'user_id' not in session:
        flash("You must be logged in to access the dashboard.", "warning")
        return redirect(url_for('wixdash'))  # Redirect to login page if not logged in

    return render_template('wixdash1.html')  # Show the dashboard if logged in

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
        
        return redirect(url_for('wixdash1'))

    return render_template("register.html")

@app.route('/login', methods=['GET', 'POST'])
def login():
    # Check if the user is already logged in
    if 'user_id' in session:
        return redirect(url_for('wixdash1'))  # Redirect to the wixdash1 if already logged in

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
            return redirect(url_for('wixdash1'))  # Redirect to the wixdash1 after successful login
        else:
            # If credentials are incorrect
            flash("Invalid email or password. Please try again.", "danger")

    # Render login page if GET request or if credentials are invalid
    return render_template("login.html")


@app.route('/logout')
def logout():
    # Remove the 'user_id' from the session to log the user out
    session.pop('user_id', None)

    # Flash a message indicating that the user has been logged out
    flash("You've been logged out.", "info")

    # After logout, render the logout page with an option to either log in again or go to the dashboard
    return render_template('wixdash.html')

@app.route('/wixdash')
def wixdash():
    return render_template('wixdash.html')

@app.route('/stackContent')
def stackContent():
    return render_template('stackContent.html')

@app.route('/logoNav')
def logoNav():
    return render_template('logoNav.html')

@app.route('/visualization')
def visualization():
    return render_template('visualization.html')

@app.route('/scheduling')
def scheduling():
    return render_template('scheduling.html')
    

@app.route('/queueContent')
def queueContent():
    return render_template('queueContent.html')

@app.route('/singly')
def singly():
    return render_template('singly.html')

@app.route('/treeContent')
def treeContent():
    return render_template('treeContent.html')

@app.route('/radix')
def radix():
    return render_template('radix.html')

@app.route('/quick')
def quick():
    return render_template('quick.html')

@app.route('/insertion')
def insertion():
    return render_template('insertion.html')

@app.route('/linkedlistContent')
def linkedlistContent():
    return render_template('linkedlistContent.html')

@app.route('/feedback')
def feedback():
    return render_template('feedback.html')

@app.route('/doubly')
def doubly():
    return render_template('doubly.html')

# @app.route('/doubly')
# def doubly():
#     return render_template('doubly.html')

@app.route('/circular')
def circular():
    return render_template('circular.html')

@app.route('/merge')
def merge():
    return render_template('merge.html')

@app.route('/playground')
def playground():
    return render_template('playground.html')

@app.route('/algorithm')
def algorithm():
    return render_template('algorithm.html')

@app.route('/count')
def count():
    return render_template('count.html')

@app.route('/bst')
def bst():
    return render_template('bst.html')

@app.route('/bubbleVisual')
def bubbleVisual():
    return render_template('bubbleVisual.html')

@app.route('/countVisual')
def countVisual():
    return render_template('countVisual.html')

@app.route('/singly')
def singly():
    return render_template('singly.html')

@app.route('/sortingContent')
def sortingContent():
    return render_template('sortingContent.html')

@app.route('/selectionVisual')
def selectionVisual():
    return render_template('selectionVisual.html')

@app.route('/selection')
def selection():
    return render_template('selection.html')


@app.route('/pracSession')
def pracSession():
    return render_template('pracSession.html')

@app.route('/operating')
def operating():
    return render_template('operating.html')


@app.route('/newPassword')
def newPassword():
    return render_template('newPassword.html')

@app.route('/wixdash1')
def wixdash1():
    return render_template('wixdash1.html')



# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         # Retrieve form data
#         email = request.form.get('email')
#         password = request.form.get('password')
        
#         # Query the database for the user
#         user = register_db.query.filter_by(email=email, password=password).first()
        
#         if user:
#             # If user exists and credentials match
#             session['user_id'] = user.sno  # Store user ID in session
#             flash(f"Welcome back, {user.username}!", "success")
#             return redirect(url_for('wixdash'))  # Redirect to home or wixdash page
#         else:
#             # If credentials are incorrect
#             flash("Invalid email or password. Please try again.", "danger")
    
#     # Render login page if GET request or if credentials are invalid
#     return render_template("login.html")



if __name__ == "__main__":
    app.run(debug=True, port=8000)