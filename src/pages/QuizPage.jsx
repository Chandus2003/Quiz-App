import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const localQuestions = [
  { question: "What is the capital of France?", correct_answer: "Paris", options: ["Paris","London","Rome","Berlin"] },
  { question: "Which planet is known as the Red Planet?", correct_answer: "Mars", options: ["Mars","Venus","Jupiter","Saturn"] },
  { question: "What is 2 + 2?", correct_answer: "4", options: ["2","3","4","5"] },
  { question: "Who wrote Hamlet?", correct_answer: "Shakespeare", options: ["Shakespeare","Dickens","Austen","Hemingway"] },
  { question: "What is the boiling point of water?", correct_answer: "100", options: ["90","100","80","120"] }
];

export default function QuizPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answersSelected, setAnswersSelected] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("quizUser");
    if (!storedUser) return navigate("/");
    setUserName(storedUser);

    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => {
        if (data.response_code === 0) {
          const formatted = data.results.map(q => ({
            question: decodeURIComponent(q.question),
            correct_answer: decodeURIComponent(q.correct_answer),
            options: shuffleArray([...q.incorrect_answers.map(a => decodeURIComponent(a)), decodeURIComponent(q.correct_answer)])
          }));
          setQuestions(formatted);
        } else {
          setQuestions(localQuestions);
        }
      })
      .catch(() => setQuestions(localQuestions))
      .finally(() => setLoading(false));
  }, [navigate]);

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const handleNext = () => {
    if (!selectedOption) return alert("Please select an answer.");
    const updatedAnswers = [...answersSelected];
    updatedAnswers[current] = selectedOption;
    setAnswersSelected(updatedAnswers);
    setSelectedOption("");

    if (current + 1 < questions.length) setCurrent(current + 1);
    else {
      const score = updatedAnswers.reduce(
        (acc, ans, idx) => (ans === questions[idx].correct_answer ? acc + 1 : acc),
        0
      );
      const result = { score, answers: updatedAnswers, questions };
      localStorage.setItem("lastQuizResult", JSON.stringify(result));
      navigate("/results");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading questions...</p>;
  if (!questions.length) return <p className="text-center mt-20">No questions available.</p>;

  const q = questions[current];

  return (
    <>
      <Navbar userName={userName} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-2xl w-full">
          <h2 className="text-xl font-bold mb-2">Question {current + 1} of {questions.length}</h2>
          <p className="mb-4 font-semibold">{q.question}</p>
          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(opt)}
                className={`p-3 border rounded text-left ${selectedOption === opt ? "bg-blue-200 border-blue-500" : "hover:bg-gray-100"}`}
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="mt-6 w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            {current + 1 === questions.length ? "Finish Quiz" : "Next"}
          </button>
          <div className="mt-2 text-gray-600 text-sm">
            Score: {answersSelected.filter((ans, idx) => ans === questions[idx].correct_answer).length} / {questions.length}
          </div>
        </div>
      </div>
    </>
  );
}
