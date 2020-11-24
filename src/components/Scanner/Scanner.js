import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import Sender from "../Sender/Sender";

function Barcode() {
  const [data, setData] = React.useState("Searching for ISBN...");

  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
        }}
      />
      {/* <p>{data}</p> */}
      <Sender data={data} />
    </>
  );
}

export default Barcode;
