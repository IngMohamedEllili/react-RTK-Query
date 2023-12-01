import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser, fetchUsers } from "../store"
import Skeleton from "./Skeleton"
import Button from "./Button"

export default function UsersList() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleUserAdd = () => {
    dispatch(addUser())
  }

  const { data, isLoading, error } = useSelector((state) => {
    return state.users
  })

  if (isLoading) {
    return <div><Skeleton times={6} className="h-10 w-full" /></div>
  }

  if (error) {
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
        <Button onClick={handleUserAdd}>+ Add User </Button>
      </div>
      {rendredUsers}
    </div>
  )
}