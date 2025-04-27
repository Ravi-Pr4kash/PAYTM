import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Appbar from './components/Appbar'
import { Signup } from './pages/Signup'
import './index.css'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import { Signin } from './pages/Signin'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/send' element={<SendMoney/>}></Route>
          
        </Routes>
      </BrowserRouter>
     
    </>
  )
} 8881329090

export default App
