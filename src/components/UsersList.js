import { useEffect } from "react"
import { useSelector } from "react-redux"
import { addUser, fetchUsers } from "../store"
import Skeleton from "./Skeleton"
import Button from "./Button"
import { useThunk } from "../hooks/use-thunk"
import UsersListItem from "./UsersListItem"

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
  let content
  if (isLoadingUsers) {
    content = <div><Skeleton times={6} className="h-10 w-full" /></div>
  }
  else if (loadingError) {
    content = <div>Error while fetching</div>
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />
    })
  }
  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>+ Add User </Button>
        {creatingUserError && 'Error Creating User...'}
      </div>
      {content}
    </div>
  )
}