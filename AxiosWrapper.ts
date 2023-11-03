import { API } from 'opennms';
import { AxiosInstance } from 'axios';

export class AxiosWrapper implements API.IOnmsHTTP {
  axiosImpl: AxiosInstance = null;
  timeout: number = 10000;

  constructor(axiosImpl?: AxiosInstance, timeout = 10000) {
    this.axiosImpl = axiosImpl;
    this.timeout = timeout;
  }

  // axios uses 'params', OnmsHTTPOptions has 'parameters', so we need to copy
  // This is done in opennms-js AxiosHTTP and GrafanaHTTP, but there were some issues
  // getting those to work, so this is a simple wrapper
  fixOptions(options?: API.OnmsHTTPOptions) {
    if (options) {
      return {
        ...options,
        params: options.parameters
      }
    }

    return options;
  }

  /**
   * Perform an HTTP GET to the provided URL.
   * @param url The URL to connect to.
   * @param options The [[OnmsHTTPOptions]] options to use when connecting.
   * @returns An [[OnmsResult]] result object.
   */
  get(url: string, options?: API.OnmsHTTPOptions): Promise<API.OnmsResult<any>> {
    const opts = this.fixOptions(options);

    return this.axiosImpl.get(url, opts);
  }

  /**
   * Perform an HTTP HEAD to the provided URL.
   * @param url The URL to connect to.
   * @param options The [[OnmsHTTPOptions]] options to use when connecting.
   * @returns An [[OnmsResult]] result object.
   */
  head(url: string, options?: API.OnmsHTTPOptions): Promise<API.OnmsResult<any>> {
    const opts = this.fixOptions(options);

    return this.axiosImpl.head(url, opts);
  }

  /**
   * Perform an HTTP PUT to the provided URL.
   * @param url The URL to connect to.
   * @param options The [[OnmsHTTPOptions]] options to use when connecting.
   * @returns An [[OnmsResult]] result object.
   */
  put(url: string, options?: API.OnmsHTTPOptions): Promise<API.OnmsResult<any>> {
    const opts = this.fixOptions(options);

    return this.axiosImpl.put(url, opts);
  }

  /**
   * Perform an HTTP POST to the provided URL.
   * @param url The URL to connect to.
   * @param options The [[OnmsHTTPOptions]] options to use when connecting.
   * @returns An [[OnmsResult]] result object.
   */
  post(url: string, options?: API.OnmsHTTPOptions): Promise<API.OnmsResult<any>> {
    const opts = this.fixOptions(options);

    return this.axiosImpl.post(url, opts);
  }

  /**
   * Perform an HTTP DELETE to the provided URL.
   * @param url The URL to connect to.
   * @param options The [[OnmsHTTPOptions]] options to use when connecting.
   * @returns An [[OnmsResult]] result object.
   */
  httpDelete(url: string, options?: API.OnmsHTTPOptions): Promise<API.OnmsResult<any>> {
    const opts = this.fixOptions(options);

    return this.axiosImpl.delete(url, opts);
  }
}
