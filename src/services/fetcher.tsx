// export const fetcher = (url: string) => fetch(url).then((r) => r.json())
import axios from 'axios'
export const fetcher = (url: string) => axios.get(url).then((res) => res.data)
