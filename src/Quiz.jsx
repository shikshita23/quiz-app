import { useState } from 'react'
import './Quiz.css'
import questions from './questions'
import Second from './result';
function Quiz(){
    const[question,setQuestion]=useState(0)
    const [showResult,setShowResult]=useState(false);
    const [clickedOption,setClickedOption]=useState(0);
    const[score,setScore]=useState(0);
    const nextQuestion=() =>{
        checkScore();
        if(question<questions.length-1){
            setQuestion(question+1)
            setClickedOption(null);
        }
        else{
            setShowResult(true)
        }
    }    
    const checkScore=()=>{
        if(clickedOption===questions[question].answer&&clickedOption !== null){
            setScore(score+1);
        }
    };
    const func=(i) =>{
        setClickedOption(i+1)
    }
    return(
        <div>
            <div className="Heading">Quiz</div>
            <div className="quizBoard">
                {showResult?(
                    <Second score={score} totalScore={questions.length}/>
                    ):(
                 <> 
                <div className="questionSection">
                   <div>{questions[question].qn} </div>      
                </div>
                <div className="answerSection">
                    {questions[question].options.map((option,i )=> {
                        return(
                            <>
                             <label> <input  className="options" type='radio' value={option} name='options' key={i} checked={clickedOption === i + 1} onChange={()=>func(i)}/>{option}</label>  
                            </>
                        )
                    })}
                </div>
                <div className='nextSection'>
                    <button className='nextButton' onClick={nextQuestion}>Next</button>
                </div> 
                </>
                )}
            </div>
        </div>
    )
}
export default Quiz;