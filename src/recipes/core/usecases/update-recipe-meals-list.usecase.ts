import { RecipesPort } from "../recipes.port";
import { RecipesView } from "../recipes.view";
import { RecipeDomainModel } from "../models/recipes.domain.model";

export class UpdateRecipeMealsListUseCase {
    constructor(
        private readonly recipesView: RecipesView,
        private readonly recipesPort: RecipesPort,
    ) { }

    async execute(id: string, inMealsList: boolean): Promise<void> {
        this.startLoading(id);
        try {
            const recipe = await this.recipesPort.updateRecipe(id, inMealsList);
            this.presentRecipeUpdated(recipe);
        } catch {
            this.presentError(id);
        } finally {
            this.stopLoading(id);
        }
    }

    private startLoading(id: string): void {
        const recipes = this.recipesView.recipesViewModel.get().recipes.map(recipe =>
            recipe.id === id ? { ...recipe, isLoadingUpdating: true, isErrorUpdating: false } : recipe
        );
        this.recipesView.update({ recipes });
    }

    private stopLoading(id: string): void {
        const recipes = this.recipesView.recipesViewModel.get().recipes.map(recipe =>
            recipe.id === id ? { ...recipe, isLoadingUpdating: false } : recipe
        );
        this.recipesView.update({ recipes });
    }

    private presentError(id: string): void {
        const recipes = this.recipesView.recipesViewModel.get().recipes.map(recipe =>
            recipe.id === id ? { ...recipe, isErrorUpdating: true } : recipe
        );
        this.recipesView.update({ recipes });
    }

    private presentRecipeUpdated(recipe: RecipeDomainModel): void {
        const recipes = this.recipesView.recipesViewModel.get().recipes.map(current =>
            recipe.is(current.id) ? { ...current, inMealsList: recipe.inMealsList } : current
        );
        this.recipesView.update({ recipes });
    }
}
