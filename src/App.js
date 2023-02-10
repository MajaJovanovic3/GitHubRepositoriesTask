import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RepositoriesPage from './pages/RepositoriesPage';
import RepositoryDetailsPage from './pages/RepositoryDetailsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RepositoriesPage />} />
        <Route path='/repository-details' element={<RepositoryDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
