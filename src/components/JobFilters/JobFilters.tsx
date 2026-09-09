import {Select, Stack} from '@mantine/core';
import {useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selectCity, selectJobsFilters} from '../../store/jobs/jobsSelectors';
import {setCity} from '../../store/jobs/jobsSlice';
import {SkillsInput} from '../SkillsInput/SkillsInput';
import classes from './JobFilters.module.scss';
import {useGetJobsQuery} from "@/store/jobs/jobsApi.ts";
import {IconMapPin} from "@tabler/icons-react";

export function JobFilters() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectJobsFilters);
    const {data} = useGetJobsQuery(filters);
    const city = useAppSelector(selectCity);

    const cities = useMemo(() => {
        if (!data?.jobs) {
            return [];
        }
        return [...new Set(data.jobs.map((job) => job.city))]
            .sort((a, b) => a.localeCompare(b, 'ru'));
    }, [data?.jobs]);

    const cityOptions = [
        {value: '', label: 'Все города'},
        ...cities.map((city) => ({
            value: city,
            label: city,
        })),
    ];

    return (
        <Stack gap="md" className={classes.filters}>
            <Stack
                bg="white"
                p="md"
                style={{borderRadius: 8}}
            >
                <SkillsInput/>
            </Stack>
            <Stack
                bg="white"
                p="md"
                style={{borderRadius: 8}}
            >
                <Select
                    leftSection={<IconMapPin size={16}/>}
                    placeholder="Все города"
                    data={cityOptions}
                    value={city || 'all'}
                    onChange={(value) => dispatch(setCity(value === 'all' ? '' : value ?? ''))}
                    allowDeselect={false}
                />
            </Stack>
        </Stack>
    );
}
