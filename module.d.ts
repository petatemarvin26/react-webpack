declare module '*.json';

declare module '*.module.css';
declare module '*.css';

declare module '*.gif';
declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';

declare module '*.svg' {
  const ReactComponent: React.ElementType<React.SVGAttributes<SVGElement>>;
  const Svg: string;
  export {ReactComponent};
  export default Svg;
}
