import React, { useRef, useState } from 'react'
import '../style/countdownTimer.css'

const   CoundownTimer = () => {

  // button states
  const [start,setStart] = useState(true);
  const [pause,setPause] = useState(false);

  // input states
  const secondInputRef = useRef()
  const minuteInputRef = useRef()
  const hourInputRef = useRef()
  let countDown;

  // stop interval 
  
  
  // timer function   
  
  const handleButtons = (btn) => {
      
      function timer(){

          if(secondInputRef.current.value > 60){
            minuteInputRef.current.value++;
            secondInputRef.current.value -= 59;
          }

          if(minuteInputRef.current.value > 60){
            hourInputRef.current.value++;
            minuteInputRef.current.value -= 60;
          }

          if(secondInputRef.current.value == 0 && minuteInputRef.current.value == 0 && hourInputRef.current.value == 0) {
              secondInputRef.current.value = ""
              minuteInputRef.current.value = ""
              hourInputRef.current.value = ""
              setStart(true)
              setPause(false)
          } 
          else if(secondInputRef.current.value != 0){
              secondInputRef.current.value = `${secondInputRef.current.value<=10?"0":""}${secondInputRef.current.value-1}`
          } 
          else if(minuteInputRef.current.value != 0 && secondInputRef.current.value == 0){
              secondInputRef.current.value = 59;
              minuteInputRef.current.value = `${minuteInputRef.current.value<=10?"0":""}${minuteInputRef.current.value-1}` 
          } else if(hourInputRef.current.value != 0 && minuteInputRef.current.value == 0){
            minuteInputRef.current.value = 60;
            hourInputRef.current.value = `${hourInputRef.current.value<=10?"0":""}${hourInputRef.current.value-1}`
          }
      }

      if(btn === "start"){
        if(secondInputRef.current.value == "" && minuteInputRef.current.value == "" && secondInputRef.current.value == ""){
            return; 
        } 

        (function startInterval(){
            countDown = setInterval(() => {
                timer()
            },1000)
        })()

        setStart(false)
        setPause(true)

      } else if(btn === "pause"){
        clearInterval(countDown)
        setPause(false)
        setStart(true)

      } else {
        if(secondInputRef.current.value == "" && minuteInputRef.current.value == "" && hourInputRef.current.value == "") {
            clearInterval(countDown)
            return;
        }
        else {
            clearInterval(countDown)
            secondInputRef.current.value = ""
            minuteInputRef.current.value = ""
            hourInputRef.current.value = ""
            setStart(true)
            setPause(false)
        }
      }
  }

  const handleInputTime = (e) =>{
    if(e.target.value.length > e.target.maxLength){
        e.target.value = e.target.value.slice(0,e.target.maxLength)
    }
  }

  return (
    <div className='stopWatch' >
        <div className='countDownInputs'> 
            <div className='countdownContainer'>
                <span className='timeFields'>Hour</span>
                <input 
                    type='number' 
                    ref={hourInputRef}  
                    placeholder='00' 
                    className='input' 
                    maxLength="2"
                    onInput={handleInputTime}
                />
            </div> 
            <div className='countdownContainer'>
                <span className='timeFields'>Minute</span>
                <input 
                    type='number' 
                    ref={minuteInputRef} 
                    placeholder='00' 
                    className='input' 
                    maxLength="2"
                    onInput={handleInputTime}
                />
            </div> 
            <div className='countdownContainer'>
                <span className='timeFields'>Second</span>
                <input 
                    type='number' 
                    ref={secondInputRef} 
                    placeholder='00' 
                    className='input' 
                    maxLength="2"
                    onInput={handleInputTime}
                />
            </div> 
            <span className='colen colen1'>:</span>
            <span className='colen colen2'>:</span>
        </div>

        <div className='countDownButtons' >
            {start && <button className="button start" onClick={()=>handleButtons("start")} >
                Start
            </button>}
            {pause && <button className="button pause" onClick={()=>handleButtons("pause")}>
                Pause
            </button>}
            <button  className="button reset" onClick={()=>handleButtons("reset")}>
                Reset
            </button>
        </div>
    </div>
  )
}

export default CoundownTimer