import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'; // 1. OJO: Agregamos 'Outlet' aquí
import HeaderComponent from './components/headerComponent.jsx';
import FooterComponent from './components/footerComponent.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistroPage from './pages/RegistroPage.jsx';
import AcrobatasPage from './pages/AcrobatasPage.jsx';
import BailarinasPage from './pages/BailarinasPage.jsx';
import DeportistasPage from './pages/DeportistasPage.jsx';
import GimnastasPage from './pages/GimnastasPage.jsx';
import PatinadorasPage from './pages/PatinadorasPage.jsx';
import ProgresivasPage from './pages/ProgresivasPage.jsx';
import CarritoPage from './pages/CarritoPage.jsx';
import './App.css';
import './index.css';

const LayoutConNav = () => {
  return (
    <div className="app-container">
      <HeaderComponent />
      <main className="main-content">
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/registro' element={<RegistroPage/>} />
          <Route element={<LayoutConNav />}>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/acrobatas' element={<AcrobatasPage/>}/>
            <Route path='/bailarinas' element={<BailarinasPage/>}/>
            <Route path='/deportistas' element={<DeportistasPage/>}/>
            <Route path='/gimnastas' element={<GimnastasPage/>}/>
            <Route path='/patinadoras' element={<PatinadorasPage/>}/>
            <Route path='/progresivas' element={<ProgresivasPage/>}/>
            <Route path='/carrito' element={<CarritoPage/>}/>
          </Route>
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App