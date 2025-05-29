import './App.css';
import UploadImage from './services/UploadImage';
import Menu from './navigation/Menu';
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
        <Menu />
        
        <Routes>
            <Route path="/upload" element={<UploadImage/>} />
        </Routes>
    </Router>
  );
}

export default App;
