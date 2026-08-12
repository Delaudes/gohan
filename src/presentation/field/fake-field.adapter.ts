import { Field } from "./field.port";

export class FakeField implements Field {
    value = '';
    focused = false;

    focus(): void {
        this.focused = true;
    }
}
