import { useSearchParams } from 'react-router';
import type { JobsFilters } from '../shared/types/jobs.types';

const DEFAULT_PAGE = 1;

export function useJobsFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const search        = searchParams.get('search') ?? '';
    const city          = searchParams.get('city') ?? '';
    const skillsParam   = searchParams.get('skills') ?? '';

    const skills             = skillsParam ? skillsParam.split(',').filter(Boolean) : [];
    const pageParam = Number(searchParams.get('page'));
    const page      = pageParam > 0 ? pageParam : DEFAULT_PAGE;

    const filters: JobsFilters = {search, city, skills, page};
    return {filters};
}