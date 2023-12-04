import { GoTrashcan } from "react-icons/go"
import Button from "./Button"
import ExpandablePanel from "./ExpandablePanel"
import { useRemoveAlbumMutation } from "../store"
import PhotoList from "./PhotoList"

export default function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation()
  const handleDeleteAlbum = () => {
    removeAlbum(album)
  }
  const header = <>
    <Button className='mr-3' loading={results.isLoading}>
      <GoTrashcan onClick={handleDeleteAlbum} color="red" />
    </Button>
    {results.isError && <div>Error deleting User...</div>}
    {album.title}
  </>


  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotoList album={album} />
    </ExpandablePanel>
  )
}