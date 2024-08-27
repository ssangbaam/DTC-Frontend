import React, { useEffect, useState } from "react";
import "./style.css";
import { Footer } from "src/components/Footer";
import { instance } from "src/apis/axios";
import ProfileDog from "src/assets/ProfileDog.svg";
import ProfileRabbit from "src/assets/ProfileRabbit.svg";
import ProfileBear from "src/assets/ProfileBear.svg";
import ProfileFox from "src/assets/ProfileFox.svg";
import ProfileCat from "src/assets/ProfileCat.svg";
import ProfileKoala from "src/assets/ProfileKoala.svg";
import ProfileLion from "src/assets/ProfileLion.svg";
import { useNavigate } from "react-router-dom";

export const Mypage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get("/api/mypage", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setUser(response.data.data);
      })
      .catch((error) => {
        console.error("Error exchanging code:", error);
      });
  }, []);

  const profileImages = {
    1: ProfileDog,
    2: ProfileRabbit,
    3: ProfileBear,
    4: ProfileFox,
    5: ProfileCat,
    6: ProfileKoala,
    7: ProfileLion,
  };
  const profileImage = profileImages[user.image];

  const profileGenders = {
    false: "여성",
    true: "남성",
  };
  const profileGender = profileGenders[user.gender] || "성별 정보 없음";

  return (
    <div className="mypage">
      <div className="overlap">
        <img
          className="my-page-rectangle"
          alt="My page background"
          src="https://c.animaapp.com/sccbCaCP/img/mypagerectangle@2x.png"
        />
        <img className="image" alt="User profile" src={profileImage} />
        <div className="my-page-edit-icons">
          <img
            className="my-page-edit"
            alt="Edit profile"
            src="https://c.animaapp.com/sccbCaCP/img/mypageedit@2x.png"
          />
        </div>
      </div>
      <div className="my-post-button" onClick={() => navigate('/mypost')}>
        <div className="overlap-group">
          <div className="text-wrapper">My Posts</div>
        </div>
      </div>
      <div className="my-trip-button" onClick={() => navigate('/travel-record')}>
        <div className="overlap-group">
          <div className="div">My Trips</div>
        </div>
      </div>
      <div className="scrap-button" onClick={() => navigate('/scrap-record')}>
        <div className="overlap-group">
          <div className="text-wrapper-2">Other’s Trips</div>
        </div>
      </div>
      <div className="text-wrapper-3">{user.nickname}</div>
      <p className="p">{user.age} / {profileGender} / {user.mbti}</p>
      <Footer className="footer-instance" overlapGroupClassName="design-component-instance-node" />
    </div>
  );
};