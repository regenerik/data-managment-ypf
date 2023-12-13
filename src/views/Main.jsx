import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { Context } from "../js/store/appContext.js"
import Boton1 from '../components/Boton1.jsx'
import background from "../images/background.jpg"

const Main = () => {

    const backgroundStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
    };
    const { store } = useContext(Context)

    return (
        <div className='container-fluid' style={backgroundStyle}>
            <div className='row pt-3'>
                <Navbar />
                <div className="d-flex flex-column align-items-center justify-content-center ">
                    {
                        store.token !== "" && store.token !== undefined? (
                            <div className=' mt-5'>
                                */Hacer los 8 botones por separado e importarlos acá/*
                                <Boton1 />
                            </div>) : (
                            <div className="d-flex align-items-center justify-content-center mt-5">
                                <p>Necesitas loguearte para ver el contenido</p>
                            </div>
                        )

                    }
                </div>
            </div>


        </div>
    )
}

export default Main