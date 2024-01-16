import { useGetRandomFact } from './hooks/useGetRandomFact'
import { useGetCatImage } from './hooks/useGetCatImage'
import './App.css'

export function App() {

    const { fact, refreshRandomFact } = useGetRandomFact()
    const { imageUrl } = useGetCatImage({ fact })

    const handleClick = async () => {
        refreshRandomFact()
    }

    return (
        <main>
            <h1>App de gatos</h1>
            <button onClick={handleClick}>Get new fact</button>
            { fact && <p>{fact}</p> }
            { imageUrl && <img src={imageUrl} alt="Imagen de un gato"/> }
        </main>
    )
}