export type JobSpace = 'office' | 'remote' | 'hybrid';

export interface Job {
    id: number;
    company_name: string;
    name: string;
    city: string;
    salary: string;
    published_at: string;
    short_description: string;
    space: JobSpace;
    skills: string;
    experience: string;
    description: string;
    about_company: string;
}

export interface JobsQueryParams {
    page: number;
    search: string;
    city: string;
    skills: string[];
}

export interface JobsFiltersState {
    search: string;
    city: string;
    skills: string[];
    page: number;
}

export interface JobsFilters {
    search: string;
    city: string;
    skills: string[];
    page: number;
}
