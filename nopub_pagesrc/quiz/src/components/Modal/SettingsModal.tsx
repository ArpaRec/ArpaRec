import {
  difficultiesList,
  type DifficultiesOption,
} from "../../features/settings/difficultiesList";
import { categoriesList, type CategoryOption } from "../../features/settings/categoriesList";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { typesList, type TypeOption } from "../../features/settings/typesList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setSettingsState } from "../../features/settings/settingsSlice";
import { useState } from "react";
import ReactDOM from "react-dom";
import Select from "../Select";
import Button from "../Button";
import Icons from "../../styles/Icons";
import {
  Hr,
  H1,
  Close,
  Label,
  Caption,
  ModalBody,
  TextField,
  ModalHeader,
  ModalContent,
  InputContainer,
  ButtonContainer,
  ModalBackground,
} from "./index.styled";

interface SettingsModalProps {
  /** Hides the settings modal */
  closeHandler: () => void;
}

const SettingsModal = ({ closeHandler }: SettingsModalProps) => {
  const initialState = useAppSelector((state) => state.settings);
  const [settings, setSettings] = useState(() => initialState);
  const dispatch = useAppDispatch();
  const setQuestionsNumber = (newQuestionsNumber: number) => {
    setSettings((prevSettings) => ({ ...prevSettings, questionsNumber: newQuestionsNumber }));
  };

  const questionsNumberValidator = () => {
    if (settings.questionsNumber < 1) setQuestionsNumber(1);
    if (settings.questionsNumber > 50) setQuestionsNumber(50);
  };
  const questionsNumberChangeHandler = (event: any) => {
    setQuestionsNumber(event.target.value);
  };

  const setCategory = (newCategory: CategoryOption) => {
    setSettings((prevSettings) => ({ ...prevSettings, category: newCategory }));
  };
  const setDifficulty = (newDifficulty: DifficultiesOption) => {
    setSettings((prevSettings) => ({ ...prevSettings, difficulty: newDifficulty }));
  };
  const setType = (newType: TypeOption) => {
    setSettings((prevSettings) => ({ ...prevSettings, type: newType }));
  };

  return ReactDOM.createPortal(
    <ModalBackground onClick={closeHandler}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <H1>Settings</H1>
          <Close onClick={closeHandler}>{Icons.close_24px}</Close>
        </ModalHeader>
        <Hr />
        <ModalBody>
          <InputContainer>
            <Label>Amount of questions</Label>
            <TextField
              type="number"
              value={settings.questionsNumber}
              onBlur={questionsNumberValidator}
              onChange={questionsNumberChangeHandler}
            />
            <Caption>Must be a number between 1 and 50 inclusive</Caption>
          </InputContainer>
          <InputContainer>
            <Label>Category</Label>
            <Select
              optionsList={categoriesList}
              value={settings.category}
              changeHandler={setCategory}
            />
          </InputContainer>
          <InputContainer>
            <Label>Difficulty</Label>
            <Select
              optionsList={difficultiesList}
              value={settings.difficulty}
              changeHandler={setDifficulty}
              displayTop
            />
          </InputContainer>
          <InputContainer>
            <Label>Type</Label>
            <Select
              optionsList={typesList}
              value={settings.type}
              changeHandler={setType}
              displayTop
            />
          </InputContainer>
          <Caption>
            If you apply new settings during an ongoing game a new quiz will be generated! Keep it
            in mind!
          </Caption>
        </ModalBody>
        <Hr />
        <ButtonContainer>
          <Button secondary onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(setSettingsState(settings));
              toast.success("Settings are saved!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }}
          >
            Apply
          </Button>
        </ButtonContainer>
      </ModalContent>
      <ToastContainer />
    </ModalBackground>,
    document.getElementById("root") as Element
  );
};

export default SettingsModal;
