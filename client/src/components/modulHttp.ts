
export default function Http<T>(url: string, method?: string, body?: BodyInit): Promise<T> {
  const option: RequestInit = {
    method: !method ? 'get' : method,
    body: !method || !body ? null : body
  }
    return fetch(url, option)
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error('Something went wrong!')
      }
    });
  }