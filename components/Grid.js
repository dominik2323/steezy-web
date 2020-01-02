import React from 'react';
import posed, { PoseGroup } from 'react-pose';

import GridBlockquote from './GridBlockquote';
import GridVideo from './GridVideo';
import GridReference from './GridReference';
import GridImage from './GridImage';
import GridLottie from './GridLottie';
import ErrorMsg from './ErrorMsg';
import WithAnim from './WithAnim';

const PosedImages = posed(GridImage)({
  flip: {
    transition: {
      default: {
        type: 'spring',
        stiffness: 1,
        mass: 0.01,
      },
    },
  },
});

const Grid = ({ grid, folder, children, addClassName, disableAnim }, ref) => {
  if (!grid || grid.length === 0) {
    return <ErrorMsg header={`Žádné projekty neodpovídají výběru`} />;
  }
  const gridImgRef = React.useRef(null);
  return (
    <div className={`grid ${addClassName}`} ref={ref}>
      {grid.map((row, i) => {
        return (
          <WithAnim className='grid__row' key={i} disable={disableAnim}>
            <PoseGroup>
              {row.map((item, i) => {
                if (Object.keys(item).includes('blockquote'))
                  return (
                    <GridBlockquote
                      blockquote={item.blockquote}
                      key={item.blockquote}
                    />
                  );
                else if (Object.keys(item).includes('videoVimeoId'))
                  return (
                    <GridVideo
                      key={item.videoVimeoId}
                      videoVimeoId={item.videoVimeoId}
                    />
                  );
                else if (Object.keys(item).includes('quote'))
                  return (
                    item.active && (
                      <GridReference
                        key={item.client}
                        id={item.id}
                        name={item.name}
                        img={item.img}
                        client={item.client}
                        position={item.position}
                        quote={item.quote}
                      />
                    )
                  );
                else if (Object.keys(item).includes('lottieSrc'))
                  return (
                    <GridLottie
                      key={item.lottieSrc}
                      src={item.lottieSrc}
                      folder={folder}
                    />
                  );
                else
                  return (
                    <PosedImages
                      key={item.img}
                      img={item.img}
                      alt={item.alt}
                      name={item.name}
                      client={item.client}
                      tags={item.tags}
                      folder={folder}
                      id={item.id}
                      children={children}
                      ref={gridImgRef}
                    />
                  );
              })}
            </PoseGroup>
          </WithAnim>
        );
      })}
    </div>
  );
};

export default React.forwardRef(Grid);
