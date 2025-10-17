import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Food from './Food.jsx'
import Profilr from './Profile.jsx'
import Student from './Student.jsx'
import Userlog from './Userlog.jsx'
import List from './List.jsx'
import Lists from './Lists.jsx'
import Button from './Button.jsx'

function App(){
  return(
    <>
      <Header/>
      <Student name="Patric" age={21} isStudent={true}/>
      <Food/>
      <Profilr/>
      <Profilr/>
      <Profilr/>
      <Profilr/>
      <Userlog isLoggedIn = {true} username = "patrik"/>
      <List/>
      <Button/>
      <Footer/>
    </>
  );
}
export default App