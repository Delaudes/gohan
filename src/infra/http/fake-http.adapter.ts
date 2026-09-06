import { HttpPort } from './http.port';

export class FakeHttpAdapter implements HttpPort {
  getResponseByUrl: Record<string, unknown> = {};
  postResponseByUrlAndBody: Record<string, unknown> = {};
  putResponseByUrlAndBody: Record<string, unknown> = {};
  patchResponseByUrlAndBody: Record<string, unknown> = {};
  deleteResponseByUrl: Record<string, unknown> = {};
  deleteErrorByUrl: Record<string, unknown> = {};

  async get<T>(url: string): Promise<T> {
    return this.getResponseByUrl[url] as T;
  }

  async post<T>(url: string, body: unknown): Promise<T> {
    return this.postResponseByUrlAndBody[this.key(url, body)] as T;
  }

  async put<T>(url: string, body: unknown): Promise<T> {
    return this.putResponseByUrlAndBody[this.key(url, body)] as T;
  }

  async patch<T>(url: string, body: unknown): Promise<T> {
    return this.patchResponseByUrlAndBody[this.key(url, body)] as T;
  }

  async delete<T>(url: string): Promise<T> {
    if (url in this.deleteErrorByUrl) throw this.deleteErrorByUrl[url];
    return this.deleteResponseByUrl[url] as T;
  }

  private key(url: string, body: unknown): string {
    return `${url}:${JSON.stringify(body)}`;
  }
}
