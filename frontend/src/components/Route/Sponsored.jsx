import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}>
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt=""
            style={{width: "150px", objectFit: "contain"}}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://www.vectorlogo.zone/logos/dell/dell-ar21.svg"
            alt=""
            style={{width: "150px", objectFit: "contain"}}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://www.vectorlogo.zone/logos/lg/lg-ar21.svg"
            alt=""
            style={{width: "150px", objectFit: "contain"}}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://www.vectorlogo.zone/logos/apple/apple-ar21.svg"
            alt=""
            style={{width: "150px", objectFit: "contain"}}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg"
            alt=""
            style={{width: "150px", objectFit: "contain"}}
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
