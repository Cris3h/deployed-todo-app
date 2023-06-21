import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getDataAndSetState }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);


  const signOut = () => {
    removeCookie('Email');
    removeCookie('AuthToken')
    window.location.reload();
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="btn-container">
        <button className="create" onClick={() => setShowModal(true)}> ADD NEW </button>
        <button className="signout" onClick={signOut}>
          Sign Out
        </button>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getDataAndSetState={getDataAndSetState}/>}
    </div>
  );
};

export default ListHeader;
