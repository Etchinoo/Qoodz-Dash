import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.dir === "col" ? "column" : "row")};
  gap: ${(props) => props.gap || "0"};
  border-radius: 25px;
  min-height: 420px;
  box-shadow: 1px 4px 77px rgba(237, 237, 255, 0.89);
  padding: ${(props) => props.padding || "0"};
  background: ${(props) => props.background || "#FFFFFF"};
  margin: ${(props) => props.margin || "0"};
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  background: ${(props) => props.background || "transparent"};

  justify-content: ${(props) => (props.spread ? "space-between" : null)};
  justify-content: ${(props) => (props.center ? "center" : null)};
  justify-content: ${(props) => (props.even ? "space-evenly" : null)};

  align-items: ${(props) => (props.allignBottom ? "flex-end" : "center")};
  width: ${(props) => props.width || "100%"};
  gap: ${(props) => props.gap || "0"};
  margin-top: ${(props) => props.mt || "0"};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: ${(props) => (props.spread ? "space-between" : null)};
  align-items: center;
  width: 100%;
  /* background-color: aqua; */
  gap: ${(props) => props.gap || "0"};
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ${(props) => (props.center ? "align-items: center" : null)};
  gap: ${(props) => props.gap || "0"};
  width: 100%;
  max-width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  ${({ shadow }) =>
    shadow &&
    css`
      box-shadow: 1px 4px 77px rgba(237, 237, 255, 0.89);
    `}
  /* ${(props) => props.master && "width: calc(100vw - 225px)"}; */
  margin-right: ${(props) => props.marginHorz || "0"};
  margin-left: ${(props) => props.marginHorz || "0"};
  margin-top: ${(props) => props.marginVert || "0"};
  margin-bottom: ${(props) => props.marginVert || "0"};
  padding-right: ${(props) => props.paddingHorz || "0"};
  padding-left: ${(props) => props.paddingHorz || "0"};
  padding-top: ${(props) => props.paddingVert || "0"};
  padding-bottom: ${(props) => props.paddingVert || "0"};
  background: ${(props) => props.background || "transparent"};
`;

export const Header = styled.div`
  display: flex;
  /* background-color: antiquewhite; */
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  max-width: 1540px;
  gap: 20px;
  font-family: GilroyBold;
  font-size: 28px;
  line-height: 0px;
  span {
    line-height: 0;
  }
  /* margin-top: ${(props) => props.marginVert || "28px"};
  margin-bottom: ${(props) => props.marginVert || "28px"}; */
  color: #282a37;
  ${(props) =>
    props.pointer
      ? css`
          cursor: pointer;
        `
      : css`
          cursor: default;
        `}
`;

export const H2 = styled.div`
  font-family: GilroyBold;
  font-size: 24px;
  line-height: 0px;
`;
