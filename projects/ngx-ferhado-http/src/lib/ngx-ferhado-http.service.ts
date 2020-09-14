import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { clean_url, isObject, isFunction } from './utils';

interface RequestOptions {
  useUrlPrefix?: boolean,
  headers?: any,
  observe?: 'body' | 'events' | 'response',
  reportProgress?: boolean,
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
  withCredentials?: boolean,
}

@Injectable({
  providedIn: 'root'
})

export class NgxFerhadoHttp {

  constructor(@Inject('HttpConfig') private config, private http: HttpClient) { }

  private request(method, url, params?, options?, callback?): Observable<any> {

    let data;
    let reqUrl = url;
    let httpParams = new HttpParams();
    let reqOptions: any = { useUrlPrefix: true };

    if (isObject(options)) reqOptions = Object.assign(reqOptions, options);

    // create request headers
    if (reqOptions.headers) reqOptions.headers = new HttpHeaders(reqOptions.headers);

    if (isObject(params)) {
      if (params instanceof FormData) {
        data = params;
        reqOptions.reportProgress = reqOptions.reportProgress || true;
        reqOptions.observe = reqOptions.observe || 'events';
      } else {
        for (let key in params) httpParams = httpParams.append(key, params[key]);
        data = httpParams;
        if (method == "GET") reqOptions.params = data;
      }
    }

    reqOptions.body = data;

    if (this.config?.requestUrlPrefix && reqOptions.useUrlPrefix !== false) {
      reqUrl = this.config.requestUrlPrefix + '/' + url;
    }

    // request
    let request = this.http.request(method, clean_url(reqUrl), reqOptions);

    // callback
    if (isFunction(params)) callback = params;
    if (isFunction(options)) callback = options;

    // response
    request.pipe(
      map((response) => {
        if (isFunction(callback)) callback(response);
      })
    ).toPromise();

    return request;
  }


  public post(url, params?, options?: RequestOptions | Function, callback?) {
    return this.request("POST", url, params, options, callback);
  }

  public put(url, params?, options?: RequestOptions | Function, callback?) {
    return this.request("PUT", url, params, options, callback);
  }

  public patch(url, params?, options?: RequestOptions | Function, callback?) {
    return this.request("PATCH", url, params, options, callback);
  }

  public get(url, params?, options?: RequestOptions | Function, callback?) {
    return this.request("GET", url, params, options, callback);
  }

  public delete(url, params?, options?: RequestOptions | Function, callback?) {
    return this.request("DELETE", url, params, options, callback);
  }

  public head(url, params?, options?: RequestOptions | Function, callback?) {
    return this.request("HEAD", url, params, options, callback);
  }

}
