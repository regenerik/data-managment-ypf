import React, { useContext } from 'react'
import Navbar from '../components/Navbar.jsx'
import LoguinBox from '../components/LoguinBox.jsx'
import background from "../images/background.jpg"
import { Context } from '../js/store/appContext.js'
import { Link } from 'react-router-dom'

const Home = () => {

  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
  };

  const { store, actions } = useContext(Context)

  const handleLogout = () => {
    actions.logout()
  }

  return (
    <div className='container-fluid' style={backgroundStyle}>
      <div className='row pt-3'>
        <Navbar />
        {
          store.token === undefined || store.token === "" ?
           <LoguinBox /> :
           <div className='col-12 d-flex flex-column align-items-center'>
          <h4 className='mt-3'>Podés navegar al Panel:</h4>
          <div className='mt-3'>
            {/* Aquí puedes agregar tu botón de navegación con Link */}
            <Link to="/main" className='btn btn-primary'>Ir al Panel</Link>
          </div>
          <h4 className='mt-3'>O podrias salir:</h4>
          <div className='mt-3'>
            {/* Aquí puedes agregar tu botón de logout */}
            <button className='btn btn-danger' onClick={() => handleLogout()}>Logout</button>
          </div>
         </div>

        }
        
      </div>

    </div>
  )
}

export default Home