import { Dialog } from "../../../presentation/dialog/dialog.port";
import { Field } from "../../../presentation/field/field.port";
import { RecipeDomainModel } from "../models/recipes.domain.model";
import { RecipesPort } from "../recipes.port";
import { RecipesView } from "../recipes.view";
import { RecipeViewModel } from "../models/recipe.view.model";

export class CreateRecipeUseCase {
    constructor(
        private readonly recipesView: RecipesView,
        private readonly recipesPort: RecipesPort,
    ) { }

    async execute(dialog: Dialog, field: Field): Promise<void> {
        this.recipesView.update(vm => vm.startLoadingCreatingRecipe());
        try {
            const recipe = await this.recipesPort.createRecipe(field.value.trim());
            this.presentRecipeCreated(recipe);
            field.value = '';
            dialog.close();
        } catch {
            this.recipesView.update(vm => vm.presentErrorCreatingRecipe());
        } finally {
            this.recipesView.update(vm => vm.stopLoadingCreatingRecipe());
        }
    }

    private presentRecipeCreated(recipe: RecipeDomainModel): void {
        const recipeViewModel = new RecipeViewModel({
            id: recipe.id,
            name: recipe.name,
            isLoadingDeleting: false,
            isErrorDeleting: false,
            isLoadingUpdating: false,
            isErrorUpdating: false,
            inMealsList: recipe.inMealsList,
        });
        this.recipesView.update(vm => vm.presentRecipeCreated(recipeViewModel));
    }
}
