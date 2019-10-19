import React from 'react';
import Lottie from './Lottie';

const GridLottie = ({ src, folder }) => {
  const [aspect, setAspect] = React.useState(1);
  // React.useEffect(() => {
  //   console.log(setDimensions);
  // }, []);
  const handleSetDimensions = data => {
    setAspect(data);
  };
  return (
    <div
      className={`grid__row__item grid__row__item--lottie`}
      style={{ flexBasis: `${aspect * 100}%` }}
    >
      <Lottie
        src={`/static/img${folder}/${src}`}
        setDimensions={handleSetDimensions}
      />
    </div>
  );
};

export default GridLottie;
