import React from "react";
import Original from "@theme-original/NavbarItem/LocaleDropdownNavbarItem";
import { translate } from "@docusaurus/Translate";

export default function LocaleDropdownNavbarItem(props) {
  return <Original {...props} dropdownItemsAfter={[
    ...(props.dropdownItemsAfter ?? []),
    {
      label: translate({ id: "locale.followSystem", message: "Use system language" }),
      to: "pathname:///?followSystem=true",
      target: "_self",
      autoAddBaseUrl: false,
    },
  ]} />;
}
