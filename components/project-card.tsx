import Image from 'next/image'

interface PostData {
  username: string
  avatar: string
  description: string
  imageUrl: string
  color: string
  blurhash?: string
}

const ProjectCard = ({
  username,
  avatar,
  description,
  imageUrl,
  color,
  blurhash
}: PostData) => (
  <div
    className={`rounded-2xl w-full p-4 text-white mt-4`}
    style={{ border: `8px solid ${color}` }}
  >
    <div className="flex flex-row items-center gap-x-2">
      <img className="w-10 rounded-full" src={avatar} />
      <h1 className="font-bold">{username}</h1>
    </div>
    <p className="mt-4">{description}</p>
    <Image
      alt={`Image by ${username}`}
      src={imageUrl}
      className="mt-2 max-h-24 rounded"
      placeholder={blurhash ? 'blur' : 'empty'}
      blurDataURL={blurhash}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: 'auto', height: 'auto' }}
    />
  </div>
)

export default ProjectCard
