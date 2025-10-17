
function Button(){

    // let count = 0;
    
    // const handleclick = (name) => {
    //     if(count<3){
    //         count++;
    //         console.log(`${name}, u clicked me ${count} time/s.`);
    //     }
    //     else{
    //         console.log("please, stop clicking me u're boringggggg me!!!!")
    //     }
    // }

    const handdleevent = (e) => e.target.textContent = "oach😢"

    return(<button onClick = {(e)=>handdleevent(e)}>Click Me😜</button>);
}

export default Button