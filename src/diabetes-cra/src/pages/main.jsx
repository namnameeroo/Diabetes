import React from "react";
import "../styles/main.css";
import Footer from "../components/footer";

const PageTitle = (props) => {
  return (
    <h3 className="page_title">
      <div className="page_title_inner">{props.children}</div>
    </h3>
  );
};
const MainContainer = () => {};

function MainPage() {
  return (
    <div id="wrap" className="wrap">
      <PageTitle>음식 입력하기</PageTitle>
      <MainContainer />
      <Footer />
    </div>
  );
}

export default MainPage;
