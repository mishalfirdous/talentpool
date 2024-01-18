import React from "react";
import Avatar from "./avatar";
import image from "./images/avatar.jpg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="avatar">
        <Avatar pictureUrl={image} size={250} />
        <h3>Mishal Firdous </h3>
      </div>
      <ul>
        <li>Wordpress</li>
        <li>Html 5</li>
        <li>Css 3</li>
        <li>JavaScript</li>
        <li>Reactjs</li>
      </ul>
    </div>
  );
};

export default Sidebar;
