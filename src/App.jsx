import { useState } from 'react'
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom"
import './App.css'
import './index.css'
import Pokedex from './components/Pokedex'
import UserInput from './components/UserInput'
import PokedexId from './components/PokedexId'
import ProtectedRoutes from './components/ProtectedRoutes'
import Loader from './components/Loader'

function App() {
  const [count, setCount] = useState(0)
 

  return (
    <HashRouter>
      <div className="App">
        <Routes>

          <Route path="/" element={<UserInput/>}/>

          <Route element={<ProtectedRoutes/>}>
           <Route path="/pokedex" element={<Pokedex/>}/>
            
            <Route path="/pokedex/:name" element={<PokedexId/>}/>
          </Route>

        </Routes>
      </div>
    </HashRouter>
    
  )
}

export default App
