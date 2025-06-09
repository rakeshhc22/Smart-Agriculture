import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './components/Frontend/LoginPage';
import Dashboard from './components/Frontend/Dashboard';
import SoilHealth from './components/Frontend/SoilHealth';
import Irrigation from './components/Frontend/Irrigation';
import PredictiveAnalysis from './components/Frontend/PredictiveAnalysis';
import Settings from './components/Frontend/Settings';

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/soil-health", element: <SoilHealth /> },
  { path: "/irrigation", element: <Irrigation /> },
  { path: "/crop-analysis", element: <PredictiveAnalysis /> },
  { path: "/settings", element: <Settings /> },
], {
  future: {
    v7_startTransition: true, 
    v7_relativeSplatPath: true,
  },
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
