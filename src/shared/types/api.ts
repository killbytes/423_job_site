import type { Job } from './jobs.types';

export interface JobsPagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface JobsResponse {
    success: boolean;
    pagination: JobsPagination;
    jobs: Job[];
}
