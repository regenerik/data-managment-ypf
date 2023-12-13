import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import injectContext from "./js/store/appContext";
import Home from './views/Home.jsx'
import Main from './views/Main.jsx'
import Lgout from './views/Lgout.jsx'
import NotFound from './views/NotFound.jsx'
import Plus from './views/Plus.jsx'
import Contact from './views/Contact.jsx'

const Layout = () => {
  const basename = process.env.BASENAME || "";
  return (
    <div>
    <BrowserRouter basename={basename}>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/main" element={<Main/>}/>
            <Route exact path="/logout" element={<Lgout/>}/>
            <Route exact path="/plus" element={<Plus/>}/>
            <Route exact path="/contact" element={<Contact/>}/>
            <Route exact path="/*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
</div>
  )
}

export default injectContext(Layout)