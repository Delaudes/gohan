import { AppParam } from './app-param';

export interface RoutePort {
    getParam(param: AppParam): string;
}
