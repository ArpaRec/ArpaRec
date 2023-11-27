import styled, { css } from "styled-components";

interface CardProps {
  isCorrect?: boolean | undefined;
  isAnswerGiven?: boolean | undefined;
}

export const BasicCard = styled.section`
  padding: 32px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  border: 3px solid ${(props) => props.theme.grayOne};
  position: relative;

  @media (max-width: 400px) {
    padding: 16px;
  }
`;

export const StyledCard = styled(BasicCard)<CardProps>`
  background: ${(props) => (props.isAnswerGiven ? props.theme.grayThree : props.theme.whiteOne)};

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    right: 32px;
    font-size: 40px;
    opacity: 0.15;
    display: none;
  }

  ${(props) => {
    if (props.isCorrect === true)
      return css`
        background: ${props.theme.paleGreen};
      `;
    if (props.isCorrect === false)
      return css`
        background: ${props.theme.paleRed};
      `;
  }}
`;

interface HeaderProps {
  isCorrect?: boolean;
}

export const Header = styled.h2<HeaderProps>`
  font-size: 20px;
  color: ${(props) => props.theme.violet};
  font-weight: 600px;

  ${(props) => {
    if (props.isCorrect === true)
      return css`
        &::before {
          content: "✅ ";
        }
      `;
    if (props.isCorrect === false)
      return css`
        &::before {
          content: "❌ ";
        }
      `;
  }}
`;

export const OptionsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const BadgesCointainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

export const Badge = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.grayOne};
  padding: 4px 12px;
  background: ${(props) => props.theme.whiteTwo};
  border: 1px solid ${(props) => props.theme.grayOne};
  border-radius: 4px;
  line-height: 100%;
  user-select: none;
`;

interface SkeletonBadgeProps {
  width?: string;
}

export const SkeletonBadge = styled(Badge)<SkeletonBadgeProps>`
  width: ${(props) => ("width" in props ? props.width : "100px")};
`;
