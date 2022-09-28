import { signOut } from 'next-auth/react'
import ProjectCard from './project-card'

const Grid3 = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="ml-auto mr-4 mt-2">
        <button
          className="bg-green-500 rounded-lg p-2 font-bold shadow-lg text-black"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
      <ProjectCard
        username="hewillyeah"
        avatar="https://avatars.githubusercontent.com/u/14811170?v=4"
        description="I made something. Here you can see the thing I made. It makes my life a lot easier and I think it will make yours too!"
        image="https://cdn.discordapp.com/attachments/905833672849113113/1024566997624827904/Screen_Shot_2022-09-28_at_2.23.06_AM.png"
      />
      <ProjectCard
        username="hewillyeah"
        avatar="https://avatars.githubusercontent.com/u/14811170?v=4"
        description="I made something. Here you can see the thing I made. It makes my life a lot easier and I think it will make yours too!"
        image="https://cdn.discordapp.com/attachments/905833672849113113/1024566997624827904/Screen_Shot_2022-09-28_at_2.23.06_AM.png"
      />
    </div>
  )
}

export default Grid3
