import { ActionIcon, Group, Pill, Stack, Text, TextInput } from '@mantine/core';
import { useState, type KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addSkill, removeSkill } from '../../store/jobs/jobsSlice';
import { selectSkills } from '../../store/jobs/jobsSelectors';
import classes from './SkillsInput.module.scss';

export function SkillsInput() {
    const dispatch = useAppDispatch();
    const skills = useAppSelector(selectSkills);
    const [value, setValue] = useState('');

    const handleAdd = () => {
        const skill = value.trim();
        if (!skill) return;

        dispatch(addSkill(skill));
        setValue('');
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAdd();
        }
    };

    return (
        <Stack gap={8}>
            <Text size="sm" fw={600}>
                Ключевые навыки
            </Text>

            <div className={classes.box}>
                <Group gap={6} wrap="wrap">
                    {skills.map((skill) => (
                        <Pill
                            key={skill}
                            withRemoveButton
                            onRemove={() => dispatch(removeSkill(skill))}
                        >
                            {skill}
                        </Pill>
                    ))}

                    <TextInput
                        className={classes.input}
                        variant="unstyled"
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Добавить навык"
                        size="sm"
                    />

                    <ActionIcon
                        type="button"
                        variant="light"
                        size="sm"
                        radius="sm"
                        aria-label="Добавить навык"
                        onClick={handleAdd}
                    >
                        +
                    </ActionIcon>
                </Group>
            </div>
        </Stack>
    );
}
