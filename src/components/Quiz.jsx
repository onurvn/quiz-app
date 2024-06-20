import { useRef, useState } from "react"
import { questions } from '../questions.js'

const Quiz = () => {
    let [value, setValue] = useState(0);
    const [question, setQuestion] = useState(questions[value]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const optionArray = [Option1, Option2, Option3, Option4];

    const checkAnswer = (e, answer) => {
        if (lock === false) {
            if (question.ans === answer) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1)
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                optionArray[question.ans - 1].current.classList.add("correct")
            }
        }
    }

    const nextQuestion = () => {
        if (lock === true) {
            if (value === questions.length - 1) {
                setResult(true);
                return 0;
            }
            setValue(++value);
            setQuestion(questions[value]);
            setLock(false);
            optionArray.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const restartQuiz = () => {
        setValue(0);
        setQuestion(questions[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen m-auto text-2xl">
            <div className="w-1/2 bg-primary p-5 shadow-xl rounded-lg text-center">
                <h1 className="text-4xl">Quiz App</h1>
                <hr className="my-5" />
                {result ? <></> :
                    <>
                        <h2 className="my-2">{value + 1}. {question.question} </h2>
                        <ul className="flex flex-col space-y-5">
                            <li ref={Option1} onClick={(e) => { checkAnswer(e, 1) }}>{question.option1}</li>
                            <li ref={Option2} onClick={(e) => { checkAnswer(e, 2) }}>{question.option2}</li>
                            <li ref={Option3} onClick={(e) => { checkAnswer(e, 3) }}>{question.option3}</li>
                            <li ref={Option4} onClick={(e) => { checkAnswer(e, 4) }}>{question.option4}</li>
                        </ul>
                        <hr className="my-5" />
                        <button onClick={nextQuestion} className="w-full bg-white text-black my-2 rounded-lg p-2.5 active:translate-y-1">Next</button>
                        <div className="font-semibold">{value + 1} of {questions.length} questions</div>
                    </>}
                {result ? <>
                    <h2 className="my-2">Score: {score} out of {questions.length} </h2>
                    <button onClick={restartQuiz} className="w-full bg-white text-black my-2 rounded-lg p-2.5 active:translate-y-1">Restart Quiz</button>
                </> : <></>}
            </div>
        </div>
    )
}

export default Quiz