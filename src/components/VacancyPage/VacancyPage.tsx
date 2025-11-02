import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Card, Group, Stack, Title, Text, useMantineTheme, Loader, Center } from "@mantine/core";
import { VacancyService } from "../../api/VacancyService";
import type { typeVacancy } from "../../types/typeVacancy";
import { formatSalary } from "../../utils/formatSalary";
import { NotFoundPage } from "../NotFoundPage";
import styles from "./VacancyPage.module.css";

export const VacancyPage = memo(() => {
    const theme = useMantineTheme();
    const { id } = useParams<{ id: string }>();
    const [vacancy, setVacancy] = useState<typeVacancy | null>(null);
    const [loading, setLoading] = useState(true);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (id) {
            VacancyService.getJobById(id)
                .then((data) => {
                    setVacancy(data);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return (
            <Center mt={72}>
                <Loader color="indigo" />
            </Center>
        );
    }

    if (!vacancy) {
        return (
            <NotFoundPage />
        );
    }

    const salaryText = formatSalary(vacancy.salary);

    return (
        <Stack gap={29} mt={24}>
            <Card
                data-testid={`vacancy-item-${vacancy.id}`}
                w={658}
                p={16}
                className={styles.vacancy_card}
            >
                <Stack gap={16}>
                    <Stack gap={8}>
                        <Title order={3} c="indigo.9" fw={500} fz={20} data-testid={`vacancy-title-${vacancy.id}`}>
                            {vacancy.name}
                        </Title>

                        <Group>
                            {salaryText && (
                                <Text fw={400} fz={16} c={theme.other.colors.black1} data-testid={`vacancy-salary-${vacancy.id}`}>
                                    {salaryText}
                                </Text>
                            )}

                            {vacancy.experience?.name && (
                                <Text fw={400} fz={14} c={theme.other.colors.gray} data-testid={`vacancy-experience-${vacancy.id}`}>
                                    {vacancy.experience.name}
                                </Text>
                            )}
                        </Group>
                    </Stack>

                    <Stack h={76} gap={0}>
                        <Text fw={400} fz={14} c={theme.other.colors.gray} mb={8} data-testid={`vacancy-employer-${vacancy.id}`}>
                            {vacancy.employer?.name || "Компания не указана"}
                        </Text>

                        {vacancy.schedule?.name && (
                            <Box
                                w="fit-content"
                                px={8}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    borderRadius: "6px",
                                    backgroundColor: theme.colors.indigo[9],
                                }}
                            >
                                <Text fw={700} fz={10} c="white" data-testid={`vacancy-schedule-${vacancy.id}`}>
                                    {vacancy.schedule.name.toUpperCase()}
                                </Text>
                            </Box>
                        )}

                        <Text fw={400} fz={16} c={theme.other.colors.black1} data-testid={`vacancy-area-${vacancy.id}`}>
                            {vacancy.area?.name || "Регион не указан"}
                        </Text>
                    </Stack>

                    <Button
                        data-testid={`vacancy-apply-btn-${vacancy.id}`}
                        component="a"
                        href={vacancy.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        w={172}
                        h={36}
                        p={0}
                        variant="filled"
                        size="sm"
                        radius="sm"
                        color={theme.other.colors.black1}
                        styles={{ label: { fontWeight: 400, fontSize: "14px" } }}
                        style={{ opacity: hovered ? 0.7 : 1 }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        Откликнуться на hh.ru
                    </Button>
                </Stack>
            </Card>

            <Center>
                <Stack className={styles.vacancy_snippet} gap={12} w={658} p={24} bg={theme.other.colors.white} bdrs={12}>
                    <Stack gap={12}>
                        <Title order={4} fw={600} fz={20} data-testid="aboutCompanyTitle">
                            Компания
                        </Title>

                        <Text fw={400} fz={16} data-testid="aboutCompanyText">
                            {vacancy.employer?.name || "Компания не указана"}
                        </Text>
                    </Stack>

                    <Box
                        fw={400}
                        fz={16}
                        data-testid="aboutProjectText"
                        style={{ color: theme.other.colors.black1, lineHeight: 1.5 }}
                        dangerouslySetInnerHTML={{
                            __html: vacancy.snippet || "Описание отсутствует",
                        }}
                    />
                </Stack>
            </Center>
        </Stack>
    );
});
