import { useState, useEffect } from "react";
import "./Quiz.css";
//import Second from './result';
function Quiz() {
  const [questions, setQuestion] = useState([]);
  // const [showResult, setShowResult] = useState(false);
  // const [clickedOption, setClickedOption] = useState(0);
  // const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        console.log(data);
        setQuestion(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here (e.g., show an error message)
      }
    };

    fetchQuestions();
  }, []);

  console.log("questions -->", questions);
  // const nextQuestion = () => {
  //     checkScore();
  //     if (questions < questions.length - 1) {
  //         setQuestion(questions + 1)
  //         setClickedOption(null);
  //     }
  //     else {
  //         setShowResult(true)
  //     }
  // }
  // const checkScore = () => {
  //     if (clickedOption === questions[questions].answer && clickedOption !== null) {
  //         setScore(score + 1);
  //     }
  // };
  // const questionValues = (i) => {
  //     setClickedOption(i + 1)
  // }
  // const isOptionChecked = (index) => {
  //     const clickedOptionValue = clickedOption === index + 1;
  //     console.log(clickedOptionValue);
  //     return clickedOptionValue;
  // }
  return (
    <div>
      <h1>Hello world</h1>
      <div>
        <div>
          <h1>Trivia Questions</h1>
          {questions.map((question, index) => (
            <div key={index}>
              <h3>Question {index + 1}</h3>
              <p>Category: {question.category}</p>
              <p>Difficulty: {question.difficulty}</p>
              <p>{question.question}</p>
              <p>Correct Answer: {question.correct_answer}</p>
              <ul>
                {question.incorrect_answers.map((answer, idx) => (
                  <li key={idx}>
                    Incorrect Answer {idx + 1}: {answer}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
    // <div>
    //     <div className="Heading">Quiz</div>
    //     <div className="quizBoard">
    //         {showResult ? (
    //             <Second score={score} totalScore={questions.length} />
    //         ) : (
    //             <>
    //                 <div className="questionSection">
    //                     <div>{questions[questions].qn} </div>
    //                 </div>
    //                 <div className="answerSection">
    //                     {questions[questions].options.map((option, index) => {
    //                         console.log(index, option)
    //                         return (
    //                             <>
    //                                 <label>
    //                                     <input
    //                                         className="options"
    //                                         type='radio'
    //                                         value={option}
    //                                         name='options'
    //                                         key={index}
    //                                         checked={isOptionChecked(index)}
    //                                         onChange={() => questionValues(index)}
    //                                     />
    //                                     {option}
    //                                 </label>
    //                             </>
    //                         )
    //                     })}
    //                 </div>
    //                 <div className='nextSection'>
    //                     <button className='nextButton' onClick={nextQuestion}>Next</button>
    //                 </div>
    //             </>
    //         )}
    //     </div>
    // </div>
  );
}
export default Quiz;
