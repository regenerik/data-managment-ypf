import React , {useContext} from 'react'
import { Context } from "../js/store/appContext.js"

const Boton1 = () => {

const { actions } = useContext(Context)

  return (
    <div>
        <button onClick={()=>actions.button1()}>Botón 1</button>
    </div>
  )
}

export default Boton1