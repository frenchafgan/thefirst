export default async function http<T>(request: RequestInfo): Promise<T> {
    const response = await fetch(request)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const headers = response.headers
    const data = headers.get('Content-Type')?.includes('application/json')
        ? await response.json()
        : {}
    return data
}
