import ListHeader from "./components/ListHeader";
import { useEffect, useState, useCallback } from "react";
import ListItem from "./components/ListItem";
import { callAllTasks } from "./helpers";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  
  const getDataAndSetState = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    if (authToken) {
      // console.log("useEffect");
      getDataAndSetState();
    }
  }, []);
  
  //-------------------------------------------  --  ------------------------------------------------------ //
  
  // const getDataAndSetState = async () => {
    //   const data = await callAllTasks(userEmail)
    //   setTasks(data);
    //   return data;
    // };
    
    // const getDataAndSetState = useCallback(async ()=> {
      //   const data = await callAllTasks(userEmail);
      //   console.log(data)
      //   data.length?setTasks(data):setTasks(null)
      // }, [userEmail])
      
      //   useEffect(() => {
        //     if(authToken){
          //       console.log('entra')
          //       getDataAndSetState();
  //     }
  //  }, [authToken, getDataAndSetState]);
  
  
  
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  
  return (
    <div className="app">
      {!authToken && <Auth />}

      {authToken && 
        <>
          <ListHeader
            listName={"Holiday tick list"}
            getDataAndSetState={getDataAndSetState}
          />
          <p className="user-email"> Welcome back {userEmail}</p>
          { sortedTasks?.map((task) => <ListItem key={task.id} task={task} getDataAndSetState={getDataAndSetState} />) }
        </>
      }
      <p className="copyright"> © made by elfacha_dev</p>
    </div>
  );
};

export default App;
