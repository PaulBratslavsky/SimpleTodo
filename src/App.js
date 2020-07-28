import React from "react";
import Main from "./layout/main";
import Header from "./layout/header";
import MainContent from "./layout/mainContent";
import Footer from "./layout/footer";
import SimpleForm from "./components/SimpleForm";
import SimpleList from "./components/SimpleList";
import SimpleClock from "./components/SimpleClock";
import SubHeader from "./layout/subHeader";
import styled from "styled-components";
import http from "./api";

const GET_ALL_URL = "https://localhost:5001/api/Task/GetAll";
const GET_ACTIVE_URL = "https://localhost:5001/api/Task/GetActive";
const GET_COMPLETED_URL = "https://localhost:5001/api/Task/GetCompleted";
const initialUrl = { url: GET_ALL_URL, color: "#de47a0", label: "All" };

const StyledMenuButton = styled.input`
  background: ${({ active, color }) => (active ? color : "#ffffff")};
  color: ${({ active }) => (active ? "#ffffff": "#343a40")};

  padding: 0.5rem;
  border: none;
  border-radius: none;
  box-shadow: none;
  font-size: 1.4rem;
  flex: 1;
  text-transform: lowercase;

  &:focus {
  outline: none;
}
`;

function App() {
  // Eventually move to State Managment
  const [list, setList] = React.useState([]);
  const [editItem, setEditItem] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);
  const [todos, setTodos] = React.useState([]);
  const [error, setError] = React.useState([]);
  const [selectedUrl, setSelectedUrl] = React.useState(initialUrl);

  // Get data from API
  React.useEffect(() => {
    http.GET(selectedUrl.url, (err, todos) =>
      !err ? setTodos(todos) : setError((prev) => [...prev, err])
    );
  }, [selectedUrl]);

  const handleFilterSelect = (e) => {
    switch (e.target.value) {
      case "active":
        setSelectedUrl({
          url: GET_ACTIVE_URL,
          color: "#b947de",
          label: "Active",
        });
        break;
      case "completed":
        setSelectedUrl({
          url: GET_COMPLETED_URL,
          color: "#4776de",
          label: "Completed",
        });
        break;
      default: {
        setSelectedUrl(initialUrl);
      }
    }
  };

  const sortListByImportance = (list) =>
    list.sort((a, b) => b.importance - a.importance);

  const onHandleDeleteById = (id) =>
    setList((prev) => prev.filter((item) => item.id !== id));

  const onHandleUpVoteById = (id) =>
    setList(
      list.map((item) => {
        if (item.id === id) {
          item.importance = parseInt(item.importance, 10) + 1;
          return item;
        }
        return item;
      })
    );

  const onHandleDownVoteById = (id) =>
    setList(
      list.map((item) => {
        if (item.id === id) {
          item.importance = parseInt(item.importance, 10) - 1;
          return item;
        }
        return item;
      })
    );

  const onHandleSelectEditById = (id) => {
    const tempItem = list.find((item) => item.id === id);
    console.log(tempItem);
    setEditMode(true);
    setEditItem(tempItem);
  };
  return (
    <Main>
      <Header />
      <SubHeader position="sticky" stack={2}>
        <SimpleClock time date fontSize="1rem" />
      </SubHeader>

      <MainContent>
        <SubHeader position="static" padding="0" color="#0071b2">
          <StyledMenuButton
            type="button"
            name="button"
            value="active"
            active={selectedUrl.label.toLowerCase() === "active"}
            color={selectedUrl.color}
            className="form-check-input"
            onClick={handleFilterSelect}
          />

          <StyledMenuButton
            type="button"
            name="completed"
            value="completed"
            active={selectedUrl.label.toLowerCase() === "completed"}
            color={selectedUrl.color}
            onClick={handleFilterSelect}
          />

          <StyledMenuButton
            type="button"
            name="button"
            value="all"
            active={selectedUrl.label.toLowerCase() === "all"}
            color={selectedUrl.color}
            onClick={handleFilterSelect}
            className="form-check-input"
          />
        </SubHeader>
        <SubHeader
          position="sticky"
          stack={2}
          top="30px"
          textColor="white"
          color={selectedUrl.color}
        >
          <h2>{selectedUrl.label}</h2>
          <h2>({todos.length})</h2>
        </SubHeader>
        {todos.length > 0 ? (
          <SimpleList
            list={sortListByImportance(todos)}
            onHandleDeleteById={onHandleDeleteById}
            onHandleUpVoteById={onHandleUpVoteById}
            onHandleDownVoteById={onHandleDownVoteById}
            onHandleSelectEditById={onHandleSelectEditById}
          />
        ) : null}
      </MainContent>
      <Footer>
        <SimpleForm
          setList={setList}
          list={todos}
          editItem={editItem}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </Footer>
    </Main>
  );
}

export default App;
