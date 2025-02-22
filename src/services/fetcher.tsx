// export const fetcher = (url: string) => fetch(url).then((r) => r.json())
import axios from 'axios'

export const fetcher = async <T,>(url: string): Promise<T> => {
  return (await axios.get<T>(url)).data
}

export const mutltiFetcher = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}
