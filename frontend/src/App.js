import './App.css';
import Header from './components/header';
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage';

import {
    BrowserRouter as Router,
    Switch,
    Routes,
    Route,
    Link
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" exact element={<HomePage />}/>
                <Route path="/room/:id" element={<RoomPage />} />
            </Routes>
        </Router>
    );
}

export default App;