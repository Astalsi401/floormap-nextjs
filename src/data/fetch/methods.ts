export class FetchMethod {
  private headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  private errorHandler = (res: Response) => {
    if ([404, 403, 401].includes(res.status)) {
      throw new Error(res.statusText);
    }
    return res.json();
  };
  public get = async <T>(url: string, headers: HeadersInit = {}) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...this.headers,
        ...headers,
      },
    }).then((res) => (res.ok ? res.json() : this.errorHandler(res)));
    return response as Promise<T>;
  };
  public post = async <T>(
    url: string,
    data: unknown,
    headers: HeadersInit = {}
  ) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...this.headers,
        ...headers,
      },
      body: JSON.stringify(data),
    }).then((res) => (res.ok ? res.json() : this.errorHandler(res)));
    return response as Promise<T>;
  };
}
