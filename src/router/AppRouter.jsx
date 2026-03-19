import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import HeaderComponent from '../components/headerComponent.jsx';
import FooterComponent from '../components/footerComponent.jsx';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegistroPage from '../pages/RegistroPage.jsx';
import CarritoPage from '../pages/CarritoPage.jsx';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage.jsx';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import CategoriasPage from '../pages/admin/CategoriasPage.jsx';
import { RutaAdmin } from './RutaAdmin.jsx';
import { RutaProtegida } from './RutaProtegida.jsx';
import { RutaPublica } from './RutaPublica.jsx';
import CategoriaDetailPage from '../pages/CategoriaDetailPage.jsx'; 
import AdminVideosPage from '../pages/admin/AdminVideosPage.jsx';
import CategoriaEditorPage from '../pages/admin/CategoriaEditorPage.jsx';

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
        <Route element={<RutaPublica />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registro' element={<RegistroPage />} />
        </Route>

        <Route element={<RutaAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/categorias" element={<CategoriasPage />} />
            <Route path="/admin/categorias/nueva" element={<CategoriaEditorPage />} />
            <Route path="/admin/videos" element={<AdminVideosPage/>}/>
            
          </Route>
        </Route>

        <Route element={<LayoutConNav />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/categorias/:id' element={<CategoriaDetailPage />} />
          <Route element={<RutaProtegida />}>
            <Route path='/carrito' element={<CarritoPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};