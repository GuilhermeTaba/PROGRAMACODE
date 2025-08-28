import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Eventos from "./pages/Eventos";
import Noticias from "./pages/Noticias";
import Contato from "./pages/Contato";

// Admin components
import { AuthProvider } from "./hooks/useAuth";
import AdminLayout from "./components/admin/AdminLayout";
import PrivateRoute from "./components/admin/PrivateRoute";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import GerenciarEventos from "./pages/admin/GerenciarEventos";
import FormEvento from "./pages/admin/FormEvento";
import GerenciarNoticias from "./pages/admin/GerenciarNoticias";
import FormNoticia from "./pages/admin/FormNoticia";
import GerenciarContatos from "./pages/admin/GerenciarContatos";
import GerenciarAdmins from "./pages/admin/GerenciarAdmins";
import ConfiguracoesPerfil from "./pages/admin/ConfiguracoesPerfil";
import GerenciarBackups from "./pages/admin/GerenciarBackups";

// Tema customizado com cores da Blockchain Insper
const theme = extendTheme({
  colors: {
    brand: {
      50: "#fff5f5",
      100: "#fed7d7", 
      200: "#feb2b2",
      300: "#fc8181",
      400: "#f56565",
      500: "#e53e3e", // Vermelho principal
      600: "#c53030",
      700: "#9b2c2c",
      800: "#822727",
      900: "#63171b",
    },
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#000000", // Preto principal
    }
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.800",
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/eventos" element={
            <>
              <Navbar />
              <Eventos />
              <Footer />
            </>
          } />
          <Route path="/noticias" element={
            <>
              <Navbar />
              <Noticias />
              <Footer />
            </>
          } />
          <Route path="/contato" element={
            <>
              <Navbar />
              <Contato />
              <Footer />
            </>
          } />

          {/* Rota de Login Admin */}
          <Route path="/admin/login" element={<Login />} />

          {/* Rotas Administrativas Protegidas */}
          <Route path="/admin/dashboard" element={
            <PrivateRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </PrivateRoute>
          } />
          
          <Route path="/admin/eventos" element={
            <PrivateRoute>
              <AdminLayout>
                <GerenciarEventos />
              </AdminLayout>
            </PrivateRoute>
          } />
          
          <Route path="/admin/eventos/novo" element={
            <PrivateRoute>
              <AdminLayout>
                <FormEvento />
              </AdminLayout>
            </PrivateRoute>
          } />
          
          <Route path="/admin/eventos/editar/:id" element={
            <PrivateRoute>
              <AdminLayout>
                <FormEvento />
              </AdminLayout>
            </PrivateRoute>
          } />
          
          <Route path="/admin/noticias" element={
            <PrivateRoute>
              <AdminLayout>
                <GerenciarNoticias />
              </AdminLayout>
            </PrivateRoute>
          } />
          
          <Route path="/admin/noticias/novo" element={
            <PrivateRoute>
              <AdminLayout>
                <FormNoticia />
              </AdminLayout>
            </PrivateRoute>
          } />
          
          <Route path="/admin/noticias/editar/:id" element={
            <PrivateRoute>
              <AdminLayout>
                <FormNoticia />
              </AdminLayout>
            </PrivateRoute>
          } />
          
          <Route path="/admin/contatos" element={
            <PrivateRoute>
              <AdminLayout>
                <GerenciarContatos />
              </AdminLayout>
            </PrivateRoute>
          } />
          
          <Route path="/admin/admins" element={
            <PrivateRoute>
              <AdminLayout>
                <GerenciarAdmins />
              </AdminLayout>
            </PrivateRoute>
          } />
          
          <Route path="/admin/perfil" element={
            <PrivateRoute>
              <AdminLayout>
                <ConfiguracoesPerfil />
              </AdminLayout>
            </PrivateRoute>
          } />
          
          <Route path="/admin/backups" element={
            <PrivateRoute>
              <AdminLayout>
                <GerenciarBackups />
              </AdminLayout>
            </PrivateRoute>
          } />

          {/* Redirecionamento padrão do admin */}
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
