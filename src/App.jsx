import GameBoard from "./components/GameBoard";
import GlobalStyle from "./styles/GlobalStyle.styled";
import AppStyled from "./styles/App.styled";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppStyled>
        <GameBoard />
      </AppStyled>
    </>
  );
};

export default App;
