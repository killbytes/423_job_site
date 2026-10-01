import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { JobsResponse, JobResponse } from '../../shared/types/api';
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
        getJobById: builder.query<JobResponse, number>({
            query: (id) => `jobs/${id}`,
        }),
    }),
});

export const { useGetJobsQuery, useGetJobByIdQuery, } = jobsApi;
