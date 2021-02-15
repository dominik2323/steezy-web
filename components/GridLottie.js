import React from 'react';
import Lottie from './Lottie';
import axios from 'axios';

const GridLottie = ({ assets, src }) => {
  const [lottieData, setLottieData] = React.useState({
    loading: true,
    data: {},
  });

  React.useEffect(() => {
    const fetchLottie = async (src) => {
      try {
        const { data } = await axios.get(src.url);
        if (data.assets.length !== 0) {
          setLottieData({
            loading: false,
            data: {
              ...data,
              assets: assets.map(({ asset }, i) => ({
                id: `image_${i}`,
                w: data.assets[i].w,
                h: data.assets[i].h,
                u: '',
                p: asset.url,
                e: 0,
              })),
            },
          });
          return;
        }
        setLottieData({ loading: false, data: data });
      } catch (e) {
        console.log(e);
      }
    };
    fetchLottie(src);
  }, []);
  if (lottieData.loading) {
    return null;
  }
  return (
    <div
      style={{ flexBasis: `${(lottieData.data.w / lottieData.data.h) * 100}%` }}
      className={`grid__row__item grid__row__item--lottie`}
    >
      <Lottie data={lottieData.data} />
      {/* <pre style={{ color: 'white' }}>{JSON.stringify(src, null, 2)}</pre> */}
    </div>
  );
};

export default GridLottie;
