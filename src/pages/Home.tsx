import { Typography, Button, Stack } from '@mui/material';

export default function Home() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Welcome to GetFit</Typography>
      <Typography>
        This is the homepage of your fitness tracker app. Get started by exploring workouts!
      </Typography>
      <Button variant="contained" color="primary">
        View Workouts
      </Button>
    </Stack>
  );
}
