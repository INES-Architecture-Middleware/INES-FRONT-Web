import { useEffect, useState } from 'react'
import './App.scss'
import Nav from './components/Nav'
import { Routes, useNavigate, useParams } from 'react-router-dom'
import Home from './pages/Home'
import Popup from './components/Popup'
import Team from './pages/Team'

function App() {
  const [logged, setLogged] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const [popupContent, setPopupContent] = useState(null)
  const [team, setTeam] = useState([])
  const [teams, setTeams] = useState([])

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

  const addToTeam = (pokemon) => {
    console.log(pokemon)
    if(team.length < 6){
      let teamTmp = [...team]
      teamTmp.push(pokemon)
      setTeam(teamTmp)
    }else{
      console.log("Votre team est déjà remplie")
    }
  }

  const removeToTeam = (index) => {
    if(team.length > index){
      let teamTmp = [...team]
      teamTmp.splice(index, 1)
      setTeam(teamTmp)
    }
  }

  return (
    <div className='AppContainer'>
      <Nav logged={logged} disconnect={disconnect}/>
      <div className="AppContent">
        <Team newTeam={team} removeToTeam={removeToTeam} setTeam={setTeam}/>
        <div className="PageContent">
          <Home changePopupState={changePopupState} addToTeam={addToTeam}/>
        </div>
      </div>
      <Popup content={popupContent}/>
    </div>
  )
}

export default App
