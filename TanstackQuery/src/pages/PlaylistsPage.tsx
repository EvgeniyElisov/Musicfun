import { useQuery } from '@tanstack/react-query'
import { client } from '../shared/api/client'

function App() {

  return (
    <>
      <h2>hello it-incubator!!!</h2>
      <Playlists />
    </>
  )
}

export default App


const Playlists = () => {
  const query = useQuery({
    queryKey: ["playlists"],
    queryFn: () => client.GET("/playlists")
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