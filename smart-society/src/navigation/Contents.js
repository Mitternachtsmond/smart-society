import React from "react";
import ContentLink from "./ContentLink";

function Contents() {
  return (
    <div
      className="
        pt-6
        pl-2
      "
    >
      {localStorage.getItem("group") === "3" ? (
        <>
          <ContentLink title="Home" slug="gatelog" />
          <ContentLink title="Parking" slug="parking" />
        </>
      ) : (
        <>
          <ContentLink title="Home" slug="" />
          <ContentLink title="Accounts" slug="accounts" />
          <ContentLink title="Members" slug="members" />
          <ContentLink title="Properties" slug="properties" />
          <ContentLink title="Inventory" slug="inventory" />
          <ContentLink title="Maintenance" slug="maintenance" />
          <ContentLink title="Society Staff" slug="societystaff" />
          <ContentLink title="Personal Staff" slug="personalstaff" />
          <ContentLink title="Parking" slug="parking" />
          <ContentLink title="Polls" slug="polls" />
        </>
      )}
      {localStorage.getItem("group") === "1" && (
        <>
          <ContentLink title="Transactions" slug="transactions" />
          <ContentLink title="Gate Log" slug="gatelog" />
        </>
      )}
    </div>
  );
}

export default Contents;
