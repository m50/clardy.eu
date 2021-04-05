declare module 'remark-slug';

declare module 'tailwindcss/colors' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }
  interface Colors {
    black: '#000';
    white: '#fff';
    [key: string]: ColorRange;
  }

  const colors: Colors;

  export default colors;
}

declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const content: string;

  export { ReactComponent };
  export default content;
}

declare module '*.module.css' {
  const styles: Record<string, string>;

  export default styles;
}
