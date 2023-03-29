import React from "react";
const PageTitle = props => {
  return (
    <h3 className="page_title">
      <div className="page_title_inner">{props.children}</div>
    </h3>
  );
};

export default PageTitle;
