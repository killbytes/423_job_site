import {Select, Stack} from '@mantine/core';
import {useMemo} from 'react';
import {SkillsInput} from '../SkillsInput/SkillsInput';
import classes from './JobFilters.module.scss';
import {useGetJobsQuery} from "@/store/jobs/jobsApi.ts";
import {IconMapPin} from "@tabler/icons-react";
import { useJobsFilters } from '../../hooks/useJobsFilters';

export function JobFilters() {
    const {filters, setCity, setSkills,} = useJobsFilters();
    const { data: citiesData } = useGetJobsQuery({
        page: 1,
        search: '',
        city: '',
        skills: [],
    });

    const cities = useMemo(() => {
        if (!citiesData?.jobs) {
            return [];
        }
        return [...new Set(citiesData.jobs.map((job) => job.city))]
            .sort((a, b) => a.localeCompare(b, 'ru'));
    }, [citiesData?.jobs]);

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
                <SkillsInput
                    skills={filters.skills}
                    onChange={setSkills}
                />
            </Stack>
            <Stack
                bg="white"
                p="md"
                style={{borderRadius: 8}}
            >
                <Select
                    leftSection={<IconMapPin size={16} />}
                    placeholder="Все города"
                    data={cityOptions}
                    value={filters.city || null}
                    onChange={(value) => setCity(value ?? '')}
                    allowDeselect={false}
                />
            </Stack>
        </Stack>
    );
}
