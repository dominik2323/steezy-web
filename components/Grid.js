import React from 'react';

import GridBlockquote from './GridBlockquote';
import GridVideo from './GridVideo';
import GridReference from './GridReference';
import GridImage from './GridImage';
import GridLottie from './GridLottie';
import ErrorMsg from './ErrorMsg';

const Grid = ({ grid, folder, children, addClassName }) => {
  if (!grid || grid.length === 0) {
    return <ErrorMsg header={`Žádné projekty neodpovídají výběru`} />;
  }
  return (
    <div className={`grid ${addClassName}`}>
      {grid.map((row, i) => {
        return (
          <div className="grid__row" key={i}>
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
                      key={item.id}
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
                  <GridImage
                    key={item.img}
                    img={item.img}
                    alt={item.alt}
                    name={item.name}
                    client={item.client}
                    tags={item.tags}
                    folder={folder}
                    id={item.id}
                    children={children}
                  />
                );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
