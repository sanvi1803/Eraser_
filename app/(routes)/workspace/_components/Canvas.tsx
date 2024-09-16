"use client";
import React, { useEffect, useState } from "react";
import { FILE } from "../../dashboard/_components/FileList";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
function Canvas({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  const updateWhiteBoard = useMutation(api.files.updateWhiteboard);
  useEffect(() => {
    onSaveTrigger && saveWhiteBoard();
  }, [onSaveTrigger]);
  const saveWhiteBoard = () => {
    updateWhiteBoard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteBoardData),
    }).then((res) => console.log(res));
  };
  return (
    <div>
      <div style={{ height: "670px" }}>
        {fileData && (
          <Excalidraw
            initialData={{
              elements:
                fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
            }}
            onChange={(excalidrawElements, appState, files) =>
              setWhiteBoardData(excalidrawElements)
            }
            UIOptions={{
              canvasActions: {
                saveToActiveFile: false,
                loadScene: false,
                export: false,
                toggleTheme: false,
              },
            }}
          >
            <MainMenu>
              <MainMenu.DefaultItems.ClearCanvas />
              <MainMenu.DefaultItems.SaveAsImage />
              <MainMenu.DefaultItems.ChangeCanvasBackground />
            </MainMenu>
            <WelcomeScreen>
              <WelcomeScreen.Hints.MenuHint />
              <WelcomeScreen.Hints.HelpHint />
              <WelcomeScreen.Hints.ToolbarHint />
              <WelcomeScreen.Center>
                <WelcomeScreen.Center.Heading>
                  Welcome Here!
                </WelcomeScreen.Center.Heading>
              </WelcomeScreen.Center>
            </WelcomeScreen>
          </Excalidraw>
        )}
      </div>
    </div>
  );
}

export default Canvas;
