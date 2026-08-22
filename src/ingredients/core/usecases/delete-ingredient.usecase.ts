import { Dialog } from "../../../presentation/dialog/dialog.port";
import { IngredientsPort } from "../ingredients.port";
import { IngredientsView } from "../ingredients.view";

export class DeleteIngredientUseCase {
    constructor(
        private readonly ingredientsView: IngredientsView,
        private readonly ingredientsPort: IngredientsPort,
    ) { }

    async execute(id: string, dialog: Dialog): Promise<void> {
        this.ingredientsView.update(vm => vm.startLoadingDeletingIngredient(id));
        try {
            await this.ingredientsPort.deleteIngredient(id);
            this.ingredientsView.update(vm => vm.presentIngredientDeleted(id));
            dialog.close();
        } catch {
            this.ingredientsView.update(vm => vm.presentErrorDeletingIngredient(id));
        } finally {
            this.ingredientsView.update(vm => vm.stopLoadingDeletingIngredient(id));
        }
    }
}
