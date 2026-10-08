import {useSearchParams} from 'react-router';
import {useMemo} from 'react';

const DEFAULT_SKILLS = ['JavaScript', 'React', 'Redux', 'Python'];

interface JobsFilters {
    search: string;
    city: string;
    skills: string[];
    page: number;
}

function parseFiltersFromURL(searchParams: URLSearchParams): JobsFilters {
    const search = searchParams.get('search') ?? '';
    const city = searchParams.get('city') ?? '';
    const skillsParam = searchParams.get('skills');
    const skills = skillsParam === null ? DEFAULT_SKILLS : skillsParam.split(',').filter(Boolean);
    const pageParam = searchParams.get('page');
    const page = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;

    return {search, city, skills, page};
}

function buildSearchParams(filters: JobsFilters): URLSearchParams {
    const params = new URLSearchParams();

    if (filters.search) {
        params.set('search', filters.search);
    }
    if (filters.city) {
        params.set('city', filters.city);
    }
    params.set('skills', filters.skills.join(','));
    if (filters.page > 1) {
        params.set('page', String(filters.page));
    }

    return params;
}

export function useJobsFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(() => parseFiltersFromURL(searchParams), [searchParams]);

    const updateFilters = (updates: Partial<JobsFilters>, resetPage: boolean = false) => {
        const newFilters = {...filters, ...updates};
        if (resetPage) {
            newFilters.page = 1;
        }
        setSearchParams(buildSearchParams(newFilters));
    };

    const setSearch = (search: string) => updateFilters({search}, true);
    const setCity = (city: string) => updateFilters({city}, true);
    const setPage = (page: number) => updateFilters({page});
    const addSkill = (skill: string) => {
        const trimmed = skill.trim();
        if (!trimmed) return;
        if (filters.skills.some((item) => item.toLowerCase() === trimmed.toLowerCase())) return;
        updateFilters({skills: [...filters.skills, trimmed]}, true);
    };
    const removeSkill = (skill: string) => {
        updateFilters({skills: filters.skills.filter((item) => item !== skill)}, true);
    };

    return {
        filters,
        setSearch,
        setCity,
        setPage,
        addSkill,
        removeSkill,
    };
}
