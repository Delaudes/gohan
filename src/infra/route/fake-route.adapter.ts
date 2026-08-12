import { AppParam } from './app-param';
import { RoutePort } from './route.port';

export class FakeRouteAdapter implements RoutePort {
    params: Partial<Record<AppParam, string>> = {};

    getParam(param: AppParam): string {
        return this.params[param] ?? '';
    }
}
