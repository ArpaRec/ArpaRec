import { MegaHeaderContainer, MegaHeader, ButtonContainer } from "./index.styled";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { SettingsModal } from "../../components/Modal";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const closeSettingsHandler = () => {
    setShowSettings(false);
  };

  return (
    <MegaHeaderContainer>
      {showSettings && <SettingsModal closeHandler={closeSettingsHandler} />}
      <MegaHeader>Quizzical</MegaHeader>

      <ButtonContainer>
        <Button large onClick={() => navigate("/quiz")}>
          START QUIZ
        </Button>
        <Button large secondary onClick={() => setShowSettings(true)}>
          SETTINGS
        </Button>
      </ButtonContainer>
    </MegaHeaderContainer>
  );
}

export default Home;
