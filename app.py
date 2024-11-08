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

@app.route('/sortingContent')
def sortingContent():
    return render_template('sortingContent.html')

@app.route('/selectionVisual')
def selectionVisual():
    return render_template('selectionVisual.html')

@app.route('/selection')
def selection():
    return render_template('selection.html')

@app.route('/queueContent')
def queueContent():
    return render_template('queueContent.html')

@app.route('/pracSession')
def pracSession():
    return render_template('pracSession.html')

@app.route('/operating')
def operating():
    return render_template('operating.html')



@app.route('/')
def wixdash():
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
        
        return redirect(url_for('wixdash'))

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
            return redirect(url_for('wixdash'))  # Redirect to home or wixdash page
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
