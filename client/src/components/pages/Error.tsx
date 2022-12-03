import React from "react"
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="text-center h-100 py-4">
      <h1 className="display-1">404</h1>
      <h3>페이지를 찾을 수 없습니다.</h3>
      <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.<br />
        입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
      <Link to={"/"} className="mb-4">
        홈으로 이동
      </Link>
    </div>
  )
}

export default Error
