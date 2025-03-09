import React from "react";
import "./Updatess.css";
const Updatess = ({updates}) => {


    // const updates = [
    //     {
    //       title: "Lorem Ipsum",
    //       content: `Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
    //       turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
    //       nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
    //       tellus elit sed risus. Maecenas eget condimentum velit, sit amet
    //       feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
    //       conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
    //       enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
    //       Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
    //       lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
    //       elementum tellus.`,
    //       date: "2 November 2024",
    //       time: "11:22:33",
    //     },
    //     {
    //       title: "Lorem Ipsum",
    //       content: `Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
    //       turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
    //       nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
    //       tellus elit sed risus. Maecenas eget condimentum velit, sit amet
    //       feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
    //       conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
    //       enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
    //       Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
    //       lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
    //       elementum tellus.`,
    //       date: "2 November 2024",
    //       time: "11:22:33",
    //     },
    //     {
    //       title: "Lorem Ipsum",
    //       content: `Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
    //       turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
    //       nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
    //       tellus elit sed risus. Maecenas eget condimentum velit, sit amet
    //       feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
    //       conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
    //       enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
    //       Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
    //       lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
    //       elementum tellus.`,
    //       date: "2 November 2024",
    //       time: "11:22:33",
    //     },
    //     {
    //         title: "Lorem Ipsum",
    //         content: `Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
    //         turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
    //         nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
    //         tellus elit sed risus. Maecenas eget condimentum velit, sit amet
    //         feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
    //         conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
    //         enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
    //         Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
    //         lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
    //         elementum tellus.`,
    //         date: "2 November 2024",
    //         time: "11:22:33",
    //       },

    //       {
    //         title: "Lorem Ipsum",
    //         content: `Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
    //         turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
    //         nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
    //         tellus elit sed risus. Maecenas eget condimentum velit, sit amet
    //         feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
    //         conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
    //         enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
    //         Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
    //         lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
    //         elementum tellus.`,
    //         date: "2 November 2024",
    //         time: "11:22:33",
    //       },


    //   ];



console.log("sdafgd",updates);

  return (
    <div className="updates_main_div">
      <p className="updates_main_div_first_p">Updates</p>
      {updates?.map((update, index) => (
        <div className="updates_main_div_first_div" key={index}>
          <div className="updates_main_div_first_div_first">
            <p className="updates_main_div_first_div_first_Ptag">{update.title}</p>
            <p className="updates_main_div_first_div_first_Ptag1">{update.content}</p>
            <div className="updates_main_div_first_div_first_div">
              <div className="updates_main_div_first_div_first_div1">{update.date}</div>
              <div className="updates_main_div_first_div_first_div2">{update.time}</div>
            </div>
          </div>
        </div>
      ))}


    </div>
  );
};

export default Updatess;
