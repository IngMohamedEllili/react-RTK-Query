import { GoTrashcan } from "react-icons/go"
import { useThunk } from "../hooks/use-thunk"
import { deleteUser } from "../store"
import Button from "./Button"

export default function UsersListItem({ user }) {
  const [doDeleteUser, isDeletingUser, deletingUserError] = useThunk(deleteUser)

  const handleUserDelete = () => {
    doDeleteUser(user)
  }
  return <div className="mb-2 border rounded">
    <div className="flex p-2 justify-between items-center cursor-pointer">
      <div className="flex flex-row items-center justify">
        <Button loading={isDeletingUser} onClick={handleUserDelete} className='mr-3'>
          <GoTrashcan />
        </Button>
        {deletingUserError && <div>Error deleting User...</div>}
        {user.name}
      </div>
    </div>
  </div>
}