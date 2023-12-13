  import React, { useState, useContext } from 'react'
  import { Context } from '../js/store/appContext.js'
  import { useNavigate } from 'react-router-dom'


  const LoguinBox = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const { store, actions } = useContext(Context)


    const handlerLogin = async () => {
      try {
        const info = {
          email: email,
          password: pass
        }
        await actions.login(info)
        if (store.userName !== "" && store.userName !== undefined) {
          actions.wrongPass(false)
          navigate('/main')
        } else {
          actions.wrongPass(true)
          setEmail("");
          setPass("");
        }


      } catch (e) {
        console.error(e)
      }
    }

    const handlerSetEmail = (text) => {
      setEmail(text)
      actions.wrongPass(false)

    }

    const handlerSetPass = (text) => {
      setPass(text)
      actions.wrongPass(false)
    }

    return (
      <div className="login-container d-flex justify-content-center align-items-center mt-5">
        <div className="login-box bg-primary text-white p-4 rounded">
          <h2>Acceso</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handlerLogin();
          }}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="text" className="form-control" id="email" value={email} autoComplete="E-mail" onChange={(e) => handlerSetEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input type="password" className="form-control" id="password" value={pass} autoComplete="contraseña" onChange={(e) => handlerSetPass(e.target.value)} />
            </div>    
            {
              store.wrongPass && <p style={{ color: "white", fontSize: "18px" }}> Credencial/es incorrecta/s </p>
            }
            <button type="submit" className="btn btn-light">Entrar</button>
          </form>
        </div>
      </div>
    )
  }

  export default LoguinBox