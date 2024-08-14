import React, { useEffect, useRef, useState } from "react";
// import Chat from "./chat";
import io from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

//  socket URL format
const socket = io("http://localhost:5000");

function App() {
  const containerRef = useRef(null);

  const [userName, setUserName] = useState("");
  const [chatActive, setChatActive] = useState(false);
  const [messages , SetMessage]= useState([]);


    const [newMessages , SetNewMessage] = useState("");
    const handleSubmit=()=>{(e)=>
         e.preventDefault
    const messageData = {
        message : newMessages,
        user : userName,
        time : new Date(Date.now()).getHours() +":" +  new Date(Date.now()).getMinutes(),
    };
    // socket.emit("send-message",messageData);
    newMessages !== "" ? socket.emit("send-message",messageData) :  toast.error("message can't be empty!");
     SetNewMessage("");  
  };
  useEffect(() => {
  
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);


   useEffect(()=>{
    socket.on("recived-message",(message)=>{
      SetMessage([... messages, message ])
    })
    console.log(messages);
    
   },[messages,socket])
   
  return (
    <div className="bg-gradient-to-tr from-indigo-300 h-screen w-screen flex">
      {chatActive ? (
        <div className="rounded-md w-full md:w-[80vw] lg:w-[98vw]  h-screen  flex">
          {/* <Chat socket={socket} /> */}
          <div className=' bg-slate-100 w-3/6 h-4/5  border-b border-b-black shadow-xl  m-auto '>
        <header className=' bg-blue-900 h-16 w-6/8'>
            <div className='flex pt-4 gap-4 font-semibold pl-9 text-2xl text-slate-100 border-b-black sm::-w[10]'>
          <img src='data:image/png;base64,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' alt='Chat Logo' className='w-12 h-12 rounded-full object-cover'/>
         
             <h3> Chit-Chat-App</h3>  
            </div>
            <div>
            </div>
        </header>
        <main ref={containerRef}  className='container w-6/8 bg-white-900  text-2xl p-4  mb-4 overflow-y-auto h-96 sm:h-[60vh] lg:h-[60vh] '>
        {
  messages.map(({ user, message: msg, time }, index) => (
    <div key={index}  className={`flex rounded-md shadow-md my-5 w-fit ${user === userName ? "ml-auto" : ""}`}>
      <div className="bg-cyan-800 rounded-l-md flex justify-center items-center ">
        <h3 className="font-bold text-lg px-2 ">{user.charAt(0).toUpperCase()}</h3>
      </div>
      <div className="px-2 bg-white rounded-md flex flex-col">
      <span className="text-sm mb-0">{user}</span>
    <h3 className="font-bold flex flex-col items-center ">{msg}</h3>
    <h3 className="text-xs text-right ">{time}</h3>
      </div>
    </div>
  ))
}
 {/* <pre id='left' className=' float-start text-black font-semibold  bg-gray-200 rounded-lg p-2 clear-both'>
            left
        </pre><br/>
        <pre id='right' className='float-end text-white bg-cyan-800  rounded-lg  p-2 clear-both'>
            right
        </pre> */}
        </main>
        <footer>
           <form onSubmit={handleSubmit} className=' flex w-6/8 h-10 border-black  bg-slate-300' action='#' id='send-container'>
           <input value={newMessages} onChange={(e)=> SetNewMessage(e.target.value)} id='send-message' type='text' placeholder='write something...' className=' pl-6 text-lg w-10/12 bg-cyan-100 border-gray-950 h-10 outline-none'/>
           <button type='submit' className='w-28 text-white font-bold bg-cyan-800'>Send</button>
           </form>  
        </footer>
    </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex justify-center items-center gap-2">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="text-center px-3 py-2 outline-none rounded-md"
            placeholder="Enter your username"/>
          <button
            onClick={() => userName !== "" && setChatActive(true)}
            className="px-3 py-2 rounded-md font-bold text-white bg-green-500"
          > Start Chat
          </button>
        </div>
      )}
      <ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce/>
    </div>
  );
}
export default App;
