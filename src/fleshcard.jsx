import { useState } from "react";

const questions = [
    {
        id: 1,
        question: "What is the capital of France?",
        answer: "Paris",
    },
    {
        id: 2,
        question: "What is 2 + 2?",
        answer: "4",
    },
    {
        id: 3,
        question: "What is the largest planet in our solar system?",
        answer: "Jupiter",
    },
    {
        id: 4,
        question: "Who wrote 'To Kill a Mockingbird'?",
        answer: "Harper Lee",
    },
    {
        id: 5,
        question: "What is the boiling point of water?",
        answer: "100°C (212°F)",
    },
    {
        id: 6,
        question: "What is the chemical symbol for gold?",
        answer: "Au",
    }
];

function Flashcards() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="flashcard-container">
      {questions.map((item) => (
        <div
          key={item.id}
          className={`flashcard ${item.id === selectedId ? "selected" : ""}`}
          onClick={() =>
            setSelectedId(item.id === selectedId ? null : item.id)
          }
        >
          <p>
            {item.id === selectedId ? item.answer : item.question}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Flashcards;