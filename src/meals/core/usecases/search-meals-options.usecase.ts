import { MealsView } from "../meals.view";

export class SearchMealsOptionsUseCase {
    constructor(
        private readonly mealsView: MealsView,
    ) { }

    execute(query: string): void {
        const normalizedQuery = query.trim().toLowerCase();
        const current = this.mealsView.mealsViewModel.get();
        const firstMatch = normalizedQuery
            ? current.mealsOptions.find(option => option.name.toLowerCase().includes(normalizedQuery))
            : undefined;
        this.mealsView.update({
            mealsOptions: current.mealsOptions.map(option => ({
                ...option,
                isVisible: option.id === firstMatch?.id,
            })),
            hasMealsOptions: firstMatch !== undefined,
        });
    }
}
