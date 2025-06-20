import { useEffect, useState } from 'react'
import './App.scss'
import Nav from './components/Nav'
import { Routes, useNavigate, useParams } from 'react-router-dom'
import Home from './pages/Home'
import Popup from './components/Popup'

function App() {
  const [logged, setLogged] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const [popupContent, setPopupContent] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    const authToken = window.localStorage.getItem("authToken")
    if(authToken) setLogged(true)
    else setLogged(false)
  }, [])

  useEffect(()=>{
    let path = params['*']

    switch (path) {
      case "home":
        if(currentPage !== "home"){
          setCurrentPage("home")
          navigate('/home')
        }
        break;
      default :
        if(currentPage !== "home"){
          setCurrentPage("home")
          navigate('/')
        }
    }
  }, [params])

  const disconnect = () => {
    window.localStorage.removeItem("authToken")
    window.location.reload()
  }

  const changePopupState = (state, content = null) => {
    if(state) setPopupContent(content)
    else setPopupContent(null)
  }

  return (
    <div className='AppContainer'>
      <Nav logged={logged} disconnect={disconnect}/>
      <div className="AppContent">
        <Home changePopupState={changePopupState}/>
      </div>
      <Popup content={popupContent}/>
    </div>
  )
}

export default App
