import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import HeaderComponent from '../components/headerComponent.jsx';
import FooterComponent from '../components/footerComponent.jsx';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegistroPage from '../pages/RegistroPage.jsx';
import AcrobatasPage from '../pages/AcrobatasPage.jsx';
import BailarinasPage from '../pages/BailarinasPage.jsx';
import DeportistasPage from '../pages/DeportistasPage.jsx';
import GimnastasPage from '../pages/GimnastasPage.jsx';
import PatinadorasPage from '../pages/PatinadorasPage.jsx';
import ProgresivasPage from '../pages/ProgresivasPage.jsx';
import CarritoPage from '../pages/CarritoPage.jsx';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage.jsx';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import CategoriasPage from '../pages/admin/CategoriasPage.jsx';
import { RutaAdmin } from './RutaAdmin.jsx';
import { RutaProtegida } from './RutaProtegida.jsx';
import { RutaPublica } from './RutaPublica.jsx';

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

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- 1. RUTAS PÚBLICAS (Sin Nav, solo Login/Registro) --- */}
        <Route element={<RutaPublica />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registro' element={<RegistroPage />} />
        </Route>


        <Route element={<RutaAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/categorias" element={<CategoriasPage />} />
            {/* Futuras rutas del panel irán aquí */}
          </Route>
        </Route>


        <Route element={<LayoutConNav />}>
          <Route path='/' element={<HomePage />} />
          <Route element={<RutaProtegida />}>
            <Route path='/acrobatas' element={<AcrobatasPage />} />
            <Route path='/bailarinas' element={<BailarinasPage />} />
            <Route path='/deportistas' element={<DeportistasPage />} />
            <Route path='/gimnastas' element={<GimnastasPage />} />
            <Route path='/patinadoras' element={<PatinadorasPage />} />
            <Route path='/progresivas' element={<ProgresivasPage />} />
            <Route path='/carrito' element={<CarritoPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};