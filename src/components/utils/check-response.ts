export const checkResponse = (res: { ok: any; json: () => any; }) => {
    if (res.ok) {
      return res.json();
    } else {
        return Promise.reject(res);
      }
  }
  