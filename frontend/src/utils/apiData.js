export function getPayload(response) {
  if (response?.data !== undefined) {
    return response.data;
  }
  return response;
}

export function toArray(data) {
  if (Array.isArray(data)) return data;
  if (!data) return [];
  return [data];
}
