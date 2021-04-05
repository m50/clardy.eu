import React from 'react';
import { cl } from 'lib/helpers';
import colors from 'tailwindcss/colors';
import tw from 'tailwind-styled-components';

interface Props {
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
  children?: string;
}

const Shape = tw.svg`
  absolute top-0 left-0 right-0 bottom-0 -mx-16 -mt-48
`;

const H1 = tw.h1`
  text-white font-header text-6xl mt-6
`;

export const Title: React.FC<Props> = ({ primaryColor, secondaryColor, children, className }) => (
  <div className={cl`relative flex-grow h-full w-full ${className ?? ''}`}>
    <H1>{children}</H1>
    <Shape viewBox="0 90 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={cl`
          M32 228.5L39 222L46 228.5H253L260 222L266.5 228.5H276.5V238.5L285
          246L276.5 254V264H266.5L260 271L253 264H46L39 270.5L32 264H22.5V254L14.5
          246L22.5 238.5V228.5H32Z
        `} stroke={primaryColor ?? colors.white}
      />

      <path d="M121 353.5L39.5 271L46 264.5L121 340V353.5Z" stroke={primaryColor ?? colors.white} />
      <path d="M178 354L259.5 271.5L253 265L178 340.5V354Z" stroke={primaryColor ?? colors.white} />
      <path d="M60.5 268H238" stroke={secondaryColor ?? colors.yellow[400]} strokeWidth="3" />
      <path d="M66.5 272H232" stroke={secondaryColor ?? colors.yellow[400]} strokeWidth="3" />
      <path d="M72.5 276H226" stroke={secondaryColor ?? colors.yellow[400]} strokeWidth="3" />
      <path d={cl`
          M123.5 355L123.5 278M125.5 354L125.5 278M127.5 353L127.5
          278M129.5 352L129.5 278M131.5 351L131.5 278M133.5 350L133.5
          278M165.5 350L165.5 278M167.5 351L167.5 278M169.5 352L169.5
          278M171.5 353L171.5 278M173.5 354L173.5 278M175.5 355L175.5 278
        `} stroke={primaryColor ?? colors.white}
      />
      <path d={cl`M39 223C39 161.696 88.4725 112 149.5 112C210.527 112 260
                161.696 260 223M148.928 222.258L148.995 111.998M148.579
                222.393L227.141 144.646M148.683 222.323L244.886 167.567M148.804
                222.5L256.097 194.517M148.5 222.138L204.071 126.75M149.45
                222.349L178.248 115.871M149.513 222.393L71.0847 144.646M149.409
                222.323L53.3398 167.567M149.289 222.5L42.1294 194.517M149.592
                222.138L94.1549 126.75M148.642 222.349L119.978 115.871M39 222.5H260`}
        stroke={primaryColor ?? colors.white}
      />
    </Shape>
  </div>
);
