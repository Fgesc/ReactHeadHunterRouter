import { Stack } from "@mantine/core";
import { SkillsFilter } from "../SkillsFilter/SkillsFilter";
import { CityFilter } from "../CityFilter/CityFilter";

export const JobFilters = () => {
    return (
        <Stack gap="lg" mt={24} maw={400} data-testid="job-filters-container">
            <SkillsFilter />
            <CityFilter />
        </Stack>
    );
};