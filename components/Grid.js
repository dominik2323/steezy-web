import { RichText } from 'prismic-dom';
import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import ErrorMsg from './ErrorMsg';
import GridBlockquote from './GridBlockquote';
import GridImage from './GridImage';
import GridLottie from './GridLottie';
import GridReference from './GridReference';
import GridVideo from './GridVideo';
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

const Grid = React.forwardRef(
  ({ grid, folder, children, addClassName, disableAnim }, ref) => {
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
                {row?.fields?.map((item, i) => {
                  if (item.image) {
                    return (
                      <PosedImages
                        key={item.image.url}
                        img={item.image.url}
                        alt={item.image.alt || ''}
                        width={item.image.dimensions.width}
                        height={item.image.dimensions.height}
                        children={children}
                        ref={gridImgRef}
                      />
                    );
                  } else if (item.blockquote) {
                    return (
                      <GridBlockquote
                        blockquote={RichText.asText(item.blockquote)}
                        key={item.blockquote}
                      />
                    );
                  } else if (item.project) {
                    return (
                      <PosedImages
                        key={item.project?._meta?.id}
                        img={item.project?.intro_image?.url}
                        alt={item.project?.intro_image?.alt || ''}
                        // TODO: make this hover effect another component
                        name={item.project.project_name}
                        client={item.project.company_name}
                        uid={item.project._meta.uid}
                        id={item.project._meta.id}
                        width={item.project.intro_image?.dimensions?.width}
                        height={item.project.intro_image?.dimensions?.height}
                        children={children}
                        ref={gridImgRef}
                      />
                    );
                  } else if (item.reference?.client) {
                    return (
                      <GridReference
                        key={i}
                        name={item.reference?.client?.name}
                        img={item.reference?.client?.photo?.url}
                        position={item.reference?.client?.position}
                        quote={item.reference?.reference_quote}
                      />
                    );
                  } else if (item.vimeo_id) {
                    return (
                      <GridVideo
                        key={item.vimeo_id}
                        videoVimeoId={item.vimeo_id}
                      />
                    );
                  } else if (item.lottie) {
                    return (
                      <GridLottie
                        key={item.lottie.lottie_name}
                        assets={item.lottie.assets}
                        src={item.lottie.json}
                      />
                    );
                  }
                })}
              </PoseGroup>
            </WithAnim>
          );
        })}
      </div>
    );
  }
);

export default Grid;

// return (
//   <WithAnim className='grid__row' key={i} disable={disableAnim}>
//     <PoseGroup>
//       {row.map((item, i) => {
//         if (Object.keys(item).includes('blockquote'))
//           return (
//             <GridBlockquote
//               blockquote={item.blockquote}
//               key={item.blockquote}
//             />
//           );
//         else if (Object.keys(item).includes('videoVimeoId'))
//           return (
//             <GridVideo
//               key={item.videoVimeoId}
//               videoVimeoId={item.videoVimeoId}
//             />
//           );
//         else if (Object.keys(item).includes('quote'))
//           return (
//             item.active && (
//               <GridReference
//                 key={item.client}
//                 id={item.id}
//                 name={item.name}
//                 img={item.img}
//                 client={item.client}
//                 position={item.position}
//                 quote={item.quote}
//               />
//             )
//           );
//         else if (Object.keys(item).includes('lottieSrc'))
//           return (
//             <GridLottie
//               key={item.lottieSrc}
//               src={item.lottieSrc}
//               folder={folder}
//             />
//           );
//         else
//           return (
//             <PosedImages
//               key={item.img}
//               img={item.img}
//               alt={item.alt || ''}
//               name={item.name}
//               client={item.client}
//               uid={item.uid}
//               id={item.id}
//               width={item?.width}
//               height={item?.height}
//               children={children}
//               ref={gridImgRef}
//             />
//           );
//       })}
//     </PoseGroup>
//   </WithAnim>
// );
