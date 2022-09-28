import { signOut } from 'next-auth/react'
import ProjectCard from './project-card'

const Grid3 = () => {
  return (
    <div className="flex flex-col items-center mt-4">
      <ProjectCard
        username="hewillyeah"
        avatar="https://avatars.githubusercontent.com/u/14811170?v=4"
        description="I made something. Here you can see the thing I made. It makes my life a lot easier and I think it will make yours too!"
        image="https://cdn.discordapp.com/attachments/905833672849113113/1024566997624827904/Screen_Shot_2022-09-28_at_2.23.06_AM.png"
      />
      <ProjectCard
        username="plant"
        avatar="https://media.discordapp.net/attachments/905833672849113113/1024791791406436402/Screen_Shot_2022-09-28_at_5.14.10_PM.png"
        description="Made a thing. Stop by to check it out, I'm in the back"
      />
      <ProjectCard
        username="rex"
        avatar="https://media.discordapp.net/attachments/905833672849113113/1024791682589392956/Screen_Shot_2022-09-28_at_5.14.49_PM.png"
        description="I made something. Here you can see the thing I made. It makes my life a lot easier and I think it will make yours too!"
      />
    </div>
  )
}

export default Grid3
