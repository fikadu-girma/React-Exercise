
function Button(){

    const handdleevent = (e) => e.target.textContent = "oach😢"

    return(<button onClick = {(e)=>handdleevent(e)}>Click Me😜</button>);
}

export default Button