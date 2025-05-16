import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

interface Exercise {
  id: number;
  name: string;
}

interface CreateWorkoutModalProps {
  open: boolean;
  onClose: () => void;
  exercises: Exercise[];
  onCreateExercise: (name: string) => Exercise;
  onCreateWorkout: (selectedExercises: Exercise[]) => void;
}

export default function CreateWorkoutModal({
  open,
  onClose,
  exercises,
  onCreateExercise,
  onCreateWorkout,
}: CreateWorkoutModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [newExerciseName, setNewExerciseName] = useState('');

  const filteredExercises = useMemo(() => {
    return exercises.filter(e =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [exercises, searchTerm]);

  const isExerciseFound = filteredExercises.length > 0;

  const toggleSelectExercise = (exercise: Exercise) => {
    setSelectedExercises(prev =>
      prev.find(e => e.id === exercise.id)
        ? prev.filter(e => e.id !== exercise.id)
        : [...prev, exercise]
    );
  };

  const handleAddNewExercise = () => {
    if (!newExerciseName.trim()) return;
    const created = onCreateExercise(newExerciseName.trim());
    setSelectedExercises(prev => [...prev, created]);
    setNewExerciseName('');
  };

  const handleCreateWorkout = () => {
    if (selectedExercises.length === 0) return;
    onCreateWorkout(selectedExercises);
    onClose();
    setSelectedExercises([]);
    setSearchTerm('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" scroll="paper">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Create New Workout
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            'aria-label': 'search exercises',
          }}
          sx={{ mb: 2 }}
        />

        {isExerciseFound ? (
          <List
            dense
            sx={{
              maxHeight: 300,
              overflowY: 'auto',
              bgcolor: 'background.paper',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
            }}
            data-testid="exercise-list"
          >
            {filteredExercises.map((exercise) => {
              const isSelected = selectedExercises.some(e => e.id === exercise.id);

              return (
                <ListItem
                  key={exercise.id}
                  onClick={() => toggleSelectExercise(exercise)}
                  sx={{
                    cursor: 'pointer',
                    userSelect: 'none',
                    bgcolor: isSelected ? 'primary.light' : 'inherit',
                    '&:hover': {
                      bgcolor: isSelected ? 'primary.main' : 'action.hover',
                      color: isSelected ? 'white' : 'inherit',
                    },
                  }}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleSelectExercise(exercise);
                    }
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isSelected}
                        onChange={() => toggleSelectExercise(exercise)}
                        onClick={(e) => e.stopPropagation()} // prevent double toggle
                      />
                    }
                    label={exercise.name}
                    sx={{ flexGrow: 1, m: 0 }}
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Box textAlign="center" mt={2}>
            <Typography variant="body1" mb={1}>
              No exercises found.
            </Typography>
            <TextField
              variant="outlined"
              placeholder="New exercise name"
              value={newExerciseName}
              onChange={(e) => setNewExerciseName(e.target.value)}
              aria-label="new exercise name"
              sx={{ mb: 1, width: '100%' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddNewExercise}
              disabled={!newExerciseName.trim()}
              fullWidth
            >
              Add New Exercise
            </Button>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateWorkout}
          disabled={selectedExercises.length === 0}
        >
          Create Workout
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
