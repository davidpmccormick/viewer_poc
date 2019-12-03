import { PureComponent, useState, useRef } from "react";
import { FixedSizeList } from "react-window";
import debounce from "lodash.debounce";
import imageData from "../data";
import Loader from "./Loader";
import Router from "next/router";
import useScrollVelocity from "../hooks/useScrollVelocity";

class ItemRenderer extends PureComponent {
  getUrlForScrollVelocity = (velocity, thumbnail, index) => {
    const baseUrl = `https://dlcs.io/iiif-img/wellcome/5/b23983565_`;
    switch (velocity) {
      case 3:
        return `${thumbnail}`;
      case 2:
        return `${thumbnail}`;
      case 1:
        return `${baseUrl}${(index + 1)
          .toString()
          .padStart(4, "0")}.jp2/full/500,/0/default.jpg`;
      default:
        return `${baseUrl}${(index + 1)
          .toString()
          .padStart(4, "0")}.jp2/full/500,/0/default.jpg`;
    }
  };
  render() {
    const { style, index } = this.props;
    const { scrollVelocity, isProgrammaticScroll, imageData } = this.props.data;
    return (
      <div style={style}>
        {scrollVelocity === 3 || isProgrammaticScroll ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Loader />
          </div>
        ) : (
          <img
            style={{
              paddingTop: "10px",
              display: "block",
              height: "90%",
              width: "auto",
              margin: "0 auto"
            }}
            src={this.getUrlForScrollVelocity(
              scrollVelocity,
              imageData[index],
              index
            )}
            alt=""
          />
        )}
      </div>
    );
  }
}

const MainViewer = ({ listHeight, mainViewerRef, setActiveIndex }) => {
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);
  const [newScrollOffset, setNewScrollOffset] = useState(0);
  const scrollVelocity = useScrollVelocity(newScrollOffset);
  const debounceHandleOnItemsRendered = useRef(
    debounce(handleOnItemsRendered, 500)
  );

  function handleOnScroll({ scrollOffset, scrollUpdateWasRequested }) {
    setNewScrollOffset(scrollOffset);
    setIsProgrammaticScroll(scrollUpdateWasRequested);
  }

  function handleOnItemsRendered({ visibleStartIndex }) {
    setIsProgrammaticScroll(false);

    Router.replace(`${Router.asPath}#${visibleStartIndex}`);
  }

  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <FixedSizeList
        height={listHeight}
        itemCount={imageData.length}
        itemData={{
          scrollVelocity,
          isProgrammaticScroll,
          imageData
        }}
        itemSize={0.8 * listHeight}
        onItemsRendered={debounceHandleOnItemsRendered.current}
        onScroll={handleOnScroll}
        ref={mainViewerRef}
      >
        {ItemRenderer}
      </FixedSizeList>
    </div>
  );
};

export default MainViewer;
