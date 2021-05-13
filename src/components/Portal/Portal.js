import ReactDOM from "react-dom";

//  createPortal
// 첫번째 인자 -> 렌더링할 React child ,
// 두번째 인자 -> 랜더링될 위치
const Portal = ({ children, id }) => {
  return ReactDOM.createPortal(children, document.getElementById(id));
};

export default Portal;
