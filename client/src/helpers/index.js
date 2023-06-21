export const headerJSON = { 'Content-Type': 'application/json' }
export const colors = [
  'rgb(255, 214, 161)', 
  'rgb(255, 175, 163)',
  'rgb(108, 115, 148)', 
  'rgb(141, 181, 145)'
]

export const callAllTasks = async (userEmail)=>{
  try{
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
    const json = await response.json();
    return json
    
  }catch(err){
    console.error(err)
  }
}; 

export const postNewTask = async (payload)=>{
 try{
   const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, payload)
   response.status === 200 ? console.log('worked') : console.log("didn't worked")
    }catch(err){
    console.error(err)
  }
};

export const editUserTask = async (taskId, payload) =>{
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${taskId}`, payload)
    response.status === 200 ? console.log('worked') : console.log('didnt work')
  } catch (error) {
    console.error(error)
  }
};

export const deleteUserTask = async (taskId, payload) => {
  const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${taskId}`, payload)
   response.status === 200 ? alert('successfully deleted') : console.log("didn't worked")
};