import { useAddPhotoMutation, useFetchPhotosQuery } from "../store"
import Button from "./Button"
import Skeleton from "./Skeleton"
import PhotoListItem from "./photoListItem"

export default function PhotoList({ album }) {
  const { data, error, isFetching } = useFetchPhotosQuery(album)
  const [addPhoto, results] = useAddPhotoMutation()

  const handleAddPhoto = () => {
    addPhoto(album)
  }

  let content
  if (isFetching) {
    content = <Skeleton times={3} className='h-8 w-8' />
  } else if (error) {
    content = <div>
      Error while Fetching photos
    </div>
  } else {
    content = data.map((photo) => {
      return (
        <>
          <PhotoListItem key={photo.id} photo={photo} />
        </>
      )
    })
  }
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">
          Photos in {album.title}
        </h3>
        <Button onClick={handleAddPhoto} loading={results.isLoading}>
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  )
}