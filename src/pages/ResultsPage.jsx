import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResultsPage() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const storedResult = localStorage.getItem("lastQuizResult");
    if (!storedResult) {
      navigate("/");
      return;
    }

    const parsed = JSON.parse(storedResult);

    // Compute score
    let correctCount = 0;
    parsed.questions.forEach((q, idx) => {
      if (parsed.answers[idx] === q.correct_answer) correctCount++;
    });

    setScore(correctCount);
    setTotalQuestions(parsed.questions.length);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6">Quiz Completed!</h2>
        <p className="text-xl mb-8">
          You scored {score} / {totalQuestions}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/quiz")}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Retake Quiz
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
