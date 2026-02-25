import { useEffect } from "react"
import { useSearchParams } from "react-router"

export const usePerfumeViewModel = () => {
    const [searchParams] = useSearchParams();
    useEffect(() => {
        console.log(searchParams.get("id"))
    }, [searchParams])

    return {}
}