import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import "./App.css";
import { Btech } from "./Pages/Btech";
import { DiplomaToBtech } from "./Pages/DiplomaToBtech";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <SideBar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(prev => !prev)} />
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/btech" replace />} />
            <Route path="/btech" element={<Btech />} />
            <Route path="/diplomaToBtech" element={<DiplomaToBtech />} />
            {/* <Route path="/tasks" element={<Task />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
