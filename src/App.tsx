import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';


// Example dummy data and handler
const dummyWorkouts = [
  { id: 1, name: 'Leg Day', date: '2025-05-16T10:00:00Z', duration: 45 },
  { id: 2, name: 'Push Day', date: '2025-05-14T08:30:00Z', duration: 50 },
];

export default function App() {

  const handleCreateWorkout = ()=> {
    console.log("Create new workout clicked");
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home recentWorkouts={dummyWorkouts} onCreateNewWorkout={handleCreateWorkout}/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
