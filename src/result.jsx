import'./result.css'
function Second (props){
    return(
        <>
            <div className="ScoreTitle">Score Board</div>
            <div className="text">Your Score :{props.score}</div>
            <div className="text">Total Score:{props.totalScore}</div>
        </>
    )
} 
export default Second