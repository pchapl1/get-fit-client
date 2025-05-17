import React, { useEffect, useState } from "react";
import { Box, Typography, Fab, useTheme, useMediaQuery } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CreateWorkoutModal from "components/CreateWorkoutModal";
import WorkoutList from "components/WorkoutList";
import { fetchWorkouts } from "api/workoutApi";

interface Workout {
  id: number;
  name: string;
  date: string;
  duration: number;

}

// interface HomeProps {
//   recentWorkouts: Workout[];
//   onCreateNewWorkout: () => void;
// }

const exercisesData = [
  { id: 1, name: 'Push Up' },
  { id: 2, name: 'Squat' },
  { id: 3, name: 'Pull Up' },
];

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [ modalOpen, setModalOpen ] = useState(false);  
  const [ exercises, setExercises ] = useState(exercisesData);

  const [ workouts, setWorkouts ]= useState<Workout[]>([]);

  // calls for the workouts from api folder
  useEffect(() => {
    fetchWorkouts()
      .then(setWorkouts)
      .catch((err) => {
        if (err.response) {
          console.error("Response:", err.response.data);
        }
      });
  }, []);
  

  const handleCreateExercise = ( name: string ) => {
    const newExercise = {
      id: exercises.length + 1, 
      name,
    };
    setExercises([...exercises, newExercise]);
    return newExercise;
  };

  const handleCreateWorkout = ( selectedExercises: typeof exercises) => {
    console.log("workout created with exercises: ", selectedExercises);
    setModalOpen(false)
  }

  return (
    
    <Box
      sx={ { 
        p: 2,
        positon: 'relative', 
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary
      }}
      >
      <Typography variant="h5" gutterBottom sx={ { textAlign: 'center', mb: 2}}>
        Welcome to GetFit!
      </Typography>
      <Typography variant={isMobile? 'h5': "h4"} gutterBottom>
        Recent Workouts
      </Typography>

      {workouts.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No recent workouts. Tap the + button to create your first workout
        </Typography>
      ) : (
        <WorkoutList workouts={workouts} />
      )}


      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label= "Create new Workout"
        onClick={()=> {setModalOpen(true)}}
        disableRipple
        sx={ { 
          position: 'fixed',
          bottom: theme.spacing(3),
          right: theme.spacing(3),
          boxShadow: theme.shadows[6],

        }}
        data-testid= "fab-create-workout"
        >
          <AddIcon />
        </Fab>

        {/* Create workout modal  */}

        <CreateWorkoutModal
          open={modalOpen}
          onClose={()=> setModalOpen(false)}
          exercises={ exercises }
          onCreateExercise={handleCreateExercise}
          onCreateWorkout={handleCreateWorkout}
          />

    </Box>
  )

}