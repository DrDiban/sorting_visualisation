import React from "react"
import { flushSync } from "react-dom"
import BarMS from "./BarMS"
import BarQS from "./BarQS"
import BarSS from "./BarSS"
import BarIS from "./BarIS"
import Header from "./Header"

import { Mergesort as mergeSort } from "./Mergesort"
import { Quicksort as quickSort } from "./Quicksort"
import { Selectionsort as selectionSort } from "./Selectionsort"
import { Insertionsort as insertionSort } from "./Insertionsort"
// import {BarChart, Bar, Line} from 'recharts';

function App() {
  const min = 1
  const max = 450

  const [arrSize, setArrSize] = React.useState(10)
  const [arr, setArr] = React.useState(generateRandomArr(min, max, arrSize))
  const [sortingAlgo, setSortingAlgo] = React.useState("SelectionSort")
  const [sortingStatus, setSortingStatus] = React.useState(false)
  const [cursorValueSpeed, setCursorValueSpeed] = React.useState(0);
  const [cursorValueArraySize, setCursorValueArraySize] = React.useState(0);
  const [barWidth, setBarWidth] = React.useState(80)
  const [fontSize, setFontSize] = React.useState(35)

  function interpolate(value_at_0, value_at_100, x) {
    return Math.round(value_at_0 + (x / 100) * (value_at_100 - value_at_0));
  }
  // For setting user algoritmn choice
  function userSortingAlgo(algorithm) {
    setSortingAlgo(algorithm)
  }

  let algorithmSpeed = 600 * (100 - cursorValueSpeed) / 100
  function handleCursorChange(event) {
    // Update the cursorValue state when the user moves the cursor
    setCursorValueSpeed(event.target.value);
  };

  function handleCursorChangeArraySize(event) {

    setCursorValueArraySize(event.target.value);
    setArrSize(interpolate(10, 65, event.target.value))
    setArr(generateRandomArr(min, max, arrSize))
    // Determine bar width based on number of bars
    // Break down to smaller range, so that the transition is smoother
    if (event.target.value <= 12) {
      setBarWidth(80);
      setFontSize(35);
    }
    else if (event.target.value <= 16) {
      setBarWidth(70);
      setFontSize(32);
    }
    else if (event.target.value <= 20) {
      setBarWidth(60);
      setFontSize(30);
    }
    else if (event.target.value <= 28) {
      setBarWidth(40);
      setFontSize(18);
    }
    else if (event.target.value <= 32) {
      setBarWidth(30);
      setFontSize(0);
    }
    else if (event.target.value <= 36) {
      setBarWidth(20);
      setFontSize(0);
    }
    else if (event.target.value <= 40) {
      setBarWidth(15);
      setFontSize(0);
    }
    else if (event.target.value <= 48) {
      setBarWidth(12);
      setFontSize(0);
    }
    else {
      setBarWidth(10);
      setFontSize(0);
    }

  };


  // For setting user algoritmn choice
  function userSortingAlgo(algorithm) {
    setSortingAlgo(algorithm)
  }

  function generateRandomNumber(min, max) {
    let x = Math.floor((Math.random() * max) + min);
    return x
  }

  function generateRandomArr(min, max, size) {
    const arr_gen = []
    for (let i = 0; i < size; i++) {
      arr_gen.push({ "old_value": generateRandomNumber(min, max), "new_value": 0, "type": "normal" })
    }
    return arr_gen
  }


  function resetArr() {
    setArr(generateRandomArr(min, max, arrSize))
  }

  // quickSort(generateRandomArr(min, max, size))
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );



  // Mergesort
  async function sortArrMergeSort() {
    setSortingStatus(true)

    var new_arr = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
      new_arr[i] = arr[i]
    }
    let animation = []
    animation = mergeSort(new_arr)

    for (let i = 0; i < animation.length; i++) {
      let revert_to_new = []
      for (let j = 0; j < animation[i].length; j++) {
        await delay(algorithmSpeed);
        flushSync(() => {

          const updatedArr = [...arr]; // Create a new array based on previous state

          // Modify the array based on animation[i][j]
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

  // Quicksort
  async function sortArrQuickSort() {
    setSortingStatus(true)

    var new_arr = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
      new_arr[i] = arr[i]
    }
    let animation = []
    animation = quickSort(new_arr)

    for (let i = 0; i < animation.length; i++) {
      let revert_to_new = []
      let cur_loc = animation[i][0].position
      let swap_j_final_pos = 0
      let swap_lo_final_pos = 0
      let swap_j_final_new_value = 0
      let swap_lo_final_new_value = 0
      for (let j = 1; j < animation[i].length; j++) {
        await delay(algorithmSpeed);

        flushSync(() => {

          const updatedArr = [...arr]; // Create a new array based on previous state
          // Modify the array based on animation[i][j]
          if (animation[i][j].type === "i_pos_value_check" || animation[i][j].type === "j_pos_value_check") {
            updatedArr[animation[i][j].position].old_value = animation[i][j].old_value;
            updatedArr[animation[i][j].position].new_value = animation[i][j].new_value;
            updatedArr[animation[i][j].position].type = animation[i][j].type;
            updatedArr[cur_loc].type = "start_point";

            if (animation[i][j - 1].type === animation[i][j].type) {
              updatedArr[animation[i][j - 1].position].type = "normal";
            }

          }

          else if (animation[i][j].type === "swap_position_i_j" || animation[i][j].type === "swap_position_lo_j") {

            if (animation[i][j - 1].type === "i_pos_value_check" || animation[i][j - 1].type === "j_pos_value_check") {
              updatedArr[animation[i][j - 1].position].type = "normal";

            }

            if (animation[i][j].type === "swap_position_i_j") {
              updatedArr[animation[i][j].position_i].old_value = animation[i][j].old_value_i;
              updatedArr[animation[i][j].position_i].new_value = animation[i][j].new_value_i;
              updatedArr[animation[i][j].position_i].type = animation[i][j].type;

              updatedArr[animation[i][j].position_j].old_value = animation[i][j].old_value_j;
              updatedArr[animation[i][j].position_j].new_value = animation[i][j].new_value_j;
              updatedArr[animation[i][j].position_j].type = animation[i][j].type;
            }


            else if (animation[i][j].type === "swap_position_lo_j") {
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

          if (animation[i][j - 1].type === "swap_position_i_j") {
            updatedArr[animation[i][j - 1].position_i].type = "normal";
            updatedArr[animation[i][j - 1].position_j].type = "normal";
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

  // SelectionSort
  async function sortArrSelectionSort() {
    setSortingStatus(true)

    var new_arr = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
      new_arr[i] = arr[i]
    }
    let animation = []
    animation = selectionSort(new_arr)


    for (let i = 0; i < animation.length; i++) {
      let cur_best = null
      let position_i_swap = 0
      let position_j_swap = 0
      for (let j = 0; j < animation[i].length; j++) {
        await delay(algorithmSpeed);

        flushSync(() => {

          const updatedArr = [...arr]; // Create a new array based on previous state
          // Modify the array based on animation[i][j]

          if (animation[i][j].type === "value_check" || animation[i][j].type === "cur_best") {
            if (j > 0 && animation[i][j - 1].type === "value_check") {
              updatedArr[animation[i][j - 1].position].type = "normal";

            }

            if (animation[i][j].type === "cur_best") {
              if (cur_best !== null) {
                updatedArr[cur_best].type = "normal";
              }
              cur_best = animation[i][j].position
            }
            updatedArr[animation[i][j].position].type = animation[i][j].type;


          }

          else if (animation[i][j].type === "swap_position_i_j") {
            updatedArr[animation[i][j].position_i].old_value = animation[i][j].old_value_i;
            updatedArr[animation[i][j].position_i].new_value = animation[i][j].new_value_i;
            updatedArr[animation[i][j].position_i].type = animation[i][j].type;
            position_i_swap = animation[i][j].position_i


            updatedArr[animation[i][j].position_j].old_value = animation[i][j].old_value_j;
            updatedArr[animation[i][j].position_j].new_value = animation[i][j].new_value_j;
            updatedArr[animation[i][j].position_j].type = animation[i][j].type;
            position_j_swap = animation[i][j].position_j

            if (j > 0 && animation[i][j - 1].type === "value_check") {
              updatedArr[animation[i][j - 1].position].type = "normal";

            }

          }

          setArr(updatedArr);
        })

          // Return the updated state
          ;
      }
      const updatedArr = [...arr]
      await delay(algorithmSpeed);

      updatedArr[position_j_swap].type = "normal"
      updatedArr[i].type = "ordered"

      setArr(updatedArr);

    }
    const updatedArr = [...arr]
    for (let i = 0; i < updatedArr.length; i++) {
      updatedArr[i].type = "normal"
      updatedArr[i].new_value = 0
    }
    setSortingStatus(false)

  }


  // InsertionSort
  async function sortArrInsertionSort() {
    setSortingStatus(true)

    var new_arr = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
      new_arr[i] = arr[i]
    }
    let animation = []
    animation = insertionSort(new_arr)


    for (let i = 0; i < animation.length; i++) {
      let last_position_value_check = 0
      let last_position_j_swap = 0
      let last_position_j_1_swap = 0
      for (let j = 0; j < animation[i].length; j++) {
        await delay(algorithmSpeed);

        flushSync(() => {

          const updatedArr = [...arr]; // Create a new array based on previous state
          // Modify the array based on animation[i][j]

          if (j > 0) {
            if (animation[i][j - 1].type === "value_check") {
              updatedArr[animation[i][j - 1].position].type = "ordered"
            }

            else if (animation[i][j - 1].type === "swap_position_j_and_j_1") {
              updatedArr[animation[i][j - 1].position_j].type = "ordered"
              updatedArr[animation[i][j - 1].position_j - 1].type = "ordered"
            }
          }

          if (animation[i][j].type === "value_check") {
            updatedArr[animation[i][j].position].type = animation[i][j].type
            last_position_value_check = animation[i][j].position

          }

          else if (animation[i][j].type === "swap_position_j_and_j_1") {
            updatedArr[animation[i][j].position_j].old_value = animation[i][j].old_value_j;
            updatedArr[animation[i][j].position_j].new_value = animation[i][j].new_value_j;
            updatedArr[animation[i][j].position_j].type = animation[i][j].type;
            last_position_j_swap = animation[i][j].position_j

            updatedArr[animation[i][j].position_j_minus_1].old_value = animation[i][j].old_value_j_minus_1;
            updatedArr[animation[i][j].position_j_minus_1].new_value = animation[i][j].new_value_j_minus_1;
            updatedArr[animation[i][j].position_j_minus_1].type = animation[i][j].type;
            last_position_j_1_swap = animation[i][j].position_j_minus_1
          }
          setArr(updatedArr);
        })

          // Return the updated state
          ;
      }
      const updatedArr = [...arr]
      await delay(algorithmSpeed);

      updatedArr[last_position_value_check].type = "ordered"
      updatedArr[last_position_j_swap].type = "ordered"
      updatedArr[last_position_j_1_swap].type = "ordered"


      setArr(updatedArr);

    }
    const updatedArr = [...arr]
    for (let i = 0; i < updatedArr.length; i++) {
      updatedArr[i].type = "normal"
      updatedArr[i].new_value = 0
    }
    setSortingStatus(false)

  }

  const barMS = arr.map(height => {
    return <BarMS
      old_value={height.old_value}
      new_value={height.new_value}
      barWidth={barWidth}
      fontSize={fontSize}

    />
  })


  const barQS = arr.map(height => {
    return <BarQS
      old_value={height.old_value}
      new_value={height.new_value}
      type={height.type}
      barWidth={barWidth}
      fontSize={fontSize}

    />
  })

  const barSS = arr.map(height => {
    return <BarSS
      old_value={height.old_value}
      new_value={height.new_value}
      type={height.type}
      barWidth={barWidth}
      fontSize={fontSize}

    />
  })

  const barIS = arr.map(height => {
    return <BarIS
      old_value={height.old_value}
      new_value={height.new_value}
      type={height.type}
      barWidth={barWidth}
      fontSize={fontSize}

    />
  })


  return (
    <div className="App">
      <div style={{ margin: 0, padding: 0 }}>
        <Header setAlgo={userSortingAlgo} sortingAlgo={sortingAlgo} sortingStatus={sortingStatus}
          handleCursorChange={handleCursorChange} cursorValueSpeed={cursorValueSpeed}
          handleCursorChangeArraySize={handleCursorChangeArraySize} cursorValueArraySize={cursorValueArraySize} />
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: "column" }}>
          <div style={{height:'530px', flexBasis: "530px", flexGrow: 0, flexShrink: 0, display:"flex" }}>
            <h1 style={{display:"flex",alignItems: 'flex-end' }}>
              {sortingAlgo === "MergeSort" ? barMS : sortingAlgo === "QuickSort" ? barQS : sortingAlgo === "SelectionSort" ? barSS : barIS}
            </h1>
          </div>
          <div style={{ flexBasis: "200px", flexGrow: 0, flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {!sortingStatus &&
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="app-button-reset" onClick={resetArr}>Reset</button>
                  <button className="app-button-sort" onClick={sortingAlgo === "MergeSort" ? () => sortArrMergeSort() : sortingAlgo === "QuickSort" ? () => sortArrQuickSort() : sortingAlgo === "SelectionSort" ? () => sortArrSelectionSort() : () => sortArrInsertionSort()}>Sort</button>
                </div>
              }
            </div>

            {sortingStatus &&
              <>
                <h1>Sorting In Progress</h1>
              </>
            }
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
