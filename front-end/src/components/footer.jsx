import React from "react";
import "styles/components.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_inner">
        <ul className="footer_info">
          <li>
            <span className="text">
              사업자 gl@naver.com
              <br />
              연락처 02-123-1234
            </span>
          </li>
          <li>
            <span className="text">혈당건강을 똑똑하게! 혈당당!</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
