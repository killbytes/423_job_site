import {ActionIcon, Group, Pill, Stack, Text, TextInput} from '@mantine/core';
import {useState, type KeyboardEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {addSkill, removeSkill} from '../../store/jobs/jobsSlice';
import {selectSkills} from '../../store/jobs/jobsSelectors';

interface SkillsInputProps {
    skills: string[];
    onChange: (skills: string[]) => void;
}

export function SkillsInput({skills, onChange}: SkillsInputProps)  {
    // const dispatch = useAppDispatch();
    // const skills = useAppSelector(selectSkills);
    const [value, setValue] = useState('');

    const handleAdd = () => {
        const skill = value.trim();
        if (!skill) return;
        if (skills.includes(skill)) {
            setValue('');
            return;
        }
        onChange([...skills, skill]);
        setValue('');
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAdd();
        }
    };

    const handleRemove = (skillToRemove: string) => {
        onChange(
            skills.filter(
                (skill) => skill !== skillToRemove,
            ),
        );
    };

    return (

        <Stack gap={8}>
            <Text size="sm" fw={600} ta={"left"}>
                Ключевые навыки
            </Text>
            <Group gap={6} wrap="nowrap">
                <TextInput
                    placeholder="Навык"
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    onKeyDown={handleKeyDown}
                    size="xs"
                    style={{width: '100%'}}
                />

                <ActionIcon
                    type="button"
                    variant="light"
                    size="md"
                    radius="sm"
                    aria-label="Добавить навык"
                    onClick={handleAdd}
                >
                    +
                </ActionIcon>
            </Group>
            <Group gap={6} wrap="wrap">
                {skills.map((skill) => (
                    <Pill
                        key={skill}
                        withRemoveButton
                        onRemove={() => handleRemove(skill)}
                    >
                        {skill}
                    </Pill>
                ))}
            </Group>
        </Stack>
    );
}
