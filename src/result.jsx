import'./result.css'
function Second (props){
    return(
        <div className='scoreBoard'>
            <div className="ScoreTitle">Score Board</div>
            <div className='score'>
            <div className="text">Your Score :{props.score}</div>
            <div className="text">Total Score:{props.totalScore}</div>
            </div>
        </div>
    )
} 
export default Second