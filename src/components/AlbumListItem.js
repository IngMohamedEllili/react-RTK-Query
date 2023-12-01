import { GoTrashcan } from "react-icons/go"
import Button from "./Button"
import ExpandablePanel from "./ExpandablePanel"

export default function AlbumsListItem({ album }) {
  const header = <>
    <Button className='mr-3'>
      <GoTrashcan color="red"/>
    </Button>
    {album.title}</>
  return (
    <ExpandablePanel key={album.id} header={header}>
      List of photos in the album
    </ExpandablePanel>
  )
}