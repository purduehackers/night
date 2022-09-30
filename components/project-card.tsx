interface DiscordUser {
  username: string
  avatar: string
  description: string
  image?: string
}

const ProjectCard = ({ username, avatar, description, image }: DiscordUser) => (
  <div className="rounded-sm w-5/6 p-4 bg-amber-100 text-black mt-4">
    <div className="flex flex-row items-center gap-x-1">
      <img className="w-10 rounded-full" src={avatar} />
      <h1 className="font-bold">{username}</h1>
    </div>
    <p className="mt-4">{description}</p>
    <img src={image} className="mt-2 max-h-24 rounded" />
  </div>
)

export default ProjectCard
