// Custom Hook

import { useState, useEffect } from "react"

export function useGetCatImage({ fact }){

    const [imageUrl, setImageUrl] = useState()

    // UseEffect para recuperar la imagen
    useEffect( () => {

        if (!fact) return

        const firstWordFact = fact.split(' ')[0]

        fetch(`https://cataas.com/cat/says/${firstWordFact}`)
        .then( (response) => {
            const { url } = response
            setImageUrl(url)
        })

    }, [fact])

    return { imageUrl } 
}
