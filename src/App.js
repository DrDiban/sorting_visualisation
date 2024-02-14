import React from "react"
import { flushSync } from "react-dom"
import Bar from "./Bar"
import BarQS from "./BarQS"
import Header from "./Header"

import { Mergesort as mergeSort } from "./Mergesort"
import { Quicksort as quickSort } from "./Quicksort"
// import {BarChart, Bar, Line} from 'recharts';

function App() {
  const min =  1
  const max = 450
 

  const [arrSize, setArrSize] = React.useState(10)
  const [arr, setArr] = React.useState(generateRandomArr(min, max, arrSize))
  const [sortingAlgo, setSortingAlgo] = React.useState("MergeSort")
  const [sortingStatus, setSortingStatus] = React.useState(false)
  const [cursorValueSpeed, setCursorValueSpeed] = React.useState(0);
  const [cursorValueArraySize, setCursorValueArraySize] = React.useState(0);



  function interpolate(value_at_0, value_at_100, x) {
    return Math.round(value_at_0 + (x / 100) * (value_at_100 - value_at_0));
}
  // For setting user algoritmn choice
  function userSortingAlgo(algorithm){
    setSortingAlgo(algorithm)
  }

  let algorithmSpeed = 600 * (100 - cursorValueSpeed)/100
  function handleCursorChange(event){
    // Update the cursorValue state when the user moves the cursor
    setCursorValueSpeed(event.target.value);
  };

  function handleCursorChangeArraySize(event){
  
    setCursorValueArraySize(event.target.value);
    setArrSize(interpolate(10, 65, event.target.value))
    setArr(generateRandomArr(min, max, arrSize))

  };


  // For setting user algoritmn choice
  function userSortingAlgo(algorithm){
    setSortingAlgo(algorithm)
  }

  function generateRandomNumber(min,max){
    let x = Math.floor((Math.random() * max) + min);
    return x
  }
 
  function generateRandomArr(min, max, size){
    const arr_gen = []
    for (let i = 0; i < size; i++) {
      arr_gen.push({"old_value":generateRandomNumber(min, max), "new_value":0, "type":"normal"})
    }
    return arr_gen
  }

 
  function resetArr(){
    setArr(generateRandomArr(min, max, arrSize))
  }

  // quickSort(generateRandomArr(min, max, size))
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  async function sortArrMergeSort(){
    setSortingStatus(true)
  
    var new_arr = new Array(arr.length);
    for (let i = 0; i <arr.length ; i++) {
      new_arr[i] = arr[i]
      }
    let animation = []
    animation = mergeSort(new_arr)
    console.log("animation")
    console.log(animation)
    
    for (let i = 0; i < animation.length; i++) {
      let revert_to_new = []
      for (let j = 0; j < animation[i].length; j++) {
        await delay(algorithmSpeed);
        console.log(i, j);
        
        flushSync(()=>{
          
          const updatedArr = [...arr]; // Create a new array based on previous state
    
          // Modify the array based on animation[i][j]
          
          console.log(animation[i][j].location);
          console.log(animation[i][j]);
          console.log(animation[i][j].new_value);
          
          console.log(animation[i][j].new_value.new_value);
          updatedArr[animation[i][j].position].old_value = animation[i][j].old_value;
          updatedArr[animation[i][j].position].new_value = animation[i][j].new_value;
          revert_to_new.push(animation[i][j].position)
          setArr(updatedArr);          
        })

          // Return the updated state
        ;
      }
      const updatedArr = [...arr]
      await delay(algorithmSpeed);
      for (let k = 0; k < revert_to_new.length; k++) {
        
        updatedArr[revert_to_new[k]].old_value = updatedArr[revert_to_new[k]].new_value 
        updatedArr[revert_to_new[k]].new_value = 0;
        

      }
      setArr(updatedArr);

    }
    setSortingStatus(false)
    
    


  }



  async function sortArrQuickSort(){
    setSortingStatus(true)
  
    var new_arr = new Array(arr.length);
    for (let i = 0; i <arr.length ; i++) {
      new_arr[i] = arr[i]
      }
    let animation = []
    animation = quickSort(new_arr)
    console.log("animation")
    console.log(animation)
    
    for (let i = 0; i < animation.length; i++) {
      let revert_to_new = []
      let cur_loc = animation[i][0].position
      let swap_j_final_pos = 0
      let swap_lo_final_pos = 0
      let swap_j_final_new_value = 0
      let swap_lo_final_new_value = 0
      for (let j = 1; j < animation[i].length; j++) {
        await delay(algorithmSpeed);
        
        flushSync(()=>{
          
          const updatedArr = [...arr]; // Create a new array based on previous state
          // Modify the array based on animation[i][j]
          if (animation[i][j].type==="i_pos_value_check"||animation[i][j].type==="j_pos_value_check" ){
            updatedArr[animation[i][j].position].old_value = animation[i][j].old_value;
            updatedArr[animation[i][j].position].new_value = animation[i][j].new_value;
            updatedArr[animation[i][j].position].type = animation[i][j].type;
            updatedArr[cur_loc].type = "start_point";

            if (animation[i][j-1].type === animation[i][j].type ){
              updatedArr[animation[i][j-1].position].type = "normal";
            }

          }
           
          else if (animation[i][j].type==="swap_position_i_j"||animation[i][j].type==="swap_position_lo_j" ){

            if (animation[i][j-1].type==="i_pos_value_check"||animation[i][j-1].type==="j_pos_value_check" ){
              updatedArr[animation[i][j-1].position].type = "normal";

            }

            if (animation[i][j].type==="swap_position_i_j"){
              updatedArr[animation[i][j].position_i].old_value = animation[i][j].old_value_i;
              updatedArr[animation[i][j].position_i].new_value = animation[i][j].new_value_i;
              updatedArr[animation[i][j].position_i].type = animation[i][j].type;

              updatedArr[animation[i][j].position_j].old_value = animation[i][j].old_value_j;
              updatedArr[animation[i][j].position_j].new_value = animation[i][j].new_value_j;
              updatedArr[animation[i][j].position_j].type = animation[i][j].type;
            }

            
            else if (animation[i][j].type==="swap_position_lo_j"){
              updatedArr[animation[i][j].position_lo].old_value = animation[i][j].old_value_lo;
              updatedArr[animation[i][j].position_lo].new_value = animation[i][j].new_value_lo;
              updatedArr[animation[i][j].position_lo].type = animation[i][j].type;

              updatedArr[animation[i][j].position_j].old_value = animation[i][j].old_value_j;
              updatedArr[animation[i][j].position_j].new_value = animation[i][j].new_value_j;
              updatedArr[animation[i][j].position_j].type = animation[i][j].type;

              swap_j_final_pos = animation[i][j].position_j
              swap_j_final_new_value = animation[i][j].new_value_j
              swap_lo_final_pos = animation[i][j].position_lo
              swap_lo_final_new_value = animation[i][j].new_value_lo
            }
          }

          if (animation[i][j-1].type==="swap_position_i_j"){
            updatedArr[animation[i][j-1].position_i].type = "normal";
            updatedArr[animation[i][j-1].position_j].type = "normal";
          }

          
          setArr(updatedArr);          
        })

          // Return the updated state
        ;
      }
      const updatedArr = [...arr]
      await delay(algorithmSpeed);
      
      updatedArr[swap_lo_final_pos].type = "normal"
      updatedArr[swap_lo_final_pos].old_value = swap_j_final_new_value
      updatedArr[swap_lo_final_pos].new_value = swap_j_final_new_value 

      updatedArr[swap_j_final_pos].type = "ordered"
      updatedArr[swap_j_final_pos].old_value = swap_lo_final_new_value 
      updatedArr[swap_j_final_pos].new_value = swap_lo_final_new_value
      
      setArr(updatedArr);

    }
      const updatedArr = [...arr]
      for (let i = 0; i < updatedArr.length; i++) {
        updatedArr[i].type = "normal"
        updatedArr[i].new_value = 0
      }
      setSortingStatus(false)

  }

  const bar = arr.map(height => {
    return <Bar 
    old_value={height.old_value}
    new_value={height.new_value}
    
    />})

  
  const barQS = arr.map(height => {
      return <BarQS 
      old_value={height.old_value}
      new_value={height.new_value}
      type = {height.type}
      
      />})
    

  return (
    <div className="App">
      
      
      <div style={{margin: 0, padding:0 }}>
      <Header setAlgo={userSortingAlgo} sortingAlgo = {sortingAlgo} sortingStatus={sortingStatus} 
      handleCursorChange = {handleCursorChange} cursorValueSpeed = {cursorValueSpeed}
      handleCursorChangeArraySize = {handleCursorChangeArraySize} cursorValueArraySize = {cursorValueArraySize}/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: '500px', position: 'relative' }}>
      
      <h1 >
      {sortingAlgo === "MergeSort" ?  bar : barQS}
       </h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {!sortingStatus &&
      <div style={{  display: 'flex', gap: '10px' }}>
        <button className="app-button-reset" onClick = {resetArr}>Reset</button>
        <button className="app-button-sort" onClick={sortingAlgo === "MergeSort" ? () => sortArrMergeSort():() => sortArrQuickSort()}>Sort</button>
        </div>
      }

    {sortingStatus &&
      <>
      <h1>Sorting In Progress</h1>
        </>
      } 
        </div>
        </div>

    </div>
  );
}

export default App;
