import { useState } from "react";
import { useCookies } from "react-cookie";
import { postNewTask, editUserTask, headerJSON } from "../helpers";


const Modal = ({ mode, setShowModal, getDataAndSetState, task }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  //falsey from ListHeader, truthy from ListItems
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });



//  HANDLERS : 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleClickPost = (e) => {
    e.preventDefault();
    postNewTask({
      method: "POST",
      headers: headerJSON,
      body: JSON.stringify(data),
    });
    setShowModal(false);
    getDataAndSetState();
  };

  const handlePutTask = (e) => {
    e.preventDefault();
    editUserTask(task.id, {
      method: "PUT",
      headers: headerJSON,
      body: JSON.stringify(data),
    });
    setShowModal(false);
    getDataAndSetState()
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3> Let's {mode} you task </h3>
          <button className="" onClick={() => setShowModal(false)}>
            X
          </button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder="write your task here"
            name="title"
            value={data.title || ''}
            onChange={handleChange}
          />

          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress || ''}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? handlePutTask : handleClickPost}
            value='submit'
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;

// const postData = (e)=>{
//   e.preventDefault();

//   try{
//    const response = fetch('http://localhost:8000/todos', {
//       method: 'POST',
//       headers: { 'Content-Type' : 'application/json' },
//       body: data ? JSON.stringify(data) : console.error()
//     })
//     console.log(response)
//   }catch(err){
//     console.error(err)
//   }
// };
