import { useQuery } from '@tanstack/react-query'
import './App.css'
import { client } from './shared/api/client'

function App() {

  return (
    <div>
      <h2>hello it-incubator!!!</h2>
      <Playlists />
    </div>
  )
}

export default App


const Playlists = () => {
  const query = useQuery({
    queryKey: ["playlists"],
    queryFn: () => {
      return client.GET("/playlists")
    },
  })

  return (
    <div>
      <ul>
        {query.data?.data?.data.map((playlist) => (
          <li>{playlist.attributes.title}</li>
        ))}
      </ul>
    </div>
  )
}