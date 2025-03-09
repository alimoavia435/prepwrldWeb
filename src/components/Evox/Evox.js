import React, { useState, useEffect } from "react";
import "./Evox.css";
import { Description } from "@mui/icons-material";

const Evox = () => {
  const data = [
    {
      review: "Exceptional Service!",
      DescriptiveReview:
        "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
      userImage: "/Images/Evox/Profile.svg",
      userName: "Wade Warren",
      userLocation: "USA, California",
    },
    {
      review: "Efficient and Reliable",
      DescriptiveReview:
        "Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
      userImage: "/Images/Evox/Profile 2.svg",
      userName: "Emelie Thomson",
      userLocation: "USA, California",
    },
    {
      review: "Trusted Advisors",
      DescriptiveReview:
        "The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!",
      userImage: "/Images/Evox/Profile 3.svg",
      userName: "John Mans",
      userLocation: "USA, Nevada",
    },
    {
      review: "Exceptional Service!",
      DescriptiveReview:
        "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
      userImage: "/Images/Evox/Profile 2.svg",
      userName: "Wade Warren",
      userLocation: "USA, California",
    },
    {
      review: "Efficient and Reliable",
      DescriptiveReview:
        "Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
      userImage: "/Images/Evox/Profile 3.svg",
      userName: "Emelie Thomson",
      userLocation: "USA, Minnesota",
    },
    {
      review: "Trusted Advisors",
      DescriptiveReview:
        "The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!",
      userImage: "/Images/Evox/Profile.svg",
      userName: "John Mans",
      userLocation: "USA, Illinois",
    },
    {
      review: "Efficient and Reliable",
      DescriptiveReview:
        "Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
      userImage: "/Images/Evox/Profile 3.svg",
      userName: "Emelie Thomson",
      userLocation: "USA, Minnesota",
    },
    {
      review: "Trusted Advisors",
      DescriptiveReview:
        "The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!",
      userImage: "/Images/Evox/Profile.svg",
      userName: "John Mans",
      userLocation: "USA, Illinois",
    },
  ];

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [startIndex, setStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(2);

  useEffect(() => {
    const updateItemsPerPage = () => {
      let itemsInRow = 0;
      const width = window.innerWidth;
      if (width > 1440) {
        itemsInRow = Math.floor(width / 390);
        setItemsPerPage(itemsInRow);
      }
      else if (width < 1080) {
        itemsInRow = Math.floor(width/360)
        setItemsPerPage(itemsInRow);
      } 
      else if (width < 768) {
        itemsInRow = Math.floor(width/300)
        setItemsPerPage(itemsInRow);
      }
      else if (width < 330)
      {
        itemsInRow = Math.floor(width/180)
        setItemsPerPage(itemsInRow)
      }
      else{
        setItemsPerPage(3)
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);


    // Get the current items for the carousel
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

    // Calculate boundaries for disabling arrows
    const canSlideLeft = startIndex > 0;
    const canSlideRight = startIndex + itemsPerPage < data.length;

    useEffect(() => {
      if (!canSlideLeft) {
        setActiveIndex(2); // Switch to the right button when left is disabled
      }
  
      if(!canSlideRight){
        setActiveIndex(1)
      }
    }, [canSlideLeft, canSlideRight]);

  return (
    <div className="Evox-slider-container">
      <div className="top-heading-div">
        <p className="evox-heading-slider">What Our Clients Say</p>
        <p className="evox-headind-sbtext">
          Read the success stories and heartfelt testimonials from our valued
          clients. Discover why they chose Estatein for their real estate needs.
        </p>
      </div>

      <div className="Evox-slider-wrape">
        {currentItems.map((reviewCard, index) => (
          <div className="Evox-card1" key={index}>
            <div className="evox-card-top">
              <p className="evox-h">{reviewCard.review}</p>
              <p className="evox-sbtext">{reviewCard.DescriptiveReview}</p>
            </div>

            <div className="card-bottom-div">
              <img
                className="img-id"
                src={reviewCard.userImage}
                alt="profile"
              />
              <div className="profile-name-wrape">
                <p className="id-name">{reviewCard.userName}</p>
                <p className="id-place">{reviewCard.userLocation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows-container">
        <div className="arrows-wrape-evox">
          <img
            src={
              canSlideLeft
                ? "/Images/Evox/arrow icon left.svg"
                : "/Images/Evox/arrowicon left.svg"
            }
            alt="arrow"
            style={{
              background: canSlideLeft ? "#1A1A1A" : "transparent",
              border: activeIndex === 1 ? "none" : "1px solid #FBFAFA",
              opacity: canSlideLeft ? 1 : 0.8,
              cursor: canSlideLeft ? "pointer" : "not-allowed",
              borderRadius: "30px",
              padding: window.innerWidth < 600 ? "6px": "10px",
            }}
            onClick={() => {if(canSlideLeft){setActiveIndex(1); setStartIndex(startIndex - 1)} else{setActiveIndex(2)}}}
            disabled={!canSlideLeft}
          />
          <img
            src={
              canSlideRight
                ? "/Images/Evox/arrow icon right.svg"
                : "/Images/Evox/arrowicon right.svg"
            }
            alt="arrow"
            style={{
              background: canSlideRight ? "#1A1A1A" : "transparent",
              border: activeIndex === 2 ? "none":"1px solid #FBFAFA",
              opacity: canSlideRight ? 1 : 0.8,
              cursor: canSlideRight ? "pointer" : "not-allowed",
              borderRadius: "30px",
              padding: window.innerWidth < 600 ? "6px": "10px",
            }}
            onClick={() => {if(canSlideRight) {setActiveIndex(2); setStartIndex(startIndex + 1)} else(setActiveIndex(1))}}
            disabled={!canSlideRight}
          />
        </div>
      </div>
    </div>
  );
};

export default Evox;
