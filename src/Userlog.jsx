
function Userlog(props){
    if(props.isLoggedIn){
        return <h1>Welcome {props.username}</h1>
    }
    else {
        return <h1>Please log in to contineu....</h1>
    }
}

export default Userlog