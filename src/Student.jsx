
function Student(props){
    return(
        <div>
            <p>Name: {props.name}</p>
            <p>age: {props.age}</p>
            <p>isStudent: {props.isStudent ? "yes" : "No"}</p>
        </div>
    );
}

export default Student