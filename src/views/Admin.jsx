import React, { useContext, useState } from 'react'
import { Context } from '../js/store/appContext'
import Navbar from '../components/Navbar'
import LoguinBox from '../components/LoguinBox'
import { Link } from 'react-router-dom'


const Admin = () => {

    const { actions } = useContext(Context)
    const token = localStorage.getItem('token');
    const backgroundStyle = {
        backgrouncolor: 'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
    };

    const [formDataRegister, setFormDataRegister] = useState({
        nombre: '',
        email: '',
        password: ''
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormDataRegister({ ...formDataRegister, [name]: value });
      };
    
      const handleVerifications = async (datosRegistro) => {
        try{
            if(datosRegistro.password.length < 8){
                alert("El password debe ser por lo menos de 8 caracteres");
                return
            }
            if(datosRegistro.nombre.length < 2){
                alert("Nombre y apellido deben contener almenos dos letras")
                return
            }
            if(!datosRegistro.email.includes("@")){
                alert("Correo electronico no valido")
                return
            }
            await actions.register(datosRegistro)
        }catch(e){
            console.log("Error en verificaciones de campos");
        }
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        handleVerifications(formDataRegister)
      };
    return (
        <div className='container-fluid' style={backgroundStyle}>
            <div className='row pt-3'>
                <Navbar />
                {
                    token === undefined || token === "" ?
                        <LoguinBox /> :
                        <div className='col-12 d-flex flex-column align-items-center'>

                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Crear nuevo usuario</button>
                                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Eliminar usuario</button>
                                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Editar mis credenciales</button>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">

                                    <h4 className='mt-3'>Podés registrar un usuario nuevo:</h4>

                                    <div className='mt-3'>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="floatingName" name="nombre" placeholder="Nombre" value={formDataRegister.nombre} onChange={handleChange}/>
                                            <label htmlFor="floatingName">Nombre</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="email" autoComplete="email" className="form-control" id="floatingEmail" name="email" placeholder="name@example.com" value={formDataRegister.email} onChange={handleChange} />
                                            <label htmlFor="floatingEmail">E-mail</label>
                                        </div>
                                        <div className="form-floating">
                                            <input type="password" className="form-control" id="floatingPassword" name="password" placeholder="Password" value={formDataRegister.password} onChange={handleChange}/>
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>
                                        <button onClick={handleSubmit} type="button" className="btn btn-outline-primary mt-3">Registrar</button>
                                    </div>

                                </div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">

                                    <h4 className='mt-3'>Podés eliminar un usuario existente:</h4>
                                    <div className='mt-3'>
                                        {/* Acá podes eliminar a un usuario existente */}
                                        <Link to="/main" className='btn btn-primary'>Reemplazo boton por form</Link>
                                    </div>

                                </div>
                                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">

                                    <h4 className='mt-3'>Podés modificar tus credenciales:</h4>
                                    <div className='mt-3'>
                                        {/* Acá podes modificar tus credenciales */}
                                        <Link to="/main" className='btn btn-primary'>Reemplazo boton por form</Link>
                                    </div>

                                </div>

                            </div>

                        </div>

                }
            </div>
        </div>

    )
}

export default Admin