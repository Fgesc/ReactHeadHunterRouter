import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../Header/Header";
import { HomePage } from "../../pages/HomePage";
import { AboutMePage } from "../../pages/AboutMePage";
import { VacancyPage } from "../../pages/VacancyPage";
import { NotFoundPage } from "../../pages/NotFoundPage";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/vacancies" element={<Navigate to="/" replace />} />
                <Route path="/vacancies/:id" element={<VacancyPage />} />
                <Route path="/aboutme" element={<AboutMePage />} />
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </>
    );
}

export default App;

