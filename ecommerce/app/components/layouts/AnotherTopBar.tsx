import React from "react";
import Icon from "../Icon";
import { ICONS } from "@/constants/icons";

const AnotherTopBar = () => {
  return (
    <div>
      <Icon
        className="text-gray-500"
        icon="vaadin:database"
        width={22}
        height={22}
      />{" "}
    </div>
  );
};

export default AnotherTopBar;
