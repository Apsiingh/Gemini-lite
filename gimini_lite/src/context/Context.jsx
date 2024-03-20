import React, { createContext, useState } from "react";
import runChat from "../Config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentprompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");


  const delayPara = (index,nextWord)=>{
     setTimeout(function(){
       setResultData(prev=>prev+nextWord)
     },75*index)
  }


  const onSent = async (prompt) => {

    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response;
    if(prompt !== undefined){
       response = await runChat(prompt);
       setRecentprompt(prompt);
    }else{
      setPrevPrompt(prev=>[...prev,input])
      setRecentprompt(input)
      response = await runChat(input)
    }
    let responseArr = response.split("**")
    let newResponse="" ;
    for(let i=0 ;i<responseArr.length;i++){
      if(i==0 || i%2 !== 1){
        newResponse += responseArr[i];
      }else{
        newResponse += "<b>"+responseArr[i]+"</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>")

    // typing Effect

    let newResponseArray = newResponse2.split(" ");
    for(let i=0;i<newResponseArray.length;i++){
        const nextWord = newResponseArray[i];
        delayPara(i,nextWord+" ");
    }
    setLoading(false)
    setInput("")
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentprompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
