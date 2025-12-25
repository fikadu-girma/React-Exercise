import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Food from './Food.jsx'
import Profilr from './Profile.jsx'
import Student from './Student.jsx'
import Userlog from './Userlog.jsx'
import List from './List.jsx'
import Lists from './Lists.jsx'
import Button from './Button.jsx'
import Steps from './steps.jsx'
import Flashcard from './fleshcard.jsx'
import MovieSearch from './MovieSearch.jsx'
import MovieShowcase from './MoviesShowcase.jsx'
import UserProfile from './UserProfile.jsx'
import Demoreducer from './Demoreducer.jsx'
import ScientificCalculator from './ScientificCalculator.jsx'
import BMIcalc from './BMIcalc.jsx'
import TempConverter from './TempConverter.jsx'
import TodoApp from './miniProjects/TodoApp.jsx'

function App(){
  return(
    <>
      <Header/>
      <Flashcard/>
      <Steps/>
      <Student name="Patric" age={21} isStudent={true}/>
      <Food/>
      <Profilr/>
      <Profilr/>
      <Profilr/>
      <Profilr/>
      <Userlog isLoggedIn = {true} username = "patrik"/>
      <List/>
      <MovieSearch/>
      <MovieShowcase/>
      <UserProfile/>
      <Demoreducer/>
      <ScientificCalculator/>
      <BMIcalc/>
      <TempConverter/>
      <TodoApp/>
      <Button/>
      <Footer/>
    </>
  );
}
export default App