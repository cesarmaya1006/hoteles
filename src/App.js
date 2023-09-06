import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import Home from './pages/Home'
import Nuevo from './pages/Nuevo'
import Editar from './pages/Editar'
import AcomodacionNew from './pages/AcomodacionNew'
import AcomodacionDelete from './pages/AcomodacionDelete';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" Component={Home} />
    <Route path="/nuevo" Component={Nuevo} />
    <Route path="/editar/:id" Component={Editar} />
    <Route path="/acomodacion_new/:id" Component={AcomodacionNew} />
    <Route path="/acomodacion_delete/:id/:id_h" Component={AcomodacionDelete} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
