import { Dialog } from "../../../presentation/dialog/dialog.port";
import { RecipesPort } from "../recipes.port";
import { RecipesView } from "../recipes.view";

export class DeleteRecipeUseCase {
    constructor(
        private readonly recipesView: RecipesView,
        private readonly recipesPort: RecipesPort,
    ) { }

    async execute(id: string, dialog: Dialog): Promise<void> {
        this.startLoading(id);
        try {
            await this.recipesPort.deleteRecipe(id);
            this.presentRecipeDeleted(id);
            dialog.close();
        } catch {
            this.presentError(id);
        } finally {
            this.stopLoading(id);
        }
    }

    private startLoading(id: string): void {
        const recipes = this.recipesView.recipesViewModel.get().recipes.map(recipe =>
            recipe.id === id ? { ...recipe, isLoadingDeleting: true, isErrorDeleting: false } : recipe
        );
        this.recipesView.update({ recipes });
    }

    private stopLoading(id: string): void {
        const recipes = this.recipesView.recipesViewModel.get().recipes.map(recipe =>
            recipe.id === id ? { ...recipe, isLoadingDeleting: false } : recipe
        );
        this.recipesView.update({ recipes });
    }

    private presentError(id: string): void {
        const recipes = this.recipesView.recipesViewModel.get().recipes.map(recipe =>
            recipe.id === id ? { ...recipe, isErrorDeleting: true } : recipe
        );
        this.recipesView.update({ recipes });
    }

    private presentRecipeDeleted(id: string): void {
        const recipes = this.recipesView.recipesViewModel.get().recipes.filter(recipe => recipe.id !== id);
        this.recipesView.update({
            recipes,
            hasRecipes: recipes.length > 0,
        });
    }
}
