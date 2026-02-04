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
            body {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f4f6f8;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
 
/* Layout */
.wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
 
.left {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
}
 
/* Card (same as Tailwind max-w-md + p-8) */
.card {
  width: 100%;
  max-width: 448px;
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}
 
/* Icon */
.icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
 
/* Title */
.title {
  font-size: 30px;
  font-weight: 600;
  color: #0f172a;
  text-align: center;
  margin-bottom: 0;
}
 
/* Subtitle */
.sub {
  margin-top: 12px;
  font-size: 14px;
  color: #64748b;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 32px;
}
 
/* Kinde widget container ONLY */
.otpbox {
  width: 100%;
}
 
/* Kinde input */
.otpbox input {
  width: 100%;
  padding: 16px;
  font-size: 20px;
  letter-spacing: 0.5em;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  text-align: center;
  color: #0f172a;
  outline: none;
  box-sizing: border-box;
}
 
.otpbox input::placeholder {
  color: #94a3b8;
}
 
.otpbox input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}
 
/* Kinde button – keep default look, just full width */
.otpbox button {
  margin-top: 24px;
  width: 100% !important;
}
`}</style>
                </head>
                <body>
                    <div className="wrapper">
                        <div className="left">
                            <div className="card">
                                <div className="icon">📧</div>
                                <div className="title">Check your Email</div>
                                <div className="sub">
                                    A verification code has been sent to your email.
                                </div>

                                <div
                                    className="otpbox"
                                    dangerouslySetInnerHTML={{ __html: widget }}
                                />
                            </div>
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