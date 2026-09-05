import { MealsView } from "../meals.view";

export class SearchMealsOptionsUseCase {
    constructor(
        private readonly mealsView: MealsView,
    ) { }

    execute(query: string): void {
        this.mealsView.update(vm => vm.presentSearchQuery(query));
    }
}
