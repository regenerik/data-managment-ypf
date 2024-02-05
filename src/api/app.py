import os # para saber la ruta absoluta de la db si no la encontramos
from flask_bcrypt import Bcrypt  # para encriptar y comparar
from flask import Flask, request, jsonify # Para endpoints
from flask_sqlalchemy import SQLAlchemy  # Para rutas
from flask_jwt_extended import  JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# ENCRIPTACION JWT y BCRYPT-------

app.config["JWT_SECRET_KEY"] = "valor-variable"  # clave secreta para firmar los tokens, cuanto mas largo mejor.
jwt = JWTManager(app)  # isntanciamos jwt de JWTManager utilizando app para tener las herramientas de encriptacion.
bcrypt = Bcrypt(app)   # para encriptar password

# DATABASE---------------
db_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance', 'mydatabase.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'

db = SQLAlchemy(app)

print(f"Ruta de la base de datos: {db_path}")

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(255))

if not os.path.exists(os.path.dirname(db_path)): # Nos aseguramos que se cree carpeta instance automatico para poder tener mydatabase.db dentro.
    os.makedirs(os.path.dirname(db_path))

with app.app_context():
    db.create_all() # Nos aseguramos que este corriendo en el contexto del proyecto.
# -----------------------


# ROUTES-----------------

@app.route('/')
def hello():
    return '¡Soy el servidor de Nahu y estoy funcionando a la perfección. Nada puede malir sal!'

# ---------------------------Ruta para manejar las solicitudes preflight OPTIONS--------------
@app.route('/user', methods=['OPTIONS'])
def handle_preflight():
    # Agrega los encabezados CORS necesarios
    response = jsonify({'message': 'Preflight request received'})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response
# ---------------------------EJEMPLO RUTA DE REGISTRO/ SOLO PARA USUARIOS----------------------

@app.route('/users', methods=['POST'])
@jwt_required()
def create_user():
    try:
        current_user_id = get_jwt_identity()
        if not current_user_id:
            return jsonify({'create_error':'its necessary token to create a new user'}), 401

        name = request.json.get('name')
        email = request.json.get('email')
        password = request.json.get('password')

        if not name or not email or not password:
            return jsonify({'error': 'Name, e-mail and password are required.'}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Email already exists.','ok':False}), 409

        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        
        new_user = User(name=name, email=email, password=password_hash)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User '+ name +' created successfully','ok':True}), 201

    except Exception as e:
        return jsonify({'error': 'Error in user creation: ' + str(e),'ok':False}), 500

# ---------------------------EJEMPLO RUTA GENERADORA DE TOKEN-Login---------------------------

@app.route('/token', methods=['POST'])
def get_token():
    try:
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400
        
        login_user = User.query.filter_by(email=request.json['email']).one()
        password_db = login_user.password
        true_o_false = bcrypt.check_password_hash(password_db, password)
        
        if true_o_false:
            # Lógica para crear y enviar el token
            user_id = login_user.id
            access_token = create_access_token(identity=user_id)
            user_name = login_user.name

            return { 'access_token':access_token, 'id':user_id,'name': user_name , 'ok': True }, 200

        else:
            return {"Error":"Contraseña  incorrecta", 'ok': False }
    
    except Exception as e:
        return {"Error":"El email proporcionado no corresponde a ninguno registrado: " + str(e), 'ok': False }, 500

# ------------------------------EJEMPLO RUTA RESTRINGIDA POR TOKEN-------------------------------


@app.route('/users')
@jwt_required()  # Decorador para requerir autenticación con JWT
def show_users():
    current_user_id = get_jwt_identity()  # Obtiene la identidad del usuario del token
    if current_user_id:
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                'id': user.id,
                'email': user.email
            }
            user_list.append(user_dict)
            
        return jsonify(user_list)
    else:
        return {"Error": "Token inválido o no proporcionado"}, 401

# ------------------------------------------------------------------------------------------------                     


#al final ( detecta que encendimos el servidor desde terminal y nos da detalles de los errores )
if __name__ == '__main__':
    with app.app_context(): # creando un usuario base Admin sin necesidad de registro
        default_user = User.query.filter_by(email="nahuel@admin.com").first()
        if not default_user:
            # Si el usuario no existe, lo creamos
            password_hash = bcrypt.generate_password_hash("nahupaz").decode('utf-8')
            default_user = User(name="Nahuel", email="nahuel@admin.com", password=password_hash)
            db.session.add(default_user)
            db.session.commit()
    app.run(debug=True, host='0.0.0.0', port=5000)