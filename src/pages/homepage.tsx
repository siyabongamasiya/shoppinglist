import React from "react";
import Button from "../components/button";
import { FaPlus } from "react-icons/fa";
import EditProfileDialogue from "../components/editProfileDialogue";
import FilterBar from "../components/filter";

export default function Homepage() {
  return (
    <div>
      {/* <Button
        icon={<FaPlus style={{ color: "white" }} size="10px" />}
        text="test"
        onClick={() => console.log("test")}
        style={{
          border: "2px solid transparent",
          background: "transparent",
          color: "white",
        }}
      /> */}

      {/* <EditProfileDialogue
        name=""
        surname=""
        email=""
        cellNumber=""
        onUpdate={() => console.log("update")}
        onCancel={() => console.log("cancel")}
        onChange={(field, value) => console.log(field, value)}
      /> */}

      <FilterBar onFilterChange={() => {}} categories={["test", "test2"]}/>
    </div>
  );
}
