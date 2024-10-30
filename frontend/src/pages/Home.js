import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

// External libraries from MUI
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Navbar from "../components/Navbar";


const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  // State for sorting, filtering, and searching
  const [sortType, setSortType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [filterLoad, setFilterLoad] = useState([0, 100]); // Load range
  const [filterReps, setFilterReps] = useState([0, 100]); // Reps range

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  // Sort workouts
  const sortedWorkouts = [...(workouts || [])].sort((a, b) => {
    if (sortType === "load") return b.load - a.load;
    if (sortType === "reps") return b.reps - a.reps;
    if (sortType === "time") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortType === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  // Filter workouts
  const filteredWorkouts = sortedWorkouts
    .filter((workout) =>
      workout.title.toLowerCase().includes(filterTitle.toLowerCase())
    )
    .filter((workout) => workout.load >= filterLoad[0] && workout.load <= filterLoad[1])
    .filter((workout) => workout.reps >= filterReps[0] && workout.reps <= filterReps[1]);

  // Search workouts
  const searchedWorkouts = filteredWorkouts.filter((workout) =>
    workout.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort options for Select
  const sortOptions = [
    { value: "load", label: "Load" },
    { value: "reps", label: "Reps" },
    { value: "time", label: "Time" },
    { value: "title", label: "Title" }
  ];

  // Handle Slider change
  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue);
  };

return (
  <>
  <Navbar />
    <div className="home">
    <div className="workouts ">
    <div className="workout-details-left md:w-2/3 w-full pr-4">
           {/* Search and Filter Inputs */}
           <div className="filters ">
            {/* grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-4 */}
             {/* Search input */}
             <input
               type="text"
               placeholder="Search by title..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="border rounded-lg p-2 shadow-md w-full"
             />

             {/* Custom Select Dropdown for Sorting */}
             <Select
               value={sortType}
               onChange={(e) => setSortType(e.target.value)}
               displayEmpty
               className="select-dropdown"
             >
               <MenuItem value="" disabled>
                 Sort by...
               </MenuItem>
               {sortOptions.map((option) => (
                 <MenuItem key={option.value} value={option.value}>
                   {option.label}
                 </MenuItem>
               ))}
             </Select>

             {/* Filter by Title */}
             <input
               type="text"
               placeholder="Filter by title..."
               value={filterTitle}
               onChange={(e) => setFilterTitle(e.target.value)}
               className="border rounded-lg p-2 shadow-md w-full"
             />

             {/* Load Range Slider */}
             <div className="w-full">
               <label className="block text-sm font-medium text-gray-700">Load Range (kg):</label>
               <Slider
                 value={filterLoad}
                 onChange={handleSliderChange(setFilterLoad)}
                 valueLabelDisplay="auto"
                 min={0}
                 max={200}
                 className="mt-2"
               />
             </div>

             {/* Reps Range Slider */}
             <div className="w-full">
               <label className="block text-sm font-medium text-gray-700">Reps Range:</label>
               <Slider
                 value={filterReps}
                 onChange={handleSliderChange(setFilterReps)}
                 valueLabelDisplay="auto"
                 min={0}
                 max={100}
                 className="mt-2"
               />
             </div>
           </div> 
           <div className="flex flex-col">
           {searchedWorkouts &&
              searchedWorkouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))}
        </div>
    </div>
    <div className=" workout-details-right  ">
    <WorkoutForm />
    </div>
</div>
</div>
</>
);    

};

export default Home;
