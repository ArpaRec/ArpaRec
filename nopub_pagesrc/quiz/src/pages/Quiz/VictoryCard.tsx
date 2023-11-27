import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { StyledVictoryCard } from "./index.styled";
import { setGameState } from "../../features/quizState/quizStateSlice";
import { IQuestion } from "../../features/questions/questionsSlice";
import Button from "../../components/Button";

interface VictoryCardProps {
  refetch: any;
}

const VictoryCard = ({ refetch }: VictoryCardProps) => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questions);
  const questionsNumber = questions.length;
  const correctAnswersNumber = questions.reduce((count: number, question: IQuestion): number => {
    if ((question.selectedOptionID ?? 0) === question.correctOptionID) return count + 1;
    return count;
  }, 0);

  return (
    <StyledVictoryCard>
      <h2>The quiz is finished!</h2>
      <div>
        <p>
          Correct answers:{" "}
          <span>
            {correctAnswersNumber}&nbsp;/&nbsp;{questionsNumber}
          </span>
        </p>
        <Button
          onClick={() => {
            refetch();
            dispatch(setGameState("pending"));
          }}
        >
          Start New Game
        </Button>
      </div>
    </StyledVictoryCard>
  );
};

export default VictoryCard;
