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
    className={`rounded-lg w-full p-4 text-white mt-4`}
    style={{ border: `8px solid #${color}` }}
  >
    <div className="flex flex-row items-center gap-x-2">
      <img className="w-10 rounded-full" src={avatar} />
      <h1 className="font-bold">{username}</h1>
    </div>
    <p className="mt-4">{description}</p>
    <img src={image} className="mt-2 max-h-24 rounded" />
  </div>
)

export default ProjectCard
