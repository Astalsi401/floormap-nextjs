import { defaultSvgProps } from "./basic";

export const ArrowUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...defaultSvgProps} {...props} viewBox="0 0 24 24">
    <path
      d="M5.08884 11.2945C5.26942 11.7216 5.69482 12 6.16669 12H9V19C9 19.5523 9.44772 20 10 20H14C14.5523 20 15 19.5523 15 19V12H17.8333C18.3052 12 18.7306 11.7216 18.9112 11.2945C19.0917 10.8674 18.9919 10.3759 18.6583 10.049L12.825 4.33474C12.3693 3.88842 11.6307 3.88842 11.175 4.33474L5.34174 10.049C5.00808 10.3759 4.90826 10.8674 5.08884 11.2945Z"
      fill="currentColor"
    />
  </svg>
);
export default ArrowUpIcon;
