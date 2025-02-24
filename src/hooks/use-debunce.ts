import { useState, useRef } from "react"

// export function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
//     const timeoutRef = useRef<NodeJS.Timeout>()

//     return useCallback(
//         (...args: Parameters<T>) => {
//             if (timeoutRef.current) {
//                 clearTimeout(timeoutRef.current)
//             }

//             timeoutRef.current = setTimeout(() => {
//                 callback(...args)
//             }, delay)
//         },
//         [callback, delay],
//     )
// }


export function useDebounce<T>(initialValue: T, delay: number): [T, (value: T) => void] {
    const [value, setValue] = useState<T>(initialValue)
    const timeoutRef = useRef<NodeJS.Timeout>()

    const setDebouncedValue = (newValue: T) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            setValue(newValue)
        }, delay)
    }

    return [value, setDebouncedValue]
}
