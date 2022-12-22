declare module '*.json';

declare module '*.module.css';

declare module '*.png';

declare module '*.svg' {
  const ReactComponent: React.ElementType<React.SVGAttributes<SVGElement>>;
  const Svg: string;
  export {ReactComponent};
  export default Svg;
}
