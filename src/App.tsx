import { ConfigProvider, Button, Typography } from "antd";
import { useGameStore } from "./store/gameStore";
import JeopardyBoard from "./components/JeopardyBoard";
import Scoreboard from "./components/Scoreboard";

const { Title } = Typography;

function App() {
  const { round, setRound } = useGameStore();

  const handleRoundChange = (newRound: 1 | 2) => {
    setRound(newRound);
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
    },
  };

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-blue-900 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-8">
            <Title
              level={1}
              className="text-4xl md:text-6xl font-bold text-yellow-400 mb-6"
            >
              JEOPARDY!
            </Title>

            {/* Round Selector */}
            <div className="flex justify-center gap-4 mb-6">
              <Button
                type={round === 1 ? "primary" : "default"}
                size="large"
                onClick={() => handleRoundChange(1)}
                className="px-6 py-3 font-bold text-lg rounded-lg min-w-[120px]"
              >
                Round 1
              </Button>
              <Button
                type={round === 2 ? "primary" : "default"}
                size="large"
                onClick={() => handleRoundChange(2)}
                className="px-6 py-3 font-bold text-lg rounded-lg min-w-[120px]"
              >
                Round 2
              </Button>
            </div>
          </header>

          {/* Game Board */}
          <main>
            <JeopardyBoard />
          </main>

          {/* Scoreboard */}
          <Scoreboard />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
