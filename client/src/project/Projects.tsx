import React from "react";
import ProjectEntry from "./ProjectEntry";
import ProjectInterface from "./ProjectInterface";

// Update this iterative
function Projects() {
  const sampleProjects: ProjectInterface[] = [
    {
      id: 1,
      name: "Team Together",
      description: "프로젝트 서비스",
      post: "하였으며, 그들은 듣기만 청춘에서만 동산에는 만천하의 가장 부패뿐이다. 더운지라 영원히 보배를 이는 이것이다. 얼음과 얼마나 때에, 충분히 같은 놀이 할지니, 봄바람이다. 그들은 하였으며, 이상 든 그들은 방지하는 그것을 아름다우냐?",
      status: "모집 중",
      dueDate: new Date("2022-12-06"),
      intake: 4,
      leader: 1,
      members: [2, 3, 4],
      applicants: [5, 6],
      tags: ["태그 1", "태그 2", "태그 3"]
    },
    {
      id: 2,
      name: "Book Dinosaur",
      description: "서평 공유 서비스",
      post: "공룡 책 버스로부터 영감을 얻은 이 프로젝트는...",
      status: "모집 중",
      dueDate: new Date("2022-12-14"),
      intake: 4,
      leader: 5,
      members: [1, 2],
      applicants: [3, 6, 7, 8, 9, 10],
      tags: ["태그 1", "태그 2", "태그 6", "태그 7"]
    }
  ]
  
  const projects = sampleProjects

  return (
    <div>
      {projects.map((project, index) => (
        <ProjectEntry data={project} key={index} />
      ))}
    </div>
  )
}

export default Projects
