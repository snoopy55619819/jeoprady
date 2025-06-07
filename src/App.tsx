import { ConfigProvider, Button, Typography } from "antd";
import { useState, useEffect } from "react";
import { useGameStore } from "./store/gameStore";
import GameSelector from "./components/GameSelector";
import PlayerSetup from "./components/PlayerSetup";
import JeopardyBoard from "./components/JeopardyBoard";
import FinalRound from "./components/FinalRound";
import Scoreboard from "./components/Scoreboard";
import useAnimatedFavicon from "./hooks/useAnimatedFavicon";

const { Title } = Typography;

function App() {
  const { round, setRound, selectedGame } = useGameStore();
  const [playersSetup, setPlayersSetup] = useState(false);

  useAnimatedFavicon();

  // Reset player setup when game changes
  useEffect(() => {
    setPlayersSetup(false);
  }, [selectedGame?.id]);

  const handleRoundChange = (newRound: 1 | 2 | 3) => {
    setRound(newRound);
  };

  const handlePlayersSetupComplete = () => {
    setPlayersSetup(true);
  };

  // Ant Design theme customization for Jeopardy
  const theme = {
    token: {
      colorPrimary: "#fbbf24", // yellow-400
      colorBgContainer: "#1e40af", // blue-800
      colorText: "#fbbf24", // yellow-400
      colorTextSecondary: "#fbbf24",
      borderRadius: 8,
    },
    components: {
      Button: {
        primaryShadow: "none",
        defaultBorderColor: "#fbbf24",
        defaultColor: "#fbbf24",
        defaultBg: "#2563eb",
        primaryBg: "#fbbf24",
        primaryColor: "#1e3a8a",
      },
      Modal: {
        contentBg: "#1e40af",
        headerBg: "#1e40af",
        titleColor: "#fbbf24",
      },
      Typography: {
        titleMarginBottom: "0.5em",
        titleMarginTop: 0,
      },
      Select: {
        colorBgContainer: "#2563eb",
        colorText: "#fbbf24",
        colorBorder: "#fbbf24",
        colorPrimary: "#fbbf24",
        colorPrimaryHover: "#fbbf24",
        optionSelectedBg: "#1e40af",
        optionActiveBg: "#1e40af",
        colorBgElevated: "#2563eb",
      },
      Input: {
        colorBgContainer: "#2563eb",
        colorText: "#fbbf24",
        colorBorder: "#fbbf24",
        colorPrimary: "#fbbf24",
        activeBorderColor: "#fbbf24",
        hoverBorderColor: "#fbbf24",
      },
      Alert: {
        colorInfoBg: "#2563eb",
        colorInfoBorder: "#fbbf24",
        colorIcon: "#fbbf24",
        colorText: "#fbbf24",
      },
    },
  };

  // Get the final round data if available
  const finalRound = selectedGame?.rounds[2]; // Round 3 is at index 2

  return (
    <ConfigProvider theme={theme}>
      <div className="h-screen bg-blue-900 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full min-h-0">
          {/* Header */}
          <header className="flex-shrink-0 px-4 pt-4 pb-2">
            <div className="flex justify-between items-start mb-4">
              <Title
                level={1}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-0"
              >
                JEOPARDY!
              </Title>

              {/* Compact Game Selector in top-right */}
              {selectedGame && playersSetup && (
                <div className="flex items-center gap-4">
                  <span className="text-yellow-400 font-medium">Game:</span>
                  <GameSelector compact={true} />
                </div>
              )}
            </div>

            {/* Game Selector - only show full version if no game selected */}
            {!selectedGame && <GameSelector />}

            {/* Player Setup - show after game selected but before players setup */}
            {selectedGame && !playersSetup && (
              <PlayerSetup onComplete={handlePlayersSetupComplete} />
            )}

            {/* Round Selector - only show if game is selected and players are setup */}
            {selectedGame && playersSetup && (
              <div className="flex justify-center gap-2 mb-2">
                <Button
                  type={round === 1 ? "primary" : "default"}
                  size="middle"
                  onClick={() => handleRoundChange(1)}
                  className="px-4 py-2 font-bold text-sm rounded-lg min-w-[100px]"
                  disabled={!selectedGame.rounds[0]}
                >
                  Round 1
                </Button>
                <Button
                  type={round === 2 ? "primary" : "default"}
                  size="middle"
                  onClick={() => handleRoundChange(2)}
                  className="px-4 py-2 font-bold text-sm rounded-lg min-w-[100px]"
                  disabled={!selectedGame.rounds[1]}
                >
                  Round 2
                </Button>
                {finalRound && (
                  <Button
                    type={round === 3 ? "primary" : "default"}
                    size="middle"
                    onClick={() => handleRoundChange(3)}
                    className="px-4 py-2 font-bold text-sm rounded-lg min-w-[100px]"
                  >
                    Final Jeopardy
                  </Button>
                )}
              </div>
            )}
          </header>

          {/* Game Content */}
          <main className="flex-1 overflow-hidden px-4 min-h-0">
            <div className="h-full flex flex-col">
              {selectedGame && playersSetup && round <= 2 && <JeopardyBoard />}
              {selectedGame && playersSetup && round === 3 && finalRound && (
                <div className="flex-1 overflow-auto">
                  <FinalRound finalRound={finalRound} />
                </div>
              )}
            </div>
          </main>

          {/* Scoreboard - only show if game is selected and players are setup */}
          {selectedGame && playersSetup && (
            <footer className="flex-shrink-0 px-4 pb-4 pt-2">
              <Scoreboard />
            </footer>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
