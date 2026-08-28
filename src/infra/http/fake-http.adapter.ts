import { HttpPort } from './http.port';

export class FakeHttpAdapter implements HttpPort {
  getResponse?: unknown;
  postResponse?: unknown;
  putResponse?: unknown;
  patchResponse?: unknown;
  deleteResponse?: unknown;

  lastGetUrl?: string;
  lastPostUrl?: string;
  lastPostBody?: unknown;
  lastPutUrl?: string;
  lastPutBody?: unknown;
  lastPatchUrl?: string;
  lastPatchBody?: unknown;
  lastDeleteUrl?: string;

  get<T>(url: string): Promise<T> {
    this.lastGetUrl = url;
    return Promise.resolve(this.getResponse as T);
  }

  post<T>(url: string, body: unknown): Promise<T> {
    this.lastPostUrl = url;
    this.lastPostBody = body;
    return Promise.resolve(this.postResponse as T);
  }

  put<T>(url: string, body: unknown): Promise<T> {
    this.lastPutUrl = url;
    this.lastPutBody = body;
    return Promise.resolve(this.putResponse as T);
  }

  patch<T>(url: string, body: unknown): Promise<T> {
    this.lastPatchUrl = url;
    this.lastPatchBody = body;
    return Promise.resolve(this.patchResponse as T);
  }

  delete<T>(url: string): Promise<T> {
    this.lastDeleteUrl = url;
    return Promise.resolve(this.deleteResponse as T);
  }
}
