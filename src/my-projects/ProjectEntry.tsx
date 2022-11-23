import React from 'react';
import { Stack } from 'react-bootstrap';

function ProjectEntry(data) {
  const projectName = "Team Together"
  const dueDate = 1
  const description = "한 문장으로 정리한 프로젝트 정의"
  const post = "하였으며, 그들은 듣기만 청춘에서만 동산에는 만천하의 가장 부패뿐이다. 더운지라 영원히 보배를 이는 이것이다. 얼음과 얼마나 때에, 충분히 같은 놀이 할지니, 봄바람이다. 그들은 하였으며, 이상 든 그들은 방지하는 그것을 아름다우냐?"
  const recruitment = 4
  const applicants = 9
  const tags = ["태그 1", "태그 2", "태그 3"]

  return (
    <Stack gap={3} className="py-3">
      <Stack>
        <Stack direction="horizontal" gap={2}>
          <h3>{projectName}</h3>
          <div>D-{dueDate}</div>
        </Stack>
        <div>{description}</div>
      </Stack>
      <div>{post}</div>
      <Stack gap={2}>
        <Stack direction='horizontal' gap={2}>
          <div>{recruitment}명 모집</div>
          <div>{applicants}명 지원 중</div>
        </Stack>
        <Stack direction='horizontal' gap={2}>
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ProjectEntry
