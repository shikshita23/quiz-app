import { useState, useEffect } from "react";
import axios from "axios";
import "./Quiz.css";
//import Second from './result';
function Quiz() {
  const [question, setQuestion] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [clickedOption, setClickedOption] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple"
        );
        const data = response.data;
        console.log("data api bata aako ~~~~~~~~>",data);
        setQuestion(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestions();
  }, []);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  console.log("questions -->", question);
  const nextQuestion = () => {
      //checkScore();
      if (question < question.length - 1) {
          setQuestion(question + 1)
          setClickedOption(null);
      }
      else {
          setShowResult(true)
      }
  }

  
  // const checkScore = () => {
  //     if (clickedOption == question[questions].answer && clickedOption !== null) {
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
          
          {question.map((question, index) => (
            <div key={index}>
              <div className="questionSection">
                   <p>{question.question}</p>
                 </div>
              
              

            <div className="answerSection">
              {
              shuffleArray([
                
              ...question.incorrect_answers,
                question.correct_answer// Include correct answer in the options array
              ]).map((answer, idx) => {
                return (
                  <label key={idx}>
                    <input
                      className="options"
                      type='radio'
                      value={answer}
                      name='options'
                      // Consider changing key={idx} to a unique identifier if possible
                      // checked={isOptionChecked(index)}
                      // onChange={() => questionValues(index)}
                    />
                    {answer}
                  </label>
                );
              })}
</div>
              
                    <div className='nextSection'>
                        <button className='nextButton' onClick={nextQuestion}>Next</button>
                     </div>
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
