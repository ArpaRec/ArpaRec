import Button from "../../components/Button";
import { setGameState } from "../../features/quizState/quizStateSlice";
import { useAppDispatch } from "../../app/reduxHooks";
import { StyledNothingFoundCard } from "./index.styled";

interface NothingFoundProps {
  refetch: any; // the type is just too long to write it down...
  clickHandler: () => void;
}

const NothingFound = ({ refetch, clickHandler }: NothingFoundProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledNothingFoundCard>
      <h2>Unable to find questions</h2>
      <p>
        Most probably there are no questions for such combination of settings. Try to change
        settings. For example, reduce the number of questions, or change type.
      </p>

      <div>
        <Button
          secondary
          onClick={() => {
            refetch();
            dispatch(setGameState("ongoing"));
          }}
        >
          Try again
        </Button>
        <Button onClick={clickHandler}>Update Settings</Button>
      </div>
    </StyledNothingFoundCard>
  );
};

export default NothingFound;
