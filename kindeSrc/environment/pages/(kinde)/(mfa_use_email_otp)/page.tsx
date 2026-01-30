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
            .wrapper { display: flex; height: 100vh; width: 100%; }
            
            .left {
              width: 50%;
              background: #fff;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 60px;
            }

            .right {
              width: 50%;
              background: #2f3a4c;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .card {
              width: 100%;
              max-width: 380px;
            }

            .logo {
              width: 220px;
              margin-bottom: 24px;
            }

            .title {
              font-size: 28px;
              font-weight: 700;
              margin: 10px 0;
              color: #111;
            }

            .sub {
              font-size: 14px;
              color: #666;
              margin-bottom: 18px;
              line-height: 1.6;
            }

            .otpbox {
              margin-top: 16px;
            }

            /* Make Kinde widget button full width */
            .otpbox button {
              width: 100% !important;
              border-radius: 40px !important;
              padding: 12px 16px !important;
              font-size: 16px !important;
              font-weight: 600 !important;
            }

            /* Responsive */
            @media (max-width: 900px) {
              .wrapper { flex-direction: column; }
              .left, .right { width: 100%; }
              .right { height: 240px; }
            }
          `}</style>
                </head>

                <body>
                    <div className="wrapper">
                        {/* Left side */}
                        <div className="left">
                            <div className="card">
                                {/* Logo */}
                                <img
                                    className="logo"
                                    src="/assets/images/MercyLogoV2.png"
                                    alt="MercyCare Planalytics"
                                />

                                {/* Title */}
                                <div className="title">Enter OTP</div>
                                <div className="sub">
                                    Please enter the OTP sent to your email to complete MFA verification.
                                </div>

                                {/* Kinde OTP Widget */}
                                <div
                                    className="otpbox"
                                    dangerouslySetInnerHTML={{ __html: widget }}
                                />
                            </div>
                        </div>

                        {/* Right side image */}
                        <div className="right">
                            <img
                                src="/assets/images/shutterstock_191314136_V1.png"
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
    return renderToString(<MfaEmailOtpPage {...event} />);
}
