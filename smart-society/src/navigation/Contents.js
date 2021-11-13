import React from "react";
import ContentLink from "./ContentLink";

function Contents() {
  return (
    <div
      className="
        pb-10
        pt-10
        pl-10
      "
    >
      <ContentLink title="Home" slug="" />
      <ContentLink title="Accounts" slug="accounts" />
      <ContentLink title="Members" slug="members" />
      <ContentLink title="Properties" slug="properties" />
      <ContentLink title="Inventory" slug="inventory" />
      <ContentLink title="Maintenance" slug="maintenance" />
      <ContentLink title="Transactions" slug="transactions" />
      <ContentLink title="Parking" slug="parking" />
      <ContentLink title="Gate Log" slug="gatelog" />
      <ContentLink title="Society Staff" slug="societystaff" />
      <ContentLink title="Personal Staff" slug="personalstaff" />
      <ContentLink title="Polls" slug="polls" />
      <ContentLink title="Complaint" slug="complaint" />
    </div>
  );
}

export default Contents;
