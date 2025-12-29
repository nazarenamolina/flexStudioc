import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/headerComponent.jsx';
import FooterComponent from './components/footerComponent.jsx';
import './App.css';

function App() {

  return (
    <>
    <BrowserRouter>
     <div className="app-container">
      <HeaderComponent />
       <main className="main-content">
       </main>
      <FooterComponent />
     </div>
    </BrowserRouter>
    </>
  )
}

export default App
