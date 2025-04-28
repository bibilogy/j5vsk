import React from "react";

const Sports: React.FC<{ size?: number }> = ({
  size = 100,
}: {
  size?: number;
}) => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 506 506"
    xmlSpace="preserve"
    height={`${size}px`}
    width={`${size}px`}
    aria-hidden="true"
    focusable="false"
  >
    <circle fill="#FFD05B" cx="253" cy="253" r="253" />
    <circle fill="#FF7058" cx="263.2" cy="263.2" r="147.9" />
    <path
      fill="#FFFFFF"
      d="M263.2,381.5c-65.2,0-118.3-53.1-118.3-118.3S198,144.9,263.2,144.9S381.5,198,381.5,263.2
        S328.4,381.5,263.2,381.5z"
    />
    <path
      fill="#FF7058"
      d="M263.2,352c-48.9,0-88.7-39.8-88.7-88.7s39.8-88.7,88.7-88.7s88.7,39.8,88.7,88.7
        S312.1,352,263.2,352z"
    />
    <path
      fill="#FFFFFF"
      d="M263.2,322.4c-32.6,0-59.2-26.5-59.2-59.2s26.5-59.2,59.2-59.2s59.2,26.5,59.2,59.2
        S295.8,322.4,263.2,322.4z"
    />
    <path
      fill="#FF7058"
      d="M263.2,292.8c-16.3,0-29.6-13.3-29.6-29.6s13.3-29.6,29.6-29.6s29.6,13.3,29.6,29.6
        S279.5,292.8,263.2,292.8z"
    />
    <path
      fill="#2B3B4E"
      d="M267.6,256.9L166.1,155.5l0.4-1.6l-0.2-0.2l3.8-19.8l-39-39.1l-5.8,30.5l-30.4,5.8l39,39.1l20.1-3.8
        l0.4,0.4l1.3-0.4L257,267.5c1.4,1.4,3.3,2.2,5.3,2.2s3.9-0.8,5.3-2.2c1.4-1.4,2.2-3.3,2.2-5.3S269,258.3,267.6,256.9z"
    />
  </svg>
);

export default Sports;
