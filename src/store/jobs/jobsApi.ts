import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { JobsResponse } from '../../shared/types/api';
import type { JobsQueryParams } from '../../shared/types/jobs.types';

export const jobsApi = createApi({
    reducerPath: 'jobsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://kata-jobs.onrender.com/api/',
    }),
    endpoints: (builder) => ({
        getJobs: builder.query<JobsResponse, JobsQueryParams>({
            query: ({ page, search, city, skills }) => ({
                url: 'jobs',
                params: {
                    page,
                    search: search || undefined,
                    city: city || undefined,
                    skills: skills.length ? skills.join(',') : undefined,
                },
            }),
        }),
    }),
});

export const { useGetJobsQuery } = jobsApi;
