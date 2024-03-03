import React from 'react';
import './index.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';



function Header(props) {
    return (
      <header style={{ backgroundColor: 'purple', margin: -20, padding: "0", border: 0 }}>
        <nav>
          <ul className="header-ul" >
            <li className="header-ul-li-sortingspeed">
              <h1 className="header-ul-li-sortingspeed-h1">Change Sorting Speed </h1>

              <input type="range" min="0" max="100" id="changeSize"
                value={props.cursorValueSpeed}
                style={{ background: 'white', cursor: 'pointer' }}
                onChange={props.handleCursorChange}
                disabled={props.sortingStatus} />
            </li>
            <li className="header-ul-li-arraysize" >
              <h1 className="header-ul-li-arraysize-h1">Change Array Size</h1>
              <input type="range" min="0" max="100" id="changeSize"
                value={props.cursorValueArraySize}
                style={{ background: 'white', cursor: 'pointer' }}
                onChange={props.handleCursorChangeArraySize}
                disabled={props.sortingStatus} />
            </li>

            <div className="header-ul-container-algo" >
              <h1 className="header-ul-li-algo-h1">Algorithm</h1>
              <li style={{}}>
                <button className="header-ul-li-selectionsort-button"
                  style={{ color: props.sortingAlgo === "SelectionSort" ? "white" : "black" }}
                  onClick={() => props.setAlgo("SelectionSort")}
                  disabled={props.sortingStatus}>SelectionSort</button>
              </li>
              <li style={{ marginRight: 'auto', paddingLeft: 10 }}>
                <button className="header-ul-li-insertionsort-button"
                  style={{ color: props.sortingAlgo === "InsertionSort" ? "white" : "black" }}
                  onClick={() => props.setAlgo("InsertionSort")}
                  disabled={props.sortingStatus}>InsertionSort</button>
              </li>
              <li className="header-ul-li-mergesort" >
                <button className="header-ul-li-mergesort-button"
                  style={{ color: props.sortingAlgo === "MergeSort" ? "white" : "black" }}
                  onClick={() => props.setAlgo("MergeSort")}
                  disabled={props.sortingStatus}>MergeSort</button>
              </li>
              <li style={{ marginRight: 'auto', paddingLeft: 10 }}>
                <button className="header-ul-li-quicksort-button"
                  style={{ color: props.sortingAlgo === "QuickSort" ? "white" : "black" }}
                  onClick={() => props.setAlgo("QuickSort")}
                  disabled={props.sortingStatus}>QuickSort</button>
              </li>
            </div>


          </ul>
        </nav>
      </header>
    );
}

export default Header;