import React, { useState, useEffect } from 'react';
import { vocabulary } from './vocabulary';

export default function App() {
  const [currentWord, setCurrentWord] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [usedWords, setUsedWords] = useState([]);

  // Get a random word that hasn't been used
  const getRandomWord = () => {
    const availableWords = vocabulary.filter(w => !usedWords.includes(w.word));
    
    if (availableWords.length === 0) {
      // Reset if all words used
      setUsedWords([]);
      return vocabulary[Math.floor(Math.random() * vocabulary.length)];
    }
    
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setUsedWords([...usedWords, randomWord.word]);
    return randomWord;
  };

  // Initialize with first word
  useEffect(() => {
    setCurrentWord(getRandomWord());
  }, []);

  const handleReveal = () => {
    setShowAnswer(true);
  };

  const handleKnow = () => {
    setScore(score + 1);
    setTotalAttempts(totalAttempts + 1);
    nextWord();
  };

  const handleDontKnow = () => {
    setTotalAttempts(totalAttempts + 1);
    nextWord();
  };

  const nextWord = () => {
    setShowAnswer(false);
    setCurrentWord(getRandomWord());
  };

  if (!currentWord) return null;

  const accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3">
            📚 English Vocabulary Practice
          </h1>
          <p className="text-white/90 text-lg">
            Learn new words for Ireland migration
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center border-2 border-white/30">
            <div className="text-3xl font-bold text-white">{score}</div>
            <div className="text-sm text-white/80">Known</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center border-2 border-white/30">
            <div className="text-3xl font-bold text-white">{totalAttempts}</div>
            <div className="text-sm text-white/80">Total</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center border-2 border-white/30">
            <div className="text-3xl font-bold text-white">{accuracy}%</div>
            <div className="text-sm text-white/80">Accuracy</div>
          </div>
        </div>

        {/* Word Card */}
        <div className="bg-white/10 backdrop-blur-lg border-2 border-white/30 rounded-3xl p-12 shadow-2xl">
          {/* Word */}
          <div className="text-center mb-8">
            <h2 className="text-6xl font-bold text-white mb-4">
              {currentWord.word}
            </h2>
            <p className="text-2xl text-white/80 font-mono">
              {currentWord.pronunciation}
            </p>
          </div>

          {/* Answer Section */}
          {showAnswer ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white/20 rounded-2xl p-6">
                <div className="text-sm text-white/70 mb-2">中文翻译:</div>
                <div className="text-2xl font-semibold text-white">{currentWord.chinese}</div>
              </div>

              <div className="bg-white/20 rounded-2xl p-6">
                <div className="text-sm text-white/70 mb-2">English Definition:</div>
                <div className="text-xl text-white">{currentWord.english}</div>
              </div>

              <div className="bg-white/20 rounded-2xl p-6">
                <div className="text-sm text-white/70 mb-2">Example:</div>
                <div className="text-lg text-white italic">"{currentWord.example}"</div>
              </div>

              {/* Did you know? */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleKnow}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-all hover:scale-105 shadow-lg"
                >
                  ✅ I Knew It!
                </button>
                <button
                  onClick={handleDontKnow}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all hover:scale-105 shadow-lg"
                >
                  ❌ Didn't Know
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={handleReveal}
                className="bg-white hover:bg-gray-100 text-purple-600 font-bold text-xl py-6 px-12 rounded-2xl transition-all hover:scale-110 shadow-2xl"
              >
                🔍 Show Answer
              </button>
              <p className="text-white/60 mt-6 text-sm">
                Try to remember the meaning before revealing
              </p>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-6 text-center text-white/70 text-sm">
          {usedWords.length} / {vocabulary.length} words practiced
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/60 text-sm">
          Practice daily to improve your English! 🚀
        </div>
      </div>
    </div>
  );
}
