import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { JobsFiltersState } from '../../shared/types';

const initialState: JobsFiltersState = {
    search: '',
    city: '',
    skills: ['JavaScript', 'React', 'Redux', 'Python'],
    page: 1,
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
            state.page = 1;
        },
        setCity(state, action: PayloadAction<string>) {
            state.city = action.payload;
            state.page = 1;
        },
        addSkill(state, action: PayloadAction<string>) {
            const skill = action.payload.trim();

            if (!skill) return;
            if (state.skills.some((item) => item.toLowerCase() === skill.toLowerCase())) return;

            state.skills.push(skill);
            state.page = 1;
        },
        removeSkill(state, action: PayloadAction<string>) {
            state.skills = state.skills.filter((skill) => skill !== action.payload);
            state.page = 1;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
    },
});

export const { setSearch, setCity, addSkill, removeSkill, setPage } = jobsSlice.actions;
export default jobsSlice.reducer;
