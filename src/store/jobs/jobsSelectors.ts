import type { RootState } from '../index';

export const selectJobsFilters = (state: RootState) => state.jobs;
export const selectSearch = (state: RootState) => state.jobs.search;
export const selectCity = (state: RootState) => state.jobs.city;
export const selectSkills = (state: RootState) => state.jobs.skills;
