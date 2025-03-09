import React from "react";
import "./Howitworks.css";
const WorkMethod = () => {
  return (
    <div className="WorkMethod">
      <div className="underWorkMethod">
        <p className="HowItWorks">How it works?</p>
        <p className="just4steps">
          In just 4 steps build your wealth, Block by Block with our
          crowdfunding fractional ownership platform. 
        </p>
        <div className="div2Work">
          <div className="Method1">
            <p className="feature-card-number">01</p>
            <p className="feature-card-title">Browse</p>
            <p className="feature-card-description">
              View a curated list of properties handpicked by leading experts.
            </p>
          </div>
          <div className="Method1">
            <p className="feature-card-number">02</p>
            <p className="feature-card-title">Invest</p>
            <p className="feature-card-description">
              Build your investment portfolio with Blocks of properties, from
              only AED 2,000 on our crowdfunding fractional ownership platform
            </p>
          </div>
          <div className="Method1">
            <p className="feature-card-number">03</p>
            <p className="feature-card-title">Earn</p>
            <p className="feature-card-description">
              Sit back and start earning monthly income. Also, watch your
              investment grow with capital appreciation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkMethod;
