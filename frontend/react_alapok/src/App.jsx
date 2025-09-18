import  {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Home'
import Regiok from './Regiok'
import Regisztracio from './Regisztracio'

function App() {

  return (
    <div>
       <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Regiok' element={<Regiok/>}/>
            <Route path='/Regisztracio' element={<Regisztracio/>}/>
          </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
