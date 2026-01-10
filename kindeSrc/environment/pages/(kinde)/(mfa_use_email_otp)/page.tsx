
import { Widget } from "../../../../components/widget";
import { type KindePageEvent } from "@kinde/infrastructure";
import React from "react";
import { renderToString } from "react-dom/server.browser";
import { DefaultLayout } from "../../../../layouts/default";
import { Root } from "../../../../root";

const MfaEmailOtpPage: React.FC<KindePageEvent> = ({
  context,
  request,
}) => {
  return (
    <Root context={context} request={request}>
      <DefaultLayout>
        <Widget heading={context.widget.content.heading} />
      </DefaultLayout>
    </Root>
  );
};

// Page Component
export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await MfaEmailOtpPage(event);
  return renderToString(page);
}