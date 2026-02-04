"use server";

import React from "react";
import { renderToString } from "react-dom/server.browser";
import { type KindePageEvent } from "@kinde/infrastructure";
import { Root } from "../../../../root";
import { getKindeWidget, getKindeRequiredCSS } from "@kinde/infrastructure";

const MfaEmailOtpPage: React.FC<KindePageEvent> = ({ context, request }) => {
    const widget = getKindeWidget({ context, request }); // MFA OTP widget
    const css = getKindeRequiredCSS({ context });

    return (
        <Root context={context} request={request}>
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    {/* Required Kinde CSS */}
                    <style dangerouslySetInnerHTML={{ __html: css }} />

                    {/* Custom styling */}
                    <style>{`
                body { margin: 0; font-family: Inter, sans-serif; background: #fff; }
                body {
                    margin: 0;
                    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont,
                    sans-serif;
                    background: #ffffff;
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
                    background: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 60px;
                    box-sizing: border-box;
                }
               
               
                /* Card */
                .card {
                    width: 100%;
                    max-width: 360px;
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
                    color: #334155;
                }
               
                /* Title */
                .title {
                    font-size: 25px;
                    font-weight: 700;
                    color: #0f172a;
                    text-align: center;
                    line-height: 1.3;
                    margin-bottom: 12px;
                }
               
                /* Subtitle */
                .sub {
                    font-size: 14px;
                    color: #6b7280;
                    text-align: center;
                    line-height: 1.6;
                    margin-bottom: 32px;
                    max-width: 360px;
                    margin-left: auto;
                    margin-right: auto;
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
                        {/* Left side */}
                        <div className="left">
                            <div className="card">
                                {/* Logo */}
                                <div className="icon">🛡️</div>

                                {/* Title */}
                                <div className="title">Enter your authenticator code</div>
                                <div className="sub">
                                    Open your authenticator app (such as Google Authenticator or
                                    Microsoft Authenticator) and enter the 6-digit code.
                                </div>

                                {/* Kinde OTP Widget */}
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
    return renderToString(<MfaEmailOtpPage {...event} />);
}
