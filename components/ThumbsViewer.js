import { FixedSizeList } from "react-window";
import imageData from "../data";
import { PureComponent, useState } from "react";
import useScrollVelocity from "../hooks/useScrollVelocity";
import Loader from "./Loader";

class ItemRenderer extends PureComponent {
  render() {
    const { style, index, data } = this.props;
    const { mainViewerRef, scrollVelocity, activeIndex, setActiveIndex } = data;

    return (
      <div
        style={style}
        onClick={() => {
          mainViewerRef &&
            mainViewerRef.current &&
            mainViewerRef.current.scrollToItem(index, "start");

          setActiveIndex(index);
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
              margin: "5px auto 0",
              border: `3px solid ${
                activeIndex === index ? "yellow" : "transparent"
              }`
            }}
            src={imageData[index]}
            alt=""
          />
        )}
      </div>
    );
  }
}

const ThumbsViewer = ({
  listHeight,
  mainViewerRef,
  activeIndex,
  setActiveIndex
}) => {
  const [newScrollOffset, setNewScrollOffset] = useState(0);
  const scrollVelocity = useScrollVelocity(newScrollOffset);

  function handleOnScroll({ scrollOffset }) {
    setNewScrollOffset(scrollOffset);
  }

  return (
    <FixedSizeList
      height={listHeight}
      itemCount={imageData.length}
      itemSize={0.2 * listHeight}
      style={{ background: "#555" }}
      onScroll={handleOnScroll}
      itemData={{
        mainViewerRef,
        scrollVelocity,
        activeIndex,
        setActiveIndex
      }}
    >
      {ItemRenderer}
    </FixedSizeList>
  );
};

export default ThumbsViewer;
