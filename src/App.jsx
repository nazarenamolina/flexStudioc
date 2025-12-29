import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/headerComponent.jsx';
import FooterComponent from './components/footerComponent.jsx';
import './App.css';
import './index.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="app-container">
          <HeaderComponent />
          <main className="main-content">

          </main>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
