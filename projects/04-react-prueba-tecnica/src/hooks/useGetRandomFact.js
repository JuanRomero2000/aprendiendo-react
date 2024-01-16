import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/getRandomFact'

export function useGetRandomFact () {
    
    const [fact, setFact] = useState()

    const refreshRandomFact = () => {
        getRandomFact().then( (newFact) => setFact(newFact))
    }

    // UseEffect para recuperar el fact
    useEffect(refreshRandomFact, [])

    return { fact, refreshRandomFact }
}