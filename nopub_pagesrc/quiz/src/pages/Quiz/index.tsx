import { Main, HeaderContainer, H1, OptionButton, ButtonContainer } from "./index.styled";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { useFetchQuestionsQuery } from "../../features/api/opentdbSlice";
import { useState, useEffect } from "react";
import { setNewQuestions } from "../../features/questions/questionsSlice";
import { SettingsModal } from "../../components/Modal";
import { SkeletonCard } from "../../components/Card";
import { setGameState } from "../../features/quizState/quizStateSlice";
import { useNavigate } from "react-router-dom";
import NothingFound from "./NothingFoundCard";
import VictoryCard from "./VictoryCard";
import OfflineCard from "./OfflineCard";
import Spinner from "../../components/Spinner";
import Button from "../../components/Button";
import Icons from "../../styles/Icons";
import Card from "../../components/Card";

function Quiz() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const quizState = useAppSelector((state) => state.quizState);
  const settings = useAppSelector((state) => state.settings);
  const [showSettings, setShowSettings] = useState(false);
  const closeSettingsHandler = () => {
    setShowSettings(false);
  };
  const showSettingsHandler = () => {
    setShowSettings(true);
  };

  const questions = useAppSelector((state) => state.questions);
  const isAllOptionsSelected = questions.every((question) => question.selectedOptionID !== null);
  const cards = questions.map((item) => <Card key={item.questionID} {...item} />);
  const skeletonCards = [...Array(+settings.questionsNumber)]
    .fill(0)
    .map((item, index) => <SkeletonCard key={index} />);

  const {
    data = [],
    isFetching,
    refetch,
  } = useFetchQuestionsQuery({
    questionsNumber: settings.questionsNumber,
    category: settings.category.value,
    difficulty: settings.difficulty.value,
    type: settings.type.value,
  });

  useEffect(() => {
    // Helps to avoid showing irrelevant cards if data is being fetched
    if (isFetching === false) {
      dispatch(setNewQuestions(data));
      if (data.length === 0) {
        dispatch(setGameState("nothing found"));
      } else {
        dispatch(setGameState("ongoing"));
      }
    }
  }, [isFetching]);

  return (
    <Main>
      {showSettings && <SettingsModal closeHandler={closeSettingsHandler} />}
      <HeaderContainer>
        <H1 onClick={() => navigate("/")}>Quizzical</H1>
        <ButtonContainer>
          <OptionButton onClick={refetch}>
            {isFetching ? <Spinner /> : Icons.reload_32px}{" "}
          </OptionButton>
          <OptionButton onClick={() => setShowSettings(true)}>{Icons.gear_32px}</OptionButton>
        </ButtonContainer>
      </HeaderContainer>

      {/* Displays when user's offline */}
      <OfflineCard />

      {/* Displays when server returned empty array of quesitions */}
      {quizState === "nothing found" && (
        <NothingFound refetch={refetch} clickHandler={showSettingsHandler} />
      )}

      {/* Displays when the quiz is finished */}
      {quizState === "finished" && <VictoryCard refetch={refetch} />}

      {/* Displays during refetching of new quizzes */}
      {isFetching ? skeletonCards : cards}

      {quizState === "ongoing" && (
        <ButtonContainer>
          <Button
            secondary
            onClick={() => {
              refetch();
              window.scrollTo(0, 0);
            }}
          >
            {isFetching ? <Spinner /> : <>New Quiz</>}
          </Button>
          <Button
            disabled={!isAllOptionsSelected}
            onClick={() => {
              window.scrollTo(0, 0);
              dispatch(setGameState("finished"));
            }}
          >
            Check answers
          </Button>
        </ButtonContainer>
      )}
    </Main>
  );
}

export default Quiz;
