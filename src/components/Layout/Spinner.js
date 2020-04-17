import React from 'react';


const Spinner = () => {
  return (<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <button class="btn white circle">
      <div className="preloader-wrapper small active center">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </button>

  </div>)
}


export default Spinner;