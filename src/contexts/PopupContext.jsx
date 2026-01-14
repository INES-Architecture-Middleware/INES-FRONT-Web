import { createContext, useState, useEffect, useRef, useContext } from "react";

const PopupContext = createContext(null);

export const PopupProvider = ({ children }) => {
  const openTimeout = useRef(undefined)
  const [open, setOpen] = useState(false)
  const [full, setFull] = useState(false)
  const [content, setContent] = useState(null)

  useEffect(()=>{
    return () => {
      clearTimeout(openTimeout.current)
    }
  }, [])

  useEffect(()=>{
    setOpen(content != null)
    if(!content) setFull(false)
  }, [content])

  useEffect(()=>{
    clearTimeout(openTimeout.current)
    if(!open){
      openTimeout.current = setTimeout(()=>{
        setContent(null)
      }, 200)
    }
  }, [open])

  const closePopup = () => {
    setOpen(false)
  }

  const openPopup = (_content, _full) => {
    setContent(_content)
    if(_full) setFull(true)
  } 

  return (
    <PopupContext.Provider value={{ open, content, full, closePopup, openPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContext;