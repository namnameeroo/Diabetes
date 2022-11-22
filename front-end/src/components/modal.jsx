import React from "react";
import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

const PopupStyles = styled.div`
  .overlay {
    visibility: hidden;
    opacity: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    transition: opacity 500ms;
  }
  .popup {
    margin: 70px auto;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    width: 30%;
    position: relative;
    transition: all 5s ease-in-out;
  }

  .popup h2 {
    margin-top: 0;
    color: #333;
    font-family: Tahoma, Arial, sans-serif;
  }
  .popup .close {
    position: absolute;
    top: 20px;
    right: 30px;
    transition: all 200ms;
    font-size: 30px;
    font-weight: bold;
    text-decoration: none;
    color: #333;
  }
  .popup .close:hover {
    cursor: pointer;
    color: #000;
  }
  .popup .content {
    max-height: 30%;
    overflow: auto;
  }

  @media screen and (max-width: 700px) {
    .popup {
      width: 70%;
    }
  }
`;

const CustomPopup = (props) => {
  const [show, setShow] = useState(false);

  const closeHandler = () => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <PopupStyles>
      <div
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? "1" : "0",
        }}
        className="overlay"
      >
        <div className="popup">
          <h2>{props.title}</h2>
          <span className="close" onClick={closeHandler}>
            &times;
          </span>
          <div className="content">{props.children}</div>
        </div>
      </div>
    </PopupStyles>
  );
};

// CustomPopup.propTypes = {
//   title: PropTypes.string.isRequired,
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired
// };
export default CustomPopup;

// function Modal(props) {
//   const { message } = props;
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         position: "fixed",
//         bottom: 30,
//         left: 0,
//         width: "100%",
//         height: 50,
//       }}
//     >
//       <div
//         style={{
//           width: "30%",
//           textAlign: "center",
//           borderRadius: 30,
//           background: "grey",
//           fontSize: 20,
//           color: "white",
//         }}
//       >
//         <p>{message}</p>
//       </div>
//     </div>
//   );
// }

// export default Modal;

// const PopupExample = () => (

//   <Popup content='Add users to your feed' trigger={<Button icon='add' />} />
// )

// export default PopupExample
