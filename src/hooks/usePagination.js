import {useMemo} from "react";

export const usePagination = (totalPage) => {
    const result = useMemo(() => {
        console.log('usePagination')
        const pagesArray = []
        for (let i = 0; i < totalPage; i++) {
            pagesArray.push(i + 1)
        }
        return pagesArray
    }, [totalPage])
    return result
}