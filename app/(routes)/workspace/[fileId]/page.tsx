"use client"
import React, { useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";

function Workspace() {
  const [triggerSave, setTriggerSave] = useState(false);
  return (
    <div>
      <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />
      {/* Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document */}
        <div className=" h-screen">
          <Editor onSaveTrigger={triggerSave}/>
        </div>
        {/* WhiteBoard/Canvas */}
        <div className="bg-red-200 h-screen">Canvas</div>
      </div>
    </div>
  );
}

export default Workspace;
