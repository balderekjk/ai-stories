import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Acclaimed from './Acclaimed';
import MainPage from './MainPage';
import Navbar from './Navbar';
import Questionable from './Questionable';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/acclaimed" element={<Acclaimed />} />
        <Route path="/questionable" element={<Questionable />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
