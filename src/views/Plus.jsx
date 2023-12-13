import React from 'react'
import Navbar from '../components/Navbar'
import background from "../images/background.jpg"

const Plus = () => {

    const backgroundStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      };

    return (
        <div className='container-fluid' style={backgroundStyle}>
            <div className='row pt-3'>
                <Navbar />
            </div>

        </div>
    )
}

export default Plus