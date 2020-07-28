import React from "react";
import Main from "./layout/main";
import Header from "./layout/header";
import MainContent from "./layout/mainContent";
import Footer from "./layout/footer";
import SimpleForm from "./components/SimpleForm";
import SimpleList from "./components/SimpleList";
import SimpleClock from "./components/SimpleClock";
import SubHeader from "./layout/subHeader";
import Tabs from "./components/Tabs";

import http from "./api";

const localStorageName = "localTaskItems";
const URL = "https://localhost:5001/api/Task/GetAll";

function App() {
  // Eventually move to State Managment
  const [list, setList] = React.useState([]);
  const [completedList, setCompletedList] = React.useState([]);
  const [editItem, setEditItem] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);
  const [todos, setTodos] = React.useState([]);
  const [error, setError] = React.useState([]);

  const setLocalStorage = (name, items) =>
    localStorage.setItem(name, JSON.stringify(items));

  // Get data from API
  React.useEffect(() => {
    http.GET(URL, (err, todos) =>
      !err ? setTodos(todos) : setError((prev) => [...prev, err])
    );
  }, []);

  // Get initial data
  React.useEffect(() => getLocalStorage(localStorageName), []);

  //  Save to local when data change
  React.useEffect(
    () =>
      setLocalStorage(localStorageName, {
        list: [...list],
        completedList: [...completedList],
      }),
    [list, completedList]
  );

  console.log(todos, "DATA FROM API", error);

  const getLocalStorage = (name) => {
    console.log();
    if (localStorage.getItem(name)) {
      const tempItem = JSON.parse(localStorage.getItem(name));
      console.log(tempItem.list);
      console.log(tempItem.completedList);

      setList(tempItem.list);
      setCompletedList(tempItem.completedList);
    }
  };

  const sortListByImportance = (list) =>
    list.sort((a, b) => b.importance - a.importance);

  const onHandleDeleteById = (id) =>
    setList((prev) => prev.filter((item) => item.id !== id));
  const onHandleDeleteByIdCompleted = (id) =>
    setCompletedList((prev) => prev.filter((item) => item.id !== id));

  const onHandleCompletById = (id) => {
    const completedItem = list.find((item) => item.id === id);
    console.log(completedItem, "completed");
    setCompletedList((prev) => [...prev, completedItem]);
    setList((prev) => prev.filter((item) => item.id !== id));
  };

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
        <Tabs>
          <div label="To Do" color="#de47a0">
            <SubHeader
              position="sticky"
              stack={2}
              top="30px"
              textColor="white"
              color="#de47a0"
            >
              <h2>Active Items </h2>
              <h2>({list.length})</h2>
            </SubHeader>
            {list.length > 0 ? (
              <SimpleList
                list={sortListByImportance(list)}
                onHandleDeleteById={onHandleDeleteById}
                onHandleUpVoteById={onHandleUpVoteById}
                onHandleDownVoteById={onHandleDownVoteById}
                onHandleCompletById={onHandleCompletById}
                onHandleSelectEditById={onHandleSelectEditById}
              />
            ) : null}
          </div>
          <div label="Done" color="#de47d1">
            <SubHeader
              position="sticky"
              stack={2}
              top="30px"
              textColor="white"
              color="#de47d1"
            >
              <h2>Completed Items </h2>
              <h2>({completedList.length})</h2>
            </SubHeader>
            {completedList.length > 0 ? (
              <SimpleList
                completed
                onHandleDeleteById={onHandleDeleteByIdCompleted}
                list={completedList}
              />
            ) : null}
          </div>
        </Tabs>
      </MainContent>
      <Footer>
        <SimpleForm
          setList={setList}
          list={list}
          editItem={editItem}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </Footer>
    </Main>
  );
}

export default App;
