import { Directive, effect, ElementRef, inject, input } from "@angular/core";

@Directive({
    selector: '[appCloseWhen]',
})
export class CloseWhenDirective {
    private readonly elementRef = inject(ElementRef<HTMLDialogElement>);
    readonly appCloseWhen = input.required<boolean>();

    constructor() {
        effect(() => {
            if (this.appCloseWhen()) {
                this.elementRef.nativeElement.close();
            }
        });
    }
}
