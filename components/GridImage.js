import React from "react";
import GridImageHover from "./GridImageHover";
import { useViewportSize } from "../hooks/useViewportSize";
import Img from "./Img";
import WithAnim from "./WithAnim";

const ProjectGridImage = (
  { img, name, client, tags, alt, folder = ``, id, disableAnim },
  ref
) => {
  const imgRef = React.useRef(null);
  const [aspect, setAspect] = React.useState(`unset`);

  const handleResize = () => {
    setAspect(
      `${(imgRef.current.naturalWidth / imgRef.current.naturalHeight) * 100}%`
    );
  };

  React.useEffect(() => {
    handleResize();
    const instance = imgRef.current;
    instance.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      instance.removeEventListener("load", handleResize);
    };
  }, []);

  const hasHover = name && client && tags && id;

  return (
    <div
      className={`
          grid__row__item 
          grid__row__item--image
          ${hasHover ? `grid__row__item--has-hover` : ``} 
          `}
      style={{ flexBasis: aspect }}
      ref={ref}
    >
      {/* <WithAnim disable={disableAnim} style={{ height: `100%` }}> */}
      {hasHover && (
        <GridImageHover
          name={name}
          client={client}
          tags={tags}
          projectId={id}
        />
      )}
      <Img
        ref={imgRef}
        id={img}
        src={`/static/img${folder}/${img}`}
        alt={alt}
      />
      {/* </WithAnim> */}
    </div>
  );
};

export default React.forwardRef(ProjectGridImage);
