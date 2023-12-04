import { GoTrashcan } from "react-icons/go";
import { useRemovePhotoMutation } from "../store";

export default function PhotoListItem({ photo }) {
  const [removePhoto] = useRemovePhotoMutation()
  const handleRemovePhoto = () => {
    removePhoto(photo)
  }
  return <div className="relative cursor-pointer m-2"  onClick={handleRemovePhoto}>
    <img className="h-20 w-20" alt="random pic" src={photo.url} />
    <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
      <GoTrashcan color="green" className="text-3xl" />

    </div>
  </div>
}