import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Appbar from './components/Appbar'
import { Signup } from './pages/Signup'
import './index.css'

function App() {


  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route>
          <Signup></Signup>
        </Route>
      </Routes>
   </BrowserRouter>
    </>
  )
} 

export default App
