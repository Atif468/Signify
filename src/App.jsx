import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";

function App() {
  const sigCanvas = useRef({});
  const print = useRef({});
  const [isOpen, setIsOpen] = useState(true);

  const clear = () => {
    sigCanvas.current.clear();
  };

  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <style>
        {`
        @media print {
          body * {
            @apply invisible;
          }
          .print-container, .print-container * {
            @apply visible;
          }
          .print-container {
            @apply absolute top-0 left-0 w-full h-full;
          }
        }
        `}
      </style>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <a href="" target="_blank" className="mb-4">
          you can sign here
        </a>
        <Popup
          trigger={
            <button
              className="h-16 w-40 rounded-md bg-orange-500"
              onClick={toggleButton}
            >
              {isOpen ? "Close Signature Pad" : "Open Signature Pad"}
            </button>
          }
          closeOnDocumentClick={false}
          onClose={toggleButton}
        >
          {(close) => (
            <>
              <h1 className="text-2xl font-bold mb-4">You can write here👇</h1>
              <div
                ref={print}
                className="print-container border-2 border-gray-300 p-4 rounded-lg w-96 h-96"
              >
                <SignaturePad
                  ref={sigCanvas}
                  canvasProps={{
                    className: "sigCanvas h-full w-full border border-gray-400",
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
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
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
