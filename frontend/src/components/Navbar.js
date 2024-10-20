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
                <Link
          to="/templates" // Replace with the actual route for your templates page
          className="bg-blue-500 text-white  rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Go to Templates
        </Link>
        </div>
                <nav>
                    {user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log out</button>
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