import React from 'react';

import GridBlockquote from './GridBlockquote';
import GridVideo from './GridVideo';
import GridReference from './GridReference';
import GridImage from './GridImage';
import ErrorMsg from './ErrorMsg';

const Grid = ({ grid, folder, children, noCrop = false, square = false }) => {
  if (!grid || grid.length === 0)
    return <ErrorMsg header={`Žádné projekty neodpovídají výběru`} />;
  return (
    <div
      className={`grid ${noCrop ? `no-crop` : ``} ${square ? `square` : ``}`}
    >
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
                  <GridReference
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    img={item.img}
                    landscape={item.landscape}
                    client={item.client}
                    position={item.position}
                    quote={item.quote}
                  />
                );
              else
                return (
                  <GridImage
                    noCrop={noCrop}
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
