import { useState, useEffect } from "react";
import axios from "axios";
import "./Quiz.css";
import Second from "./result";
function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [questionIdx, setQuestionsIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [clickedOption, setClickedOption] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
        );
        const data = response?.data;
        console.log("data --->", data);
        const transformedQuestions = data.results.map(transformApiResponse);
        console.log("transformedQuestions --->", transformedQuestions);
        setQuestions(transformedQuestions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestions();
  }, []);

  console.log("questionsssss -->", questions);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const nextQuestion = () => {
    checkScore();
    setQuestionsIdx(questionIdx + 1);
    setClickedOption(null);
    if (questionIdx == 4) {
      setShowResult(true);
    }
  };
  const checkScore = () => {
    if (
      clickedOption !== null &&
      clickedOption === questions[questionIdx].answer
    ) {
      setScore(score + 1);
    }
  };
  const questionValues = (i) => {
    setClickedOption(i + 1);
  };
  const isOptionChecked = (index) => {
    const clickedOptionValue = clickedOption === index + 1;
    console.log(clickedOptionValue);
    return clickedOptionValue;
  };

  function transformApiResponse(apiResponse) {
    const options = shuffleArray([
      ...apiResponse.incorrect_answers,
      apiResponse.correct_answer,
    ]);
    const answerIndex = options.indexOf(apiResponse.correct_answer) + 1;
    return {
      question: apiResponse?.question,
      options: options,
      answer: answerIndex,
    };
  }

  return (
    <div>
      <div className="Heading">Quiz</div>
      {questions.length > 0 && questionIdx < 6 && (
        <div className="quizBoard">
          {showResult ? (
            <Second score={score} totalScore={questions.length} />
          ) : (
            <>
              <div className="questionSection">
                <div>{questions[questionIdx].question}</div>
              </div>
              <div className="bottomPart">
                <div className="answerSection">
                  {questions[questionIdx].options.map((option, index) => {
                    console.log(index, option);
                    return (
                      <>
                        <label>
                          <input
                            className="options"
                            type="radio"
                            value={option}
                            name="options"
                            key={index}
                            checked={isOptionChecked(index)}
                            onChange={() => questionValues(index)}
                          />
                          {option}
                        </label>
                      </>
                    );
                  })}
                </div>
                <div className="nextSection">
                  <button className="nextButton" onClick={nextQuestion}>
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default Quiz;
