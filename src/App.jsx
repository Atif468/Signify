import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

function App() {
  const sigCanvas = useRef({});
  const print = useRef({});

  const clear = () => {
    sigCanvas.current.clear();
  };

  return (
    <>
      <style>
        {`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }
        `}
      </style>
      <div className="flex flex-col items-center justify-center min-h-screen">
       
        <Popup
          trigger={
            <button className="h-16 w-40 rounded-md bg-orange-500">
              Open Signature Pad
            </button>
          }
          closeOnDocumentClick={false}
        >
          {(close) => (
            <>
              <h1 className="text-2xl font-bold mb-4">You can write here👇</h1>
              <div ref={print} className="print-container border-2 border-gray-300 p-4 rounded-lg w-96 h-96">
                <SignaturePad
                  ref={sigCanvas}
                  canvasProps={{
                    className: "sigCanvas h-full w-full",
                  }}
                />
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={clear}
                >
                  Clear
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={close}
                >
                  Close
                </button>
                <ReactToPrint
                  trigger={() => {
                    return (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Download
                      </button>
                    );
                  }}
                  content={() => print.current}
                />
              </div>
            </>
          )}
        </Popup>
      </div>
    </>
  );
}

export default App;
