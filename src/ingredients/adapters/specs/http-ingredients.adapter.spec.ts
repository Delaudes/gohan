import { FakeHttpAdapter } from "../../../infra/http/fake-http.adapter";
import { HttpIngredientsAdapter } from "../http-ingredients.adapter";

describe(' Http ingredients adapter', () => {
    let adapter: HttpIngredientsAdapter;
    let fakeHttpAdapter: FakeHttpAdapter;

    beforeEach(() => {
        fakeHttpAdapter = new FakeHttpAdapter();
        adapter = new HttpIngredientsAdapter(fakeHttpAdapter);
    });


})