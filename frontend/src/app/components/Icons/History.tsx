import React from "react";

const History: React.FC<{ size?: number }> = ({
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
    <circle fill="#324A5E" cx="253" cy="253" r="253" />
    <rect x="136.5" y="216.5" fill="#6F7B84" width="233" height="178.3" />
    <rect x="361.1" y="226.6" fill="#E6E9EE" width="19.7" height="163" />
    <g>
      <rect x="356.4" y="226.6" fill="#ACB3BA" width="29" height="18.3" />
      <rect x="356.4" y="371.3" fill="#ACB3BA" width="29" height="18.3" />
    </g>
    <rect x="282.5" y="226.6" fill="#E6E9EE" width="19.7" height="163" />
    <g>
      <rect x="277.8" y="226.6" fill="#ACB3BA" width="29" height="18.3" />
      <rect x="277.8" y="371.3" fill="#ACB3BA" width="29" height="18.3" />
    </g>
    <rect x="203.9" y="226.6" fill="#E6E9EE" width="19.7" height="163" />
    <g>
      <rect x="199.2" y="226.6" fill="#ACB3BA" width="29" height="18.3" />
      <rect x="199.2" y="371.3" fill="#ACB3BA" width="29" height="18.3" />
    </g>
    <rect x="125.2" y="226.6" fill="#E6E9EE" width="19.7" height="163" />
    <g>
      <rect x="120.6" y="226.6" fill="#ACB3BA" width="29" height="18.3" />
      <rect x="120.6" y="371.3" fill="#ACB3BA" width="29" height="18.3" />
    </g>
    <polygon fill="#E6E9EE" points="253,94.9 94.9,226.6 411.1,226.6 " />
    <polygon fill="#ACB3BA" points="138.6,210.8 253,115.5 367.4,210.8 " />
    <circle fill="#E6E9EE" cx="253" cy="173.2" r="27" />
    <rect x="94.9" y="389.5" fill="#2B3B4E" width="316.3" height="21.6" />
    <rect x="234.8" y="322.2" fill="#324A5E" width="40.6" height="67.4" />
  </svg>
);

export default History;
