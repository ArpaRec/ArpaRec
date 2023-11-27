import styled from "styled-components";
import { BasicCard } from "../../components/Card/index.styled";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: min(720px, 100% - 8px * 2);

  @media (max-width: 400px) {
    gap: 16px;
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const H1 = styled.h1`
  font-family: Inter, sans-serif;
  font-size: 36px;
  color: ${(props) => props.theme.grayTwo};
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: ${(props) => props.theme.violet};
  }
`;

export const StyledVictoryCard = styled(BasicCard)`
  background: ${(props) => props.theme.paleGold};
  gap: 48px;

  &::after {
    content: "🏆";
    position: absolute;
    top: 32px;
    right: 32px;
    font-size: 40px;
    opacity: 0.15;
  }

  h2 {
    color: ${(props) => props.theme.grayTwo};
    font-size: 20px;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 32px;
  }

  p {
    font-size: 16px;
    color: ${(props) => props.theme.grayTwo};
    line-height: 200%;
    font-weight: 700;
  }

  span {
    background: ${(props) => props.theme.whiteOne};
    padding: 8px 10px;
    border: 2px solid ${(props) => props.theme.grayTwo};
    border-radius: 8px;
  }
`;

export const StyledNothingFoundCard = styled(BasicCard)`
  background: ${(props) => props.theme.paleRed};

  &::after {
    content: "🤷‍♂️";
    position: absolute;
    top: 32px;
    right: 32px;
    font-size: 40px;
    opacity: 0.15;
  }

  h2 {
    color: ${(props) => props.theme.grayTwo};
    font-size: 20px;
  }

  div {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 32px;
  }

  p {
    font-size: 16px;
    color: ${(props) => props.theme.grayTwo};
    line-height: 200%;
  }

  span {
    background: ${(props) => props.theme.whiteOne};
    padding: 8px 10px;
    border: 2px solid ${(props) => props.theme.grayTwo};
    border-radius: 8px;
  }
`;

export const StyledOfflineCard = styled(BasicCard)`
  background: ${(props) => props.theme.paleRed};

  h2 {
    color: ${(props) => props.theme.grayTwo};
    font-size: 20px;
  }

  p {
    font-size: 16px;
    color: ${(props) => props.theme.grayTwo};
    line-height: 200%;
  }

  &::after {
    content: "🤷‍♂️";
    position: absolute;
    top: 32px;
    right: 32px;
    font-size: 40px;
    opacity: 0.15;
  }
`;

export const OptionButton = styled.div`
  padding: 12px;
  cursor: pointer;
  border-radius: 50%;
  transition: 0.3s ease-in-out;

  &:hover {
    background: ${(props) => props.theme.paleViolet};
  }

  &:active {
    scale: 0.95;
  }

  img {
    pointer-events: none;
    display: block;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;
