"use server";

import React from "react";
import { renderToString } from "react-dom/server.browser";
import { type KindePageEvent } from "@kinde/infrastructure";
import { Root } from "../../../../root";
import { getKindeWidget, getKindeRequiredCSS } from "@kinde/infrastructure";

const CustomOtpPage: React.FC<KindePageEvent> = ({ context, request }) => {
  const widget = getKindeWidget({ context, request }); //gets OTP form widget
  const css = getKindeRequiredCSS({ context });

  return (
    <Root context={context} request={request}>
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <style>{`
            body{ margin:0; font-family: Inter, sans-serif; }
            .wrapper{ display:flex; height:100vh; width:100%; }
            .left{ width:50%; background:#fff; display:flex; flex-direction:column;
                   justify-content:center; align-items:center; padding:60px; }
            .right{ width:50%; background:#2f3a4c; display:flex; align-items:center; justify-content:center; }
            .card{ width:100%; max-width:360px; }
            .logo{ width:180px; margin-bottom:20px; }
            .title{ font-size:26px; font-weight:700; margin-bottom:10px; }
            .sub{ font-size:14px; color:#666; margin-bottom:20px; }
            .otpbox{ margin-top:20px; }
          `}</style>
        </head>

        <body>
          <div className="wrapper">
            <div className="left">
              <div className="card">
                <img className="logo" src="/images/mercycarelogo 1.png" alt="Logo" />
                <div className="title">Enter OTP</div>
                <div className="sub">Please enter the OTP sent to your email.</div>

              
                <div className="otpbox" dangerouslySetInnerHTML={{ __html: widget }} />
              </div>
            </div>

            <div className="right">
              <img
                src="/images/shutterstock_191314136_V1.png"
                alt="Visual"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </body>
      </html>
    </Root>
  );
};

export default async function Page(event: KindePageEvent): Promise<string> {
  return renderToString(<CustomOtpPage {...event} />);
}
