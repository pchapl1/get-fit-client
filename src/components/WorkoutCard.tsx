import { Card, CardContent, Typography, Box } from "@mui/material";

export interface Workout {
    id: number;
    name: string;
    date: string;
    duration: number;
}

interface WorkoutCardProps {
    workout: Workout;
}

export default function WorkoutCard ({workout}: WorkoutCardProps) {

    const formattedDate = new Date(workout.date).toLocaleDateString();

    return (

    <Card sx={{ width: "100%", maxWidth: 500, mx: "auto", my: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {workout.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">📅 {formattedDate}</Typography>
          <Typography variant="body2">⏱️ {workout.duration} min</Typography>
        </Box>
      </CardContent>
    </Card>
  );

}