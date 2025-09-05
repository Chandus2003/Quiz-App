// src/components/Navbar.jsx
import React from "react";
import { Trophy, Settings } from "lucide-react";

// Helper to get initials from full name
function getInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
}

export default function Navbar({ userName }) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">QuizMaster</h1>
              <p className="text-sm text-gray-600">Challenge your knowledge</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">{getInitials(userName)}</span>
              </div>
              <span className="text-sm font-medium text-gray-700">{userName}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
