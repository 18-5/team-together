import React from "react"
import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Stack from 'react-bootstrap/Stack';
import Projects from "../project/Projects"
import ProfileData from "./ProfileInterface";
import ReviewInterface from "./ReviewInterface";
import Profile from "./Profile";
import About from "./About";
import Review from "./Review";

const sampleProfileData: ProfileData = {
  name: "정대용",
  username: "@daeyongjeong",
  description: "간단한 자기 소개 글",
  follower: 153,
  following: 187,
  location: "서울, 대한민국",
  website: "daeyongjeong.com",
  email: "daeyong.jeong.18@gmail.com",
  github: "@daeyongjeong"
}

const sampleReviewData: ReviewInterface[] = [
  {
    rating: 3,
    username: "dgu1234",
    reviewtags: ["시간 약속을 잘 지켜요", "정리를 잘 해요", "연락을 잘 받지 않아요", "참여도가 저조해요"]
  },
  {
    rating: 5,
    username: "dgu1235",
    reviewtags: ["시간 약속을 잘 지켜요", "정리를 잘 해요"]
  },
  {
    rating: 1,
    username: "dgu1236",
    reviewtags: ["연락을 잘 받지 않아요", "참여도가 저조해요"]
  }
]

function ProfilePage() {
  // The process of loading profile of current session is required.
  const profileData = sampleProfileData

  return (
    <div>
      <Stack gap={3}>
        <Profile profileData={profileData} />
        <Button href="profile/edit" variant="outline-primary">프로필 편집</Button>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="개요">
            <About />
          </Tab>
          <Tab eventKey="profile" title="완료한 프로젝트">
            <Projects />
          </Tab>
          <Tab eventKey="contact" title="리뷰">
            <Review data={sampleReviewData} />
          </Tab>
        </Tabs>
      </Stack>
    </div >
  )
}

export default ProfilePage
