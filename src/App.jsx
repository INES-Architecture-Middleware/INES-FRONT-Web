import { useEffect, useState } from 'react'
import './App.scss'
import Nav from './components/Nav'
import { Routes, useNavigate, useParams } from 'react-router-dom'

function App() {
  const [logged, setLogged] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)

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

  return (
    <div className='AppContainer'>
      <Nav logged={logged} disconnect={disconnect}/>
    </div>
  )
}

export default App
