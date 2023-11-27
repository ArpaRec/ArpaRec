import { Offline } from "react-detect-offline";
import { StyledOfflineCard } from "./index.styled";

function OfflineCard() {
  return (
    <Offline>
      <StyledOfflineCard>
        <h2>You're offline</h2>
        <p>Thus you can't request new questions.</p>
      </StyledOfflineCard>
    </Offline>
  );
}

export default OfflineCard;
