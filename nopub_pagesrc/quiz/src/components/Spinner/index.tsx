import styled from "styled-components";

const size = "24px";
const borderWidth = "4px";

interface SpinnerProps {
  type?: "light";
}

const Spinner = styled.div<SpinnerProps>`
  // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_loader
  border: ${borderWidth} solid transparent;
  border-radius: 50%;
  border-top: ${borderWidth} solid
    ${(props) => (props.type === "light" ? props.theme.whiteOne : props.theme.violet)};
  width: ${size};
  height: ${size};
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
