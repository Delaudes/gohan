import { IngredientsView } from "../ingredients.view";

export class SearchIngredientsUseCase {
    constructor(
        private readonly ingredientsView: IngredientsView,
    ) { }

    execute(query: string): void {
        this.ingredientsView.update(vm => vm.presentSearchQuery(query));
    }
}
