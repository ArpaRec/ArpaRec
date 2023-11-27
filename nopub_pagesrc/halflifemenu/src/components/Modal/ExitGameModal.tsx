import { useTranslation } from "react-i18next";
import Modal from ".";
import Button from "../Button";
import classes from "./index.module.scss";

interface ExitGameModalProps {
  /** `onClick` handler. Is used to close the modal */
  clickHandler: () => void;
}

const ExitGameModal: React.FC<ExitGameModalProps> = ({ clickHandler }) => {
  const { t } = useTranslation();
  return (
    <Modal header={t("quit.modalName")} clickHandler={clickHandler}>
      <p style={{ textAlign: "center" }}>{t("quit.description")}</p>
      <div className={classes.centeredButtonGroup}>
        <Button
          clickHandler={() => {
            // rickroll
            // openInNewTab("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            window.location.replace('https://arparec.dev');
          }}
        >
          {t("quit.quit")}
        </Button>
        <Button clickHandler={clickHandler}>{t("quit.cancel")}</Button>
      </div>
    </Modal>
  );
};

export default ExitGameModal;
