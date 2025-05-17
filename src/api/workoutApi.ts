import axios from "axios";
import api from 'api/axios';

export interface Workout {
    id: number;
    name: string;
    date: string;
    duration: number;
}

export async function fetchWorkouts(): Promise<Workout[]> {
    console.log('in the fetch workouts function:.....')
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/workouts/`);
    return response.data
}