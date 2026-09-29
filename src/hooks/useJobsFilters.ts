import { useSearchParams } from 'react-router';
import type { JobsFilters } from '../shared/types/jobs.types';

const DEFAULT_PAGE = 1;

export function useJobsFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const search        = searchParams.get('search') ?? '';
    const city          = searchParams.get('city') ?? '';
    const skillsParam   = searchParams.get('skills') ?? '';

    const skills             = skillsParam ? skillsParam.split(',').filter((x) => Boolean(x)) : [];

    const pageParam = Number(searchParams.get('page'));
    const page      = pageParam > 0 ? pageParam : DEFAULT_PAGE;

    const filters: JobsFilters = {search, city, skills, page};

    const setSearch = (value: string) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);

            if (value.trim()) {
                params.set('search', value.trim());
            } else {
                params.delete('search');
            }

            params.delete('page');

            return params;
        });
    };

    const setCity = (value: string) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);

            if (value) {
                params.set('city', value);
            } else {
                params.delete('city');
            }

            params.delete('page');

            return params;
        });
    };

    const setSkills = (values: string[]) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);

            if (values.length > 0) {
                params.set('skills', values.join(','));
            } else {
                params.delete('skills');
            }

            params.delete('page');

            return params;
        });
    };

    const setPage = (value: number) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);

            if (value > DEFAULT_PAGE) {
                params.set('page', String(value));
            } else {
                params.delete('page');
            }

            return params;
        });
    };

    const resetFilters = () => {setSearchParams({})};

    return {filters, setSearch, setCity, setSkills, setPage, resetFilters};
}