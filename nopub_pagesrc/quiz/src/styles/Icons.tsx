import cancel from "../assets/icon_cancel.svg";
import close from "../assets/icon_close.svg";
import selectIcon from "../assets/icon_chevron-up-down.svg";
import gear from "../assets/icon_gear.svg";
import reload from "../assets/icon_reload.svg";

const Icons = {
  gear_32px: (
    <img src={gear} alt="Icon in a form of a gear" width="32" height="32" draggable={false} />
  ),
  reload_32px: (
    <img
      src={reload}
      alt="Icon in a form of a circular arrow"
      width="32"
      height="32"
      draggable={false}
    />
  ),
  cancel_24px: (
    <img
      src={cancel}
      alt="Icon in a form of cancel sign"
      width="24"
      height="24"
      draggable={false}
    />
  ),
  close_24px: (
    <img src={close} alt="Icon in a form of a cross" width="24" height="24" draggable={false} />
  ),
  selectIcon_24px: (
    <img src={selectIcon} alt="Up and down chevrons" width="24" height="24" draggable={false} />
  ),
};

export default Icons;
