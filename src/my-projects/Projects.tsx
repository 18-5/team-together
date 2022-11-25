import React from "react";
import ProjectEntry from "../project/ProjectEntry";

// Update this iterative
function Projects() {
  const projects = [1, 2, 3, 4, 5]
  return (
    <div>
      {projects.map((project, index) => (
        <ProjectEntry data={project} key={index} />
      ))}
    </div>
  )
}

export default Projects
