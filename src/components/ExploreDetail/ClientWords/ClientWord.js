import React from "react";
import "./ClientWord.css";

function ClientWord({ userName, userProfile }) {
  return (
    <>
      <div className="overAllContainer__clintWord_ANDIMgTExt">
        <div>
          <h3 className="ClientWord__TextH">Client words</h3>
        </div>
        <div className="ClientWordContainer">
          <div className="ContainerimgAndText__ALl">
            <div>
              <img
                src={
                  userProfile ? userProfile : "/Images/Explore/ClientWord.svg"
                }
                className="ccclientimgg"
              />
            </div>
            <div className="ClientWord_TExtAndVerifiedContainer">
              <div className="TextContainer__ClientWords">
                <h4 className="JohnWilliam__TExtH">{userName}</h4>
                <h5 className="PropertyDevlpor__Text">Property Developer</h5>
                <p className="ptext_clintword_dorem">
                  Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut interdum tellus elit sed risus.
                  Maecenas eget condimentum velit, sit amet feugiat lectus.
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Praesent auctor purus luctus
                  enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus
                  ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
                  bibendum lorem. Morbi convallis convallis diam sit amet
                  lacinia. Aliquam in elementum tellus.
                </p>
              </div>
              <div className="VerfiedContainertext">
                <img src="/Images/Explore/RightLogo.svg" />
                <p className="verified__Text_P">Verified Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientWord;
