import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../hooks/useLogout';
import DarkModeToggle from "./DarkMode";

const Navbar = () => {

    const { logout }=useLogout()
    const { user }=useAuthContext()

    const handleClick=()=>{
        logout()
    }

    return ( 
        <header>
            <div className="container">
                <div className="">
                <Link to='/'>
                    <h1>Workout Buddy</h1>
                </Link>

        </div>
                <nav>
                    {user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log out</button>
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
                    </div>
                    )}
                    {!user && (<div>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </div>
                    )}
                 <DarkModeToggle />
                </nav>
            </div>
        </header>
    );
}

export default Navbar;