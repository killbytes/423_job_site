import {Select, Stack} from '@mantine/core';
import {useMemo} from 'react';
import {SkillsInput} from '../SkillsInput/SkillsInput';
import classes from './JobFilters.module.scss';
import {useGetJobsQuery} from "@/store/jobs/jobsApi.ts";
import {IconMapPin} from "@tabler/icons-react";
import {useJobsFilters} from '../../hooks/useJobsFilters';

export function JobFilters() {
    const {filters, setCity} = useJobsFilters();
    const {data} = useGetJobsQuery(filters);
    const jobs = data?.jobs;
    const city = filters.city;

    const cities = useMemo(() => {
        if (!jobs) {
            return [];
        }
        return [...new Set(jobs.map((job) => job.city))]
            .sort((a, b) => a.localeCompare(b, 'ru'));
    }, [jobs]);

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
                    onChange={(value) => setCity(value === 'all' ? '' : value ?? '')}
                    allowDeselect={false}
                />
            </Stack>
        </Stack>
    );
}
