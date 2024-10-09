import React, { useState, useEffect } from "react";
import { getAll } from "@divyanshu013/inspirational-quotes";
import "./App.css";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    // Fetch all quotes and set them in the state
    const quotesData = getAll().map((quote) => ({
      ...quote,
    }));
    setQuotes(quotesData);
  }, []);

  const handleNextClick = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      setFadeClass("fade-in");
    }, 300); // Time for fade-out animation
  };

  const handlePreviousClick = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
      );
      setFadeClass("fade-in");
    }, 300);
  };

  const currentQuote = quotes.length > 0 ? quotes[currentIndex] : null;

  const backgroundColors = ["#8cc084", "#b7ebc3", "#ffb37e", "#7fa8d7"];
  const currentBackgroundColor =
    backgroundColors[currentIndex % backgroundColors.length];

  return (
    <>
      <div
        className={`content min-h-screen flex flex-col items-center justify-center px-4 py-10 transition-all duration-500`}
        style={{ background: currentBackgroundColor }}
      >
        <h1 className="text-4xl font-bold mb-6">
          Inspirational Quote Generator
        </h1>

        {currentQuote && (
          <blockquote
            className={`quote text-xl font-semibold italic text-center max-w-2xl mb-4 ${fadeClass} transition-opacity duration-300`}
          >
            <p>"{currentQuote.quote}"</p>
            <p className="hindi-translation text-md font-light text-gray-500 mb-4">
              "{currentQuote.hindiTranslation}"
            </p>
          </blockquote>
        )}
        {currentQuote && (
          <h2
            className={`author text-lg font-medium text-gray-700 mb-1 ${fadeClass}`}
          >
            - {currentQuote.author}
          </h2>
        )}
        {currentQuote && (
          <h3
            className={`source text-md font-light text-gray-500 mb-6 ${fadeClass}`}
          >
            {currentQuote.source}
          </h3>
        )}

        <div className="button-container flex space-x-4">
          <button
            className="nav-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow transition-transform transform hover:scale-105"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
          <button
            className="nav-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow transition-transform transform hover:scale-105"
            onClick={handleNextClick}
          >
            Next
          </button>
          <button
            className="share-button bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow transition-transform transform hover:scale-105"
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
              )
            }
          >
            Share on Facebook
          </button>
        </div>
      </div>
    </>
  );
}
