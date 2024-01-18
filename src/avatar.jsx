// Avatar.js
import React from "react";

const Avatar = ({ pictureUrl, size }) => {
  return (
    <div className={`avatar rounded-full overflow-hidden `}>
      <img src={pictureUrl} width={size} height={size} alt="Profile" />
    </div>
  );
};

export default Avatar;
