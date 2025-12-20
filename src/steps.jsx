import { useEffect, useState } from "react"; 

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function Steps(){
    const [step, setStep] = useState(1);
    const [movies, setMovies] = useState([]);
    const [isopen, setIsOpen] = useState(true);

    const previouss = () => {
        if(step > 1) setStep(step - 1);
      }

  const nextss = () => {
    if(step < 3) setStep(step + 1);
  }

  useEffect( function (){
    async function searchMovie() {
     const response = await fetch("https://www.omdbapi.com/?s=avengers&apikey=7035c60c");
      const data = await response.json();
      setMovies(data);
      console.log(data);
    }
    searchMovie();
  }, []);

  return(
    
    <div>
      <button className="close" onClick={() => setIsOpen(!isopen)}>&times;</button>
    {isopen && <div className="steps">
      <div className="numbers">
        <div className= {`${step >= 1 ? "active" : ""}`}>1</div>
        <div className= {`${step >= 2 ? "active" : ""}`}>2</div>
        <div className= {`${step >= 3 ? "active" : ""}`}>3</div>
      </div>

      <div>
        <h1>{movies?.Search?.[0]?.Title}</h1>
      </div>

      <p className="message">Step {step}: {messages[step - 1]}</p>

      <div className="buttons">
        <button style={{backgroundColor: 'grey', color: 'white'}} onClick={() => previouss()}> Previous </button>
        <button style={{backgroundColor: 'grey', color: 'white'}} onClick={() => nextss()}>Next</button>
      </div>
    </div>
}

</div>
  );

}

export default Steps