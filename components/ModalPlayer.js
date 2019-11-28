import React from "react";
import Player from "@vimeo/player";
import HashLoader from "react-spinners/HashLoader";

const ModalPlayer = ({ handleClose }) => {
  const ref = React.useRef(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const vimeoPlayer = new Player(ref.current);
    vimeoPlayer.on("loaded", () => {
      setLoading(false);
      vimeoPlayer.play();
    });
  }, []);

  return (
    <div className={`modal-player`} onClick={() => handleClose()}>
      <HashLoader
        css={{ position: `absolute`, zIndex: 9 }}
        sizeUnit={"px"}
        size={70}
        color={"#ff1c2b"}
        loading={isLoading}
      />
      <div className={`modal-player__close`} onClick={() => handleClose()} />
      <div className={`modal-player__video-wrap`}>
        <div
          className={`modal-player__video-wrap__player`}
          ref={ref}
          data-vimeo-id={`366821562`}
        />
      </div>
    </div>
  );
};

export default ModalPlayer;
