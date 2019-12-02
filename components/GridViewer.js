import styled from "styled-components";
import { useState, PureComponent } from "react";
import { FixedSizeGrid } from "react-window";
import imageData from "../data";
import useScrollVelocity from "../hooks/useScrollVelocity";
import Loader from "./Loader";

class Cell extends PureComponent {
  render() {
    const { columnIndex, rowIndex, style, data } = this.props;
    const {
      columnCount,
      imageData,
      mainViewerRef,
      setIsGridVisible,
      scrollVelocity
    } = data;
    const itemNumber = rowIndex * columnCount + columnIndex;

    return (
      <div
        style={style}
        onClick={() => {
          mainViewerRef &&
            mainViewerRef.current &&
            mainViewerRef.current.scrollToItem(itemNumber);

          setIsGridVisible(false);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px"
          }}
        >
          {scrollVelocity > 1 ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Loader />
            </div>
          ) : (
            <img
              style={{ width: "130px", display: "block" }}
              src={imageData[itemNumber]}
              alt=""
            />
          )}
        </div>
      </div>
    );
  }
}

const GridViewerEl = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: #555;
  transform: ${props =>
    props.isVisible ? "translateY(0%)" : "translateY(100%)"};
  transition: transform 500ms ease;
`;

const GridViewer = ({
  gridHeight,
  gridWidth,
  isVisible,
  mainViewerRef,
  setIsGridVisible
}) => {
  const [newScrollOffset, setNewScrollOffset] = useState(0);
  const scrollVelocity = useScrollVelocity(newScrollOffset);
  const itemWidth = 300;
  const columnCount = Math.round(gridWidth / itemWidth);
  const columnWidth = gridWidth / columnCount;

  return (
    <GridViewerEl isVisible={isVisible}>
      <FixedSizeGrid
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={gridHeight}
        rowCount={imageData.length / columnCount + 1}
        rowHeight={300}
        width={gridWidth}
        itemData={{
          imageData,
          columnCount,
          mainViewerRef,
          setIsGridVisible,
          scrollVelocity
        }}
        onScroll={({ scrollTop }) => setNewScrollOffset(scrollTop)}
      >
        {Cell}
      </FixedSizeGrid>
    </GridViewerEl>
  );
};

export default GridViewer;
