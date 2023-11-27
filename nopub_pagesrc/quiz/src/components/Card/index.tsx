import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { selectAnswer } from "../../features/questions/questionsSlice";
import { SkeletonOption } from "../Option";
import { IQuestion } from "../../features/questions/questionsSlice";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import Option from "../Option";
import { Badge, Header, StyledCard, BadgesCointainer, OptionsContainer, SkeletonBadge } from "./index.styled";

interface CardProps extends IQuestion {}

export default function Card({
  question,
  category,
  difficulty,
  options,
  selectedOptionID,
  correctOptionID,
  questionID,
}: CardProps) {
  const quizState = useAppSelector((state) => state.quizState);
  const isCorrect = quizState === "finished" ? selectedOptionID === correctOptionID : undefined;
  const dispatch = useAppDispatch();
  return (
    <StyledCard isCorrect={isCorrect} isAnswerGiven={selectedOptionID !== null}>
      <Header isCorrect={isCorrect}>{question}</Header>
      <OptionsContainer>
        {options.map((option) => (
          <Option
            key={option.optionID}
            questionID={questionID}
            selectedOptionID={selectedOptionID}
            correctOptionID={correctOptionID}
            onClick={() =>
              dispatch(
                selectAnswer({
                  questionID: questionID,
                  optionID: option.optionID,
                })
              )
            }
            {...option}
          >
            {option.optionText}
          </Option>
        ))}
      </OptionsContainer>
      <BadgesCointainer>
        <Badge>{category}</Badge>
        <Badge>{difficulty}</Badge>
      </BadgesCointainer>
    </StyledCard>
  );
}

export function SkeletonCard() {
  return (
    <StyledCard>
      <Header>
        <Skeleton />
      </Header>
      <OptionsContainer>
        <SkeletonOption width="120px">
          <Skeleton />
        </SkeletonOption>
        <SkeletonOption width="80px">
          <Skeleton />
        </SkeletonOption>
        <SkeletonOption width="170px">
          <Skeleton />
        </SkeletonOption>
        <SkeletonOption width="100px">
          <Skeleton />
        </SkeletonOption>
      </OptionsContainer>
      <BadgesCointainer>
        <SkeletonBadge width="140px">
          <Skeleton />
        </SkeletonBadge>
        <SkeletonBadge width="100px">
          <Skeleton />
        </SkeletonBadge>
      </BadgesCointainer>
    </StyledCard>
  );
}
