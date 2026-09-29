import {Center, Loader, Pagination, Stack, Text} from '@mantine/core';
import {useGetJobsQuery} from '../../store/jobs/jobsApi';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selectJobsFilters} from '../../store/jobs/jobsSelectors';
import {setPage} from '../../store/jobs/jobsSlice';
import {JobCard} from '../JobCard/JobCard';
import classes from './JobsList.module.scss';
import {useJobsFilters} from "@/hooks/useJobsFilters.ts";

export function JobsList() {
    const dispatch = useAppDispatch();
    // const filters = useAppSelector(selectJobsFilters);
    const { filters } = useJobsFilters();
    const {data, isLoading, isError} = useGetJobsQuery(filters);

    // console.log('filters ', filters);
    // console.log('data ', data);

    if (isLoading) {
        return (
            <Center className={classes.state}>
                <Loader/>
            </Center>
        );
    }

    if (isError) {
        return (
            <Center className={classes.state}>
                <Text>Failed to load jobs.</Text>
            </Center>
        );
    }

    if (!data?.jobs.length) {
        return (
            <Center className={classes.state}>
                <Text>Вакансии не найдены.</Text>
            </Center>
        );
    }

    return (
        <Stack gap="md">
            <Stack gap="sm">
                {data.jobs.map((job) => (
                    <JobCard key={job.id} job={job}/>
                ))}
            </Stack>

            <Center>
                <Pagination
                    value={filters.page}
                    total={data.pagination.totalPages}
                    onChange={(page) => dispatch(setPage(page))}
                />
            </Center>
        </Stack>
    );
}
