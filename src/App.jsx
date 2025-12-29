import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/headerComponent.jsx';
import FooterComponent from './components/footerComponent.jsx';


function App() {

  return (
    <>
    <BrowserRouter>
    <HeaderComponent />
    <FooterComponent />

    </BrowserRouter>
    </>
  )
}

export default App
