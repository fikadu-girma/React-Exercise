import proimg from './assets/profile.jpg'

function Profile(){
    return(
        <div className="card">
            <img className="card-img" alt='Profile Image' src={proimg}></img>
            <h1 className="name">Patric squarepants</h1>
            <p className="card-desc">i am seniour terrorist and war leader or knight!!!</p>
        </div>
    );
}

export default Profile