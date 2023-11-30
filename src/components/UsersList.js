import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../store"
import Skeleton from "./Skeleton"

export default function UsersList() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

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
  return <div>{rendredUsers}</div>
}