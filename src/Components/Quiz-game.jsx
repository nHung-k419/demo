import React, { useState, useEffect } from 'react';
import { Gamepad2, Trophy, Star, Zap, Clock } from 'lucide-react';

const ComputerQuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);

  const questions = [
    {
      question: "CPU là gì?",
      options: [
        "Bộ nhớ trong của máy tính",
        "Bộ xử lý trung tâm của máy tính",
        "Thiết bị lưu trữ dữ liệu",
        "Thiết bị xuất dữ liệu"
      ],
      correct: 1,
      explanation: "CPU (Central Processing Unit) là bộ xử lý trung tâm, có nhiệm vụ thực hiện các phép tính và xử lý dữ liệu trong máy tính."
    },
    {
      question: "Thiết bị nào sau đây là thiết bị nhập dữ liệu?",
      options: [
        "Màn hình",
        "Loa",
        "Bàn phím",
        "Máy in"
      ],
      correct: 2,
      explanation: "Bàn phím là thiết bị nhập dữ liệu, cho phép người dùng nhập ký tự và lệnh vào máy tính."
    },
    {
      question: "RAM là loại bộ nhớ gì?",
      options: [
        "Bộ nhớ ngoài",
        "Bộ nhớ chỉ đọc",
        "Bộ nhớ truy cập ngẫu nhiên",
        "Bộ nhớ ảo"
      ],
      correct: 2,
      explanation: "RAM (Random Access Memory) là bộ nhớ truy cập ngẫu nhiên, lưu trữ tạm thời dữ liệu khi máy tính đang hoạt động."
    },
    {
      question: "1 GB bằng bao nhiêu MB?",
      options: [
        "100 MB",
        "512 MB",
        "1024 MB",
        "2048 MB"
      ],
      correct: 2,
      explanation: "1 GB (Gigabyte) = 1024 MB (Megabyte). Đây là quy đổi chuẩn trong hệ thống lưu trữ dữ liệu."
    },
    {
      question: "Phần mềm nào sau đây là trình duyệt web?",
      options: [
        "Microsoft Word",
        "Google Chrome",
        "Windows Media Player",
        "Paint"
      ],
      correct: 1,
      explanation: "Google Chrome là trình duyệt web, cho phép người dùng truy cập và xem các trang web trên Internet."
    },
    {
      question: "Virus máy tính là gì?",
      options: [
        "Phần cứng bị hỏng",
        "Chương trình gây hại cho máy tính",
        "Loại phần mềm diệt virus",
        "Thiết bị bảo vệ máy tính"
      ],
      correct: 1,
      explanation: "Virus máy tính là chương trình độc hại được thiết kế để gây hại, phá hoại hoặc đánh cắp dữ liệu trên máy tính."
    },
    {
      question: "Phím tắt Ctrl + C có chức năng gì?",
      options: [
        "Xóa văn bản",
        "Sao chép văn bản",
        "Dán văn bản",
        "Lưu file"
      ],
      correct: 1,
      explanation: "Ctrl + C là phím tắt để sao chép (Copy) văn bản hoặc đối tượng đã chọn vào clipboard."
    },
    {
      question: "Phần mềm nào sau đây dùng để soạn thảo văn bản?",
      options: [
        "Paint",
        "Microsoft Excel",
        "Microsoft Word",
        "Windows Media Player"
      ],
      correct: 2,
      explanation: "Microsoft Word là phần mềm soạn thảo văn bản phổ biến, thuộc bộ Microsoft Office."
    },
    {
      question: "Phím nào dùng để xóa ký tự bên trái con trỏ?",
      options: [
        "Delete",
        "Backspace",
        "Enter",
        "Space"
      ],
      correct: 1,
      explanation: "Phím Backspace dùng để xóa ký tự ở bên trái con trỏ, còn phím Delete xóa ký tự bên phải."
    },
    {
      question: "WWW trong địa chỉ website có nghĩa là gì?",
      options: [
        "World Wide Web",
        "World Web Wide",
        "Wide World Web",
        "Web World Wide"
      ],
      correct: 0,
      explanation: "WWW là viết tắt của World Wide Web - mạng lưới toàn cầu, hệ thống thông tin trên Internet."
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered && !showScore) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      setIsAnswered(true);
      setStreak(0);
    }
  }, [timeLeft, isAnswered, showScore]);

  const handleAnswerClick = (selectedIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(selectedIndex);
    setIsAnswered(true);
    
    if (selectedIndex === questions[currentQuestion].correct) {
      const timeBonus = Math.floor(timeLeft / 3);
      const streakBonus = streak * 5;
      const totalPoints = 10 + timeBonus + streakBonus;
      
      setScore(score + totalPoints);
      setCoins(coins + totalPoints);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimeLeft(30);
    setStreak(0);
    setCoins(0);
  };

  const getRank = () => {
    const percentage = (score / (questions.length * 20)) * 100;
    if (percentage >= 90) return { title: "Thiên Tài Tin Học", icon: "🏆", color: "text-yellow-500" };
    if (percentage >= 70) return { title: "Cao Thủ", icon: "🥇", color: "text-blue-500" };
    if (percentage >= 50) return { title: "Học Sinh Giỏi", icon: "🥈", color: "text-green-500" };
    if (percentage >= 30) return { title: "Cố Gắng Lên", icon: "🥉", color: "text-orange-500" };
    return { title: "Cần Học Thêm", icon: "📚", color: "text-gray-500" };
  };

  if (showScore) {
    const rank = getRank();
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
          
          <Trophy className="w-24 h-24 mx-auto mb-4 text-yellow-500 animate-bounce" />
          <h2 className={`text-4xl font-bold mb-2 ${rank.color}`}>{rank.icon} {rank.title}</h2>
          
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mb-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Tổng Điểm</p>
                <p className="text-4xl font-bold text-purple-600">{score}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Xu Kiếm Được</p>
                <p className="text-4xl font-bold text-yellow-600">{coins} 🪙</p>
              </div>
            </div>
          </div>

          <div className="flex justify-around mb-6">
            <div className="text-center">
              <Star className="w-8 h-8 mx-auto text-green-500" />
              <p className="text-sm text-gray-600 mt-1">Đúng</p>
              <p className="font-bold text-xl">{questions.filter((q, i) => selectedAnswer === q.correct).length}</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 mx-auto text-orange-500" />
              <p className="text-sm text-gray-600 mt-1">Streak Cao Nhất</p>
              <p className="font-bold text-xl">{streak}</p>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            🎮 Chơi Lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Game Header */}
          <div className="bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-8 h-8" />
                <div>
                  <h1 className="text-2xl font-bold">Trò Chơi Tin Học</h1>
                  <p className="text-sm text-blue-100">Lớp 7 THCS</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg mb-2">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="font-bold text-lg">{score}</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded-lg">
                  <span className="font-bold">🪙 {coins}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">Streak: {streak} 🔥</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5" />
                <span className={`font-bold text-xl ${timeLeft <= 10 ? 'text-red-300 animate-pulse' : ''}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>

            <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-3 transition-all duration-300 rounded-full"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-sm">Câu {currentQuestion + 1}/{questions.length}</p>
          </div>

          {/* Question */}
          <div className="p-8">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {questions[currentQuestion].question}
              </h2>
            </div>

            {/* Options */}
            <div className="grid gap-3 mb-6">
              {questions[currentQuestion].options.map((option, index) => {
                const isCorrect = index === questions[currentQuestion].correct;
                const isSelected = index === selectedAnswer;
                
                let buttonClass = "w-full text-left p-5 rounded-xl border-3 transition-all transform hover:scale-102 ";
                
                if (!isAnswered) {
                  buttonClass += "border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg";
                } else if (isSelected && isCorrect) {
                  buttonClass += "border-green-500 bg-green-100 shadow-xl scale-105";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "border-red-500 bg-red-100 shadow-xl";
                } else if (isCorrect) {
                  buttonClass += "border-green-500 bg-green-100 shadow-xl scale-105";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={isAnswered}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          isAnswered && isCorrect ? 'bg-green-500 text-white' :
                          isAnswered && isSelected ? 'bg-red-500 text-white' :
                          'bg-purple-200 text-purple-700'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-semibold text-lg">{option}</span>
                      </div>
                      {isAnswered && isCorrect && (
                        <span className="text-3xl">✅</span>
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <span className="text-3xl">❌</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {isAnswered && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 mb-6 rounded-lg animate-fade-in">
                <p className="text-gray-700 flex items-start gap-2">
                  <span className="text-2xl">💡</span>
                  <span>
                    <span className="font-bold text-blue-700">Giải thích: </span>
                    {questions[currentQuestion].explanation}
                  </span>
                </p>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                {currentQuestion === questions.length - 1 ? '🏆 Xem Kết Quả' : '➡️ Câu Tiếp Theo'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerQuizGame;
