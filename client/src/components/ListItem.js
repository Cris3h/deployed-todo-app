import { useState } from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
import { deleteUserTask } from "../helpers";

const ListItem = ({ task, getDataAndSetState }) => {
  const [showModal, setShowModal] = useState(false);

  const  handleDeleteTask = async ()=>{
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: 'DELETE'
      });
      if(response.status === 200) {
        getDataAndSetState()
      }
    } catch (error) {
      console.error(error)
    }
  }

  // const handleDeleteTask = () => {
  //   try {
  //     deleteUserTask(task.id, {method: "DELETE",});
  //     getDataAndSetState();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress}/>
      </div>

      <div className="btn-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={handleDeleteTask}>
          {" "}
          DELETE{" "}
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getDataAndSetState={getDataAndSetState}
          task={task}
        />
      )}
    </li>
  );
};

export default ListItem;
