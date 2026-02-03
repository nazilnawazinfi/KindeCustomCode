"use server";
import React from "react";
import { renderToString } from "react-dom/server.browser";
import { type KindePageEvent } from "@kinde/infrastructure";
import { Root } from "../../../../root";
import { getKindeWidget, getKindeRequiredCSS } from "@kinde/infrastructure";
const CustomOtpPage: React.FC<KindePageEvent> = ({ context, request }) => {
    const widget = getKindeWidget({ context, request }); //gets OTP form widget
    const css = getKindeRequiredCSS({ context });

    const email =
        (context as any)?.user?.email ||
        (context as any)?.auth?.email ||
        (context as any)?.email ||
        (context as any)?.login_hint ||
        "";

    return (
        <Root context={context} request={request}>
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <style dangerouslySetInnerHTML={{ __html: css }} />
                    <style>{`
             body {margin: 0;font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;background: #f4f6f8; min-height: 100vh; display: flex; align-items: center; justify-content: center;}
            .wrapper{ display:flex; width:100%; justify-content:center; align-items:center }
            .left{ width:100%; display:flex; justify-content:center; align-items:center; padding:24px;box-sizing: border-box; }
            .card{ width:100%; max-width:360px;         background: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);box-sizing: border-box; }
            .logo{ width:180px; margin-bottom:20px; }
            .title {font-size: 25px;font-weight: 600;color: #0f172a; margin-bottom: 0; text-align: center; }
            .icon {font-size: 30px;font-weight: 400; margin-bottom: 0; text-align: center; }
            .sub{ margin-top: 12px; font-size:14px;color: #64748b; line-height: 1.5; text-align: center;  }
            .otpbox{ width: 100%;padding: 16px;font-size: 20px; letter-spacing: 0.5em;border-radius: 12px;       
                 border: 1px solid #cbd5e1;background: #ffffff;text-align: center;color: #0f172a;outline: none;box-sizing: border-box; }
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
                                {email ? <div className="email">:- {email}</div> : null}
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