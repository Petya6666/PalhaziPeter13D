import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './components/About'
import Contracts from './components/Contracts'

function App() {
    <div>
       <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/About' element={<About/>}/>
            <Route path='/Contracts' element={<Contracts/>}/>
          </Routes>
       </BrowserRouter>
    </div>   
}

export default App
