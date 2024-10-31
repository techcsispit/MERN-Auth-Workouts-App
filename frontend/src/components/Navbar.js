import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../hooks/useLogout';
import DarkModeToggle from "./DarkMode";
import { MdFitbit } from "react-icons/md";

const Navbar = () => {

    const { logout }=useLogout()
    const { user }=useAuthContext()

    const handleClick=()=>{
        logout()
    }

    return ( 
        <header>
            <div className="container">
                <MdFitbit className="logo"/>
                <div className="head">
                <Link to='/'>
                    <h1>Workout Buddy</h1>
                </Link>

        </div>
                <nav>
                    {user && (
                    <div>
                        {/* <span>{user.email}</span> */}
                       
                        <Link
          to="/dashboard" // Replace with the actual route for your templates page
          className="bg-blue-500 text-white  rounded-md shadow-md hover:bg-blue-600 transition pr-2"
        >
          Dashboard
        </Link>
        <Link
          to="/templates" // Replace with the actual route for your templates page
          className="bg-blue-500 text-white  rounded-md shadow-md hover:bg-blue-600 transition"
        >
           Templates
        </Link>
        <Link
          to="/goals" // Replace with the actual route for your templates page
          className="bg-blue-500 text-white  rounded-md shadow-md hover:bg-blue-600 transition"
        >
           Goals
        </Link>
        
                    </div>
                    )}
                    {!user && (<div>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </div>
                    )}
                 <DarkModeToggle />
                 <button onClick={handleClick} className="log-out">Log out</button>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;