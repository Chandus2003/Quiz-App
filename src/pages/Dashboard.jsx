import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
export default function Dashboard() {
  const navigate = useNavigate();
  const [lastResult, setLastResult] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("quizUser");
    if (!storedName) navigate("/");
    else setUserName(storedName);

    const storedResult = localStorage.getItem("lastQuizResult");
    if (storedResult) setLastResult(JSON.parse(storedResult));
  }, [navigate]);

  return (<>
  <Navbar userName={userName} />


    <div className="min-h-screen flex flex-col items-center bg-yellow-50 p-4">
      <h1 className="text-2xl font-bold mb-6">Welcome, {userName}!</h1>


      <button
        onClick={() => navigate("/quiz")}
        className="mt-6 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Take Quiz
      </button>
    </div>
    </>
  );
}
