import { useEffect } from "react"
import { useSelector } from "react-redux"
import { addUser, fetchUsers } from "../store"
import Skeleton from "./Skeleton"
import Button from "./Button"
import { useThunk } from "../hooks/use-thunk"

export default function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingError] = useThunk(fetchUsers)
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)

  useEffect(() => {
    doFetchUsers()
  }, [doFetchUsers])

  const handleUserAdd = () => {
    doCreateUser()
  }

  const { data } = useSelector((state) => {
    return state.users
  })

  if (isLoadingUsers) {
    return <div><Skeleton times={6} className="h-10 w-full" /></div>
  }

  if (loadingError) {
    return <div>Error while fetching</div>
  }

  const rendredUsers = data.map((user) => {
    return <div key={user.id} className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
      </div>
    </div>
  })
  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        {isCreatingUser
          ? 'Creating User...' :
          <Button onClick={handleUserAdd}>+ Add User </Button>
        }
        {creatingUserError && 'Error Creating User...'}
      </div>
      {rendredUsers}
    </div>
  )
}