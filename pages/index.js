import { useState, useEffect, useRef } from "react";
import MainViewer from "../components/MainViewer";
import ThumbsViewer from "../components/ThumbsViewer";
import GridViewer from "../components/GridViewer";
import styled from "styled-components";
import Head from "next/head";

const ViewerLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  height: 100vh;
  position: relative;
`;

const IndexPage = () => {
  const [pageHeight, setPageHeight] = useState(500);
  const [pageWidth, setPageWidth] = useState(1000);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const mainViewerRef = useRef(null);
  const thumbsViewerRef = useRef(null);
  const viewerLayoutRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setPageHeight(window.innerHeight);
      setPageWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <style jsx global>{`
        body {
          background: #333;
          margin: 0;
          padding: 0;
        }
      `}</style>
      <button
        style={{ position: "fixed", top: "5px", right: "5px", zIndex: 3 }}
        onClick={() => setIsGridVisible(!isGridVisible)}
      >
        {isGridVisible ? "hide" : "show"} grid
      </button>
      <ViewerLayout ref={viewerLayoutRef}>
        <GridViewer
          gridHeight={pageHeight}
          gridWidth={pageWidth}
          isVisible={isGridVisible}
          mainViewerRef={mainViewerRef}
          setIsGridVisible={setIsGridVisible}
        />
        <ThumbsViewer listHeight={pageHeight} mainViewerRef={mainViewerRef} />
        <MainViewer listHeight={pageHeight} mainViewerRef={mainViewerRef} />
      </ViewerLayout>
    </>
  );
};

export default IndexPage;
