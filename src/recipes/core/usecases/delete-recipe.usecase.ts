import { Dialog } from "../../../presentation/dialog/dialog.port";
import { RecipesPort } from "../recipes.port";
import { RecipesView } from "../recipes.view";

export class DeleteRecipeUseCase {
    constructor(
        private readonly recipesView: RecipesView,
        private readonly recipesPort: RecipesPort,
    ) { }

    async execute(id: string, dialog: Dialog): Promise<void> {
        this.recipesView.update(vm => vm.startLoadingDeletingRecipe(id));
        try {
            await this.recipesPort.deleteRecipe(id);
            this.recipesView.update(vm => vm.presentRecipeDeleted(id));
            dialog.close();
        } catch {
            this.recipesView.update(vm => vm.presentErrorDeletingRecipe(id));
        } finally {
            this.recipesView.update(vm => vm.stopLoadingDeletingRecipe(id));
        }
    }
}
