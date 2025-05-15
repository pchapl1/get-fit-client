import { Typography, Box } from '@mui/material';

export default function NotFound() {
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h3">404</Typography>
      <Typography variant="h6">Page not found</Typography>
    </Box>
  );
}
