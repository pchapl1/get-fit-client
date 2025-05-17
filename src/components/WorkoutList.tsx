import { Typography, Box } from "@mui/material";
import WorkoutCard, { Workout } from "./WorkoutCard";

interface WorkoutListProps {
  workouts: Workout[];
  title?: string;
}

export default function WorkoutList({ workouts, title }: WorkoutListProps) {
  if (!workouts.length) {
    return (
      <Typography textAlign="center" mt={4} variant="body1">
        No workouts to display.
      </Typography>
    );
  }

  return (
    <Box px={2}>
      {title && (
        <Typography variant="h5" gutterBottom textAlign="center">
          {title}
        </Typography>
      )}
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </Box>
  );
}
export {}