import React, { useEffect } from "react";
import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner() {
  const [ScanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);
    function success(result) {
      scanner.clear();
      setScanResult(result);
    }
    function error(error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <p>Scanner</p>
      {ScanResult ? <div>Success: {ScanResult}</div> : <div id="reader"></div>}
    </div>
  );
}

export default Scanner;
