import { defaultSvgProps } from "./basic";

export const FirstAidIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg {...defaultSvgProps} {...props} viewBox="0 0 96 96">
    <title />
    <path
      d="M64,8H32a8,8,0,0,0-8,8V26h7V19a4,4,0,0,1,4-4H61a4,4,0,0,1,4,4v7h7V16A8,8,0,0,0,64,8Z"
      fill="#575072"
    />
    <rect height="62" rx="8" ry="8" fill="#eaeaea" width="92" x="2" y="26" />
    <path
      d="M64,8H32a8,8,0,0,0-8,8V26h7V19a4,4,0,0,1,4-4H61a4,4,0,0,1,4,4v7h7V16A8,8,0,0,0,64,8Z"
      fill="none"
      stroke="#281a3b"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4px"
    />
    <path
      d="M56,66h9a3,3,0,0,0,3-3V53a3,3,0,0,0-3-3H56V41a3,3,0,0,0-3-3H43a3,3,0,0,0-3,3v9H31a3,3,0,0,0-3,3V63a3,3,0,0,0,3,3h9v9a3,3,0,0,0,3,3H53a3,3,0,0,0,3-3Z"
      fill="#f47c6d"
    />
    <path
      d="M56,66h9a3,3,0,0,0,3-3V53a3,3,0,0,0-3-3H56V41a3,3,0,0,0-3-3H43a3,3,0,0,0-3,3v9H31a3,3,0,0,0-3,3V63a3,3,0,0,0,3,3h9v9a3,3,0,0,0,3,3H53a3,3,0,0,0,3-3Z"
      fill="none"
      stroke="#281a3b"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4px"
    />
    <path
      d="M86,26H71A15,15,0,0,1,86,41V73A15,15,0,0,1,71,88H86a8,8,0,0,0,8-8V34A8,8,0,0,0,86,26Z"
      fill="#bacece"
    />
    <rect
      height="62"
      rx="8"
      ry="8"
      fill="none"
      stroke="#281a3b"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4px"
      width="92"
      x="2"
      y="26"
    />
  </svg>
);
export default FirstAidIcon;
