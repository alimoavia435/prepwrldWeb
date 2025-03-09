import React from 'react'
import './AboutPagecards.css'

const AboutPagecards = () => {
  return (
    <div className="cards-container">
        <div className="cardmain-container">
          <div className="text-overlay">
            <h2>Evox Protocol</h2>
            <p>
              A cutting-edge smart contract framework that powers secure,
              efficient, and transparent on-chain real estate transactions.
              Developers raise funds effortlessly, while investors enjoy
              seamless ownership of property shares on the blockchain and earn
              lucrative yields.
            </p>
            {/* <img
              style={{
                height: "55px",
                width: "51px",
                position: "absolute",
                top: "729px",
                right: "237px",
              }}
              src="/Images/AboutUs/iconcard2.svg"
              alt="Icon"
              className="icon-image"
            /> */}
          </div>
        </div>

        <div className="cardmain-container1-top">
          <div className="cardmain-container1">
            <div className="text-overlay1">
              <h2>Fractional Property Ownership</h2>
              <p>
                Revolutionise your investment strategy with fractional
                ownership, allowing you to own shares in high-value properties
                with minimal capital.
              </p>
            </div>
          </div>

          <div className="cards-row">
            <div className="cardmain-container2">
              <div className="text-overlay2">
                <h2>Automated Revenue Distribution</h2>
                <p>
                  Enjoy seamless earnings with smart contracts that
                  automatically distribute rental income and capital gains
                  directly to your wallet.
                </p>
              </div>
            </div>

            <div className="cardmain-container3">
              <div className="text-overlay3">
                <h2>Global Investment Access</h2>
                <p>
                  Break free from geographical limits and diversify your
                  portfolio by investing in lucrative properties worldwide with
                  just a few clicks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default  AboutPagecards;
