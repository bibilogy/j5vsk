import React from "react";

const Social: React.FC<{ size?: number }> = ({
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
    <circle fill="#90DFAA" cx="253" cy="253" r="253" />
    <path
      fill="#2B3B4E"
      d="M290.2,252.6h-19.3c0-11.1-8-20.1-17.9-20.1s-17.9,9-17.9,20.1h-19.3c0-21.7,16.7-39.4,37.2-39.4
        C273.5,213.1,290.2,230.8,290.2,252.6z"
    />
    <circle fill="#324A5E" cx="155.6" cy="253" r="79.9" />
    <path
      fill="#84DBFF"
      d="M155.6,313.1c-33.1,0-60.1-27-60.1-60.1s27-60.1,60.1-60.1s60.1,27,60.1,60.1
        S188.8,313.1,155.6,313.1z"
    />
    <circle fill="#324A5E" cx="350.4" cy="253" r="79.9" />
    <path
      fill="#84DBFF"
      d="M350.4,313.1c-33.1,0-60.1-27-60.1-60.1s27-60.1,60.1-60.1s60.1,27,60.1,60.1
        S383.5,313.1,350.4,313.1z"
    />
    <g>
      <path
        fill="#2B3B4E"
        d="M78.6,262.9H53.8c-1.4,0-2.5-1.1-2.5-2.5v-14.8c0-1.4,1.1-2.5,2.5-2.5h24.8V262.9z"
      />
      <path
        fill="#2B3B4E"
        d="M427.4,243.1h24.8c1.4,0,2.5,1.1,2.5,2.5v14.8c0,1.4-1.1,2.5-2.5,2.5h-24.8V243.1z"
      />
    </g>
  </svg>
);

export default Social;
