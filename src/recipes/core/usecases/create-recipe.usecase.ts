import { Dialog } from "../../../presentation/dialog/dialog.port";
import { Field } from "../../../presentation/field/field.port";
import { RecipeDomainModel } from "../models/recipes.domain.model";
import { RecipesPort } from "../recipes.port";
import { RecipesView } from "../recipes.view";

export class CreateRecipeUseCase {
    constructor(
        private readonly recipesView: RecipesView,
        private readonly recipesPort: RecipesPort,
    ) { }

    async execute(dialog: Dialog, field: Field): Promise<void> {
        this.startLoading();
        try {
            const recipe = await this.recipesPort.createRecipe(field.value.trim());
            this.presentRecipeCreated(recipe);
            field.value = '';
            dialog.close();
        } catch {
            this.presentError();
        } finally {
            this.stopLoading();
        }
    }

    private startLoading(): void {
        this.recipesView.update({ isLoadingCreatingRecipe: true, isErrorCreatingRecipe: false });
    }

    private stopLoading(): void {
        this.recipesView.update({ isLoadingCreatingRecipe: false });
    }

    private presentError(): void {
        this.recipesView.update({ isErrorCreatingRecipe: true });
    }

    private presentRecipeCreated(recipe: RecipeDomainModel): void {
        const recipes = [
            ...this.recipesView.recipesViewModel().recipes,
            { id: recipe.id, name: recipe.name, isLoadingDeleting: false, isErrorDeleting: false, isLoadingUpdating: false, isErrorUpdating: false, inMealsList: recipe.inMealsList },
        ];
        this.recipesView.update({ recipes, hasRecipes: true });
    }
}
