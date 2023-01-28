interface PostData {
  username: string
  avatar: string
  description: string
  image: string
  color: string
}

const ProjectCard = ({
  username,
  avatar,
  description,
  image,
  color
}: PostData) => (
  <div
    className="rounded-lg text-white flex p-4"
    style={{ border: `8px solid #${color}` }}
  >
    <div className="flex-1">
      <div className="flex flex-row items-center gap-x-2">
        <img className="w-10 rounded-full" src={avatar} />
        <h1 className="font-bold">{username}</h1>
      </div>
      <p className="mt-4">{description}</p>
    </div>
    <img src={image} className="rounded max-h-48" />
  </div>
)

export default ProjectCard
