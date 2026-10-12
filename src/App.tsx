import {Routes, Route, Navigate} from 'react-router';
import VacanciesPage from './pages/VacanciesPage';
import VacancyPage from './pages/VacancyPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/vacancies" replace/>}/>
            <Route path="/vacancies" element={<VacanciesPage/>}/>
            <Route path="/vacancies/:id" element={<VacancyPage/>}/>
        </Routes>
    );
}

export default App;
