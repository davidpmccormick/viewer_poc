import { FixedSizeList } from "react-window";
import imageData from "../data";
import { PureComponent, useState } from "react";
import useScrollVelocity from "../hooks/useScrollVelocity";
import Loader from "./Loader";

class ItemRenderer extends PureComponent {
  render() {
    const { style, index, data } = this.props;
    const { mainViewerRef, scrollVelocity } = data;

    return (
      <div
        style={style}
        onClick={() => {
          mainViewerRef &&
            mainViewerRef.current &&
            mainViewerRef.current.scrollToItem(index, "start");
        }}
      >
        {scrollVelocity > 1 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Loader />
          </div>
        ) : (
          <img
            style={{
              display: "block",
              height: "95%",
              width: "auto",
              margin: "5px auto 0"
            }}
            src={imageData[index + 1]}
            alt=""
          />
        )}
      </div>
    );
  }
}

const ThumbsViewer = ({ listHeight, mainViewerRef, thumbsViewerRef }) => {
  const [newScrollOffset, setNewScrollOffset] = useState(0);
  const scrollVelocity = useScrollVelocity(newScrollOffset);

  function handleOnScroll({ scrollOffset }) {
    setNewScrollOffset(scrollOffset);
  }

  return (
    <FixedSizeList
      ref={thumbsViewerRef}
      height={listHeight}
      itemCount={imageData.length}
      itemSize={0.2 * listHeight}
      style={{ background: "#555" }}
      onScroll={handleOnScroll}
      itemData={{
        mainViewerRef,
        scrollVelocity
      }}
    >
      {ItemRenderer}
    </FixedSizeList>
  );
};

export default ThumbsViewer;
