import {Link}  from "react-router-dom";
import {useLogout} from '../hooks/useLogout';
import { useAuthContext } from "../hooks/useAuthcontext";


const Navbar = ()=>{

    const {user} = useAuthContext();
    const  { logout } = useLogout();

    const handleClick = () =>{
       logout();
    }
    return(
        <header>
            <div className="container">
                <Link to ="/"> 
                <h1>Workout Buddy</h1>
                </Link>
                <nav>
                {user? 
                    (<div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Logout</button>
                    </div>):
                    (<div>
                        <Link to="/login">login</Link>
                        <Link to="/signup">SignUp</Link>
                    </div>)
                    }

                </nav>
            </div>
        </header>
    )
}

export default Navbar; 