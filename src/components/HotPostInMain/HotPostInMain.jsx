/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React, { useEffect, useState } from "react";
import { instance } from "src/apis/axios";
import "./style.css";
import ProfileDogCircle from "src/assets/ProfileDogCircle.svg";
import ProfileRabbitCircle from "src/assets/ProfileRabbitCircle.svg";
import ProfileBearCircle from "src/assets/ProfileBearCircle.svg";
import ProfileFoxCircle from "src/assets/ProfileFoxCircle.svg";
import ProfileCatCircle from "src/assets/ProfileCatCircle.svg";
import ProfileKoalaCircle from "src/assets/ProfileKoalaCircle.svg";
import ProfileLionCircle from "src/assets/ProfileLionCircle.svg";
import { useNavigate } from "react-router-dom";

export const HotPostInMain = ({ className }) => {
  const [topPosts, setTopPosts] = useState([]);
  const navigate = useNavigate();

  const profiles = [
    ProfileDogCircle,
    ProfileRabbitCircle,
    ProfileBearCircle,
    ProfileFoxCircle,
    ProfileCatCircle,
    ProfileKoalaCircle,
    ProfileLionCircle,
  ];

  useEffect(() => {
    instance
      .get("/api/community/hot/top", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setTopPosts(response.data.data); 
        console.log(response.data.data);  // 모든 데이터를 콘솔에 출력
        {/*fetchTopPosts();*/}
      })
      .catch((error) => {
        console.error("Failed to fetch top posts:", error.response?.data || error.message);
      });
  }, []); // 빈 배열을 의존성으로 설정하여 컴포넌트가 처음 렌더링될 때만 호출되도록 합니다.

  
  return (
    <div className={`hot-post-in-main ${className}`}>
      {topPosts.map((post, index) => (
        <div key={index} className="hot-post-item" onClick={()=>{navigate("/post-details/hot/" + post.post_id)}}>
          <img src={post.image_url} alt={post.title} className="location-image" />
          <div className="text-container">
            <div className="text-wrapper">{post.title}</div>
            <div className="location">
              <img className="location-2" alt="Location" src="https://c.animaapp.com/N1lyDyYc/img/location-1@2x.png" />
              <div className="text-wrapper-2">{post.place}</div>
            </div>
            <div className="bottom-row">
              <div className="writer">
               <img className="user-avatar" alt={post.user.nickname} src={profiles[post.user.image]} />
              <div className="text-wrapper-2">{post.user.nickname}</div>
            </div>
              <div className="post-like">
                <img className="vector" alt="Like icon" src="https://c.animaapp.com/N1lyDyYc/img/vector-1@2x.png" />
                <div className="text-wrapper-3">{post.like}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
  
};
