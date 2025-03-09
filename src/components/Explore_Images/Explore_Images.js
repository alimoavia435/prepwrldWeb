import React from "react";
import "./Explore_Images.css";
import { useNavigate } from "react-router-dom";
const Explore_Images = () => {
  const navigate = useNavigate();
  return (
    <div className="test">
      <div className="Explore_Images">
        <img src="/Images/ExploreImages/Mask.png" className="cvbn" alt="" />
        <div className="Explore_Images_1">
          <p className="Explore_Images_1_P1">
            We can bring to life everything you've ever envisioned and dreamed
            of – your ideals and desires are our creations.
          </p>
          <p className="Explore_Images_1_P2">
            Our purpose is to transform your wildest dreams into reality.
            Regardless of how unconventional your vision may be, we possess the
            capability to craft your dream home, fulfilling your every desire.
          </p>

          <button className="Explore_Images_1_Btn">See More</button>
          
        </div>
      </div>

<img src="/Images/ExploreImages/adam-birkett-V4uS8SqCuNM-unsplash 1.png" alt=''  className="middle_img"/>



      <div className="Explore_ImagesDiv1">
  
        <img  className="Explore_ImagesDiv1_iimg" src="/Images/ExploreImages/rottt.png" alt="" />
        <div className="Explore_ImagesDiv1_1">
          <p className="Explore_ImagesDiv1_1_p1">Features</p>
          <p  className="Explore_ImagesDiv1_1_p2">A vision for liveable, sustainable & affordable.</p>
          <p  className="Explore_ImagesDiv1_1_p3">
            A fraction of a property, making it affordable for everyone to
            invest in real estate using crypto. We take the whole property and
            split it between the investors, enabling r investments from only
            $500.
          </p>
          <button  className="Explore_ImagesDiv1_1_btn" 
          onClick={() => {
          
            window.scrollTo(0, 0);
            navigate(`/explore`);
          }}
          
          
          
         >
          Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore_Images;
