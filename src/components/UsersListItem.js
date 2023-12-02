import { GoTrashcan } from "react-icons/go"
import { useThunk } from "../hooks/use-thunk"
import { deleteUser } from "../store"
import Button from "./Button"
import ExpandablePanel from "./ExpandablePanel"
import AlbumsList from "./AlbumsList"

export default function UsersListItem({ user }) {
  const [doDeleteUser, isDeletingUser, deletingUserError] = useThunk(deleteUser)

  const handleUserDelete = () => {
    doDeleteUser(user)
  }
  const header = <>
    <Button loading={isDeletingUser} onClick={handleUserDelete} className='mr-3'>
      <GoTrashcan />
    </Button>
    {deletingUserError && <div>Error deleting User...</div>}
    {user.name}
  </>
  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  )
}