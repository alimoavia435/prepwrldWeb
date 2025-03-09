import React from "react";
import "./Updatess_dev.css"
import { useNavigate } from "react-router-dom";
const Updatess_dev = ({propertyid,propertyUpdates}) => {
  const navigate = useNavigate();

  console.log("mypropertyid", propertyid);
  console.log("mypropertyUpdates", propertyUpdates)

  const updates = [
    {
      title: "Lorem Ipsum",
      content: `Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
          nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
          tellus elit sed risus. Maecenas eget condimentum velit, sit amet
          feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
          enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
          Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
          lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
          elementum tellus.`,
      date: "2 November 2024",
      time: "11:22:33",
    },
    {
      title: "Lorem Ipsum",
      content: `Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
          nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
          tellus elit sed risus. Maecenas eget condimentum velit, sit amet
          feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
          enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
          Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
          lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
          elementum tellus.`,
      date: "2 November 2024",
      time: "11:22:33",
    },
    {
      title: "Lorem Ipsum",
      content: `Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
          nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
          tellus elit sed risus. Maecenas eget condimentum velit, sit amet
          feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
          enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
          Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
          lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
          elementum tellus.`,
      date: "2 November 2024",
      time: "11:22:33",
    },
    {
      title: "Lorem Ipsum",
      content: `Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
            lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
            elementum tellus.`,
      date: "2 November 2024",
      time: "11:22:33",
    },

    {
      title: "Lorem Ipsum",
      content: `Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
            lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
            elementum tellus.`,
      date: "2 November 2024",
      time: "11:22:33",
    },


  ];

  return (
    <div className="DEV_updates_main_div">

      <div className="DEV_updates_main_div_firsttt">
        <div className="DEV_updates_main_div_firsttt_1">
          <p className="DEV_updates_main_div_firsttt_1_p1">Property Updates</p>
          <p className="DEV_updates_main_div_firsttt_1_p2">View the updates you posted</p>
        </div>
        <button className="DEV_updates_main_div_firsttt_1_btn" onClick={() => navigate(`/submit-property-updates/${propertyid}`)}
          style={{ cursor: "pointer" }}   >Create Update</button>
      </div>

      {propertyUpdates && propertyUpdates.length > 0 ? (
        propertyUpdates.map((update, index) => (
          <div className="DEV_updates_main_div_first_div" key={index}>
            <div className="DEV_updates_main_div_first_div_first">
              <p className="DEV_updates_main_div_first_div_first_Ptag">{update.title}</p>
              <p className="DEV_updates_main_div_first_div_first_Ptag1">{update.description}</p>
              <div className="DEV_updates_main_div_first_div_first_div">
              <div className="DEV_updates_main_div_first_div_first_div1">
  {new Date(update.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}
</div>

                <div className="DEV_updates_main_div_first_div_first_div2">{new Date(update.createdAt).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="DEV_updates_empty_state">
          <p className="DEV_updates_main_div_first_div_first_Ptag">No Updates Available</p>
        </div>
      )}



    </div>
  );
};

export default Updatess_dev;
