import { useState, useEffect, useRef } from "react";
import MainViewer from "../components/MainViewer";
import ThumbsViewer from "../components/ThumbsViewer";
import styled from "styled-components";
import Head from "next/head";

const ViewerLayout = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 5fr;
  height: 100vh;
  position: relative;
`;

const IndexPage = () => {
  const [pageHeight, setPageHeight] = useState(500);
  const mainViewerRef = useRef(null);
  const thumbsViewerRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setPageHeight(window.innerHeight);
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
      <ViewerLayout>
        <ThumbsViewer
          listHeight={pageHeight}
          mainViewerRef={mainViewerRef}
          thumbsViewerRef={thumbsViewerRef}
        />
        <MainViewer listHeight={pageHeight} mainViewerRef={mainViewerRef} />
      </ViewerLayout>
    </>
  );
};

export default IndexPage;
