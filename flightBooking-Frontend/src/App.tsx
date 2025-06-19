import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FlightPageView } from './section/flight/view/flight-view';
import { AddFlightForm } from './section/flight/components/flight-add';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route loads add page */}
        <Route path="/" element={<FlightPageView />}/>

        {/* Add flight page */}
        <Route path="/add-flight" element={<AddFlightForm/>} />
      </Routes>
    </BrowserRouter>
  );
}
