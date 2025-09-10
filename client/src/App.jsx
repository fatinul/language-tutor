import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './Welcome';
import Chat from './Chat';
import './App.css';
import './Welcome.css';

function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/" element={<Navigate to="/welcome" />} />
    </Routes>
  );
}

export default App;