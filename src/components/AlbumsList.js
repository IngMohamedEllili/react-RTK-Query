import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store"
import AlbumsListItem from "./AlbumListItem"
import Button from "./Button"
import Skeleton from "./Skeleton"

export default function AlbumsList({ user }) {
  const { data, isFetching, error } = useFetchAlbumsQuery(user)
  const [addAlbum, results] = useAddAlbumMutation()
  let content
  if (isFetching) {
    content = <Skeleton times={3} className='h-3 w-full' />
  } else if (error) {
    content = <div>
      Error loading Albums...
    </div>
  } else {
    content = data.map((album) => {
      return <>
        <AlbumsListItem album={album} />
      </>
    })
  }

  const handleAddAlbum = () => {
    addAlbum(user);
  }
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">
          Albums for {user.name}
        </h3>
        <Button onClick={handleAddAlbum} loading={results.isLoading}>
          + Add Album
        </Button>
      </div>
      <div>
        {content}
      </div>
    </div>
  )
}