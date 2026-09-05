import { RecipesPort } from "../recipes.port";
import { RecipesView } from "../recipes.view";
import { RecipeDeletionErrorMessage } from "../models/recipe.view.model";
import { RecipeDeletionError } from "../models/recipes.domain.model";

export class DeleteRecipeUseCase {
    constructor(
        private readonly recipesView: RecipesView,
        private readonly recipesPort: RecipesPort,
    ) { }

    async execute(id: string): Promise<void> {
        this.recipesView.update(vm => vm.startLoadingDeletingRecipe(id));
        const result = await this.recipesPort.deleteRecipe(id);
        if (result.success) {
            this.recipesView.update(vm => vm.presentRecipeDeleted(id));
        } else {
            const errorMessage = this.findErrorMessage(result.error);
            this.recipesView.update(vm => vm.presentErrorDeletingRecipe(id, errorMessage));
        }
        this.recipesView.update(vm => vm.stopLoadingDeletingRecipe(id));
    }

    private findErrorMessage(error: RecipeDeletionError): RecipeDeletionErrorMessage {
        const errorMessages: Record<RecipeDeletionError, RecipeDeletionErrorMessage> = {
            'RecipeInMealsListError': 'Recette non supprimable : elle est dans la liste de repas',
            'UnknownError': 'Une erreur est survenue, réessayez.',
        };
        return errorMessages[error];
    }
}
