import Home from './src/components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './src/components/About'
import Contracts from './src/components/Contracts'

function App() {
    <div>
       <BrowserRouter>
          <Routes>
            <Route path='/Home' element={<Home/>}/>
            <Route path='/About' element={<About/>}/>
            <Route path='/Contracts' element={<Contracts/>}/>
          </Routes>
       </BrowserRouter>
    </div>   
}

export default App
