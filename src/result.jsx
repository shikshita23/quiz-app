import'./result.css'
function Second ({score,totalScore}){
    return(
        <div className='scoreBoard'>
            <div className="ScoreTitle">Score Board</div>
            <div className='score'>
            <div className="text">Your Score :{score}</div>
            <div className="text">Total Score:{totalScore}</div>
            </div>
        </div>
    )
} 
export default Second