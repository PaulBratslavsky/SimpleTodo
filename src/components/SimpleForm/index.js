import React from "react";
import styled from "styled-components";
import toDateInputValue from "../../utils/toDateInputValue";

const SimpleFormStyled = styled.form`
  background: ${({ editMode }) => (editMode ? "#9fa0d4" : "#efefef")};
  color: black;

  display: flex;
  flex-direction: column;
  border-radius: 3px;
  padding: 0.5rem;

  input,
  button {
    border: none;
    border-radius: 3px;
    margin-bottom: 1rem;
    font-size: 1.4rem;
    padding: 0.5rem 0.75rem;
    width: 100%;
  }

  button {
    background: ${({ isSending }) => (isSending ? "#81a7b7" : "#408db9")};
    color: white;
    display: block;
    margin-bottom: 0;
    font-size: 1.8rem;
  }

  #cancel {
    align-self: flex-end;
    margin-bottom: 0.75rem;
    font-weight: bold;
    color: #504e4e;
  }

  label {
    font-weight: bold;
    color: #504e4e;
    margin-bottom: 0.5rem;
  }
`;

const SimpleForm = ({ setList, list, editMode, editItem, setEditMode }) => {
  React.useEffect(() => {
    if (editMode) {
      setIsOpen(true);
      setTempFormData(editItem);
      setButtonText("Edit Task");
    } else {
      setButtonText("Add Task");
    }
  }, [editMode, editItem]);

  const currentDateAndTime = toDateInputValue(new Date());

  const initialFormData = {
    task: "",
    description: "",
    importance: 0,
    dueDate: currentDateAndTime,
    id: Date.now(),
  };

  const [tempFormData, setTempFormData] = React.useState(initialFormData);
  const [buttonText, setButtonText] = React.useState();
  const [isSending, setIsSending] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const isFormBlank = (tempArray) => (tempArray.includes("") ? true : false);

  const handleEditRequest = () => {
    setIsSending(true);

    setList(
      list.map((item) => {
        if (item.id === tempFormData.id) {
          const tempData = { ...item, ...tempFormData };
          return tempData;
        }
        return item;
      })
    );

    setTimeout(() => {
      setTempFormData(initialFormData);
      handleCloseMenu();
      setIsSending(false);
    }, 1000);
  };

  const handlePostRequest = (e) => {
    setIsSending(true);

    setTimeout(() => {
      setList((prev) => prev.concat(tempFormData));
      setTempFormData(initialFormData);
      handleCloseMenu();
      setIsSending(false);
    }, 1000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isFormBlank([tempFormData.task, tempFormData.description])) {
      alert("Please enter both Task Name and Description");
    } else {
      if (editMode) {
        handleEditRequest();
      } else {
        handlePostRequest(e);
      }
    }
  };

  const handleSetFormData = (e) => {
    if (e.target.name === "importance") {
      setTempFormData({
        ...tempFormData,
        [e.target.name]: parseInt(e.target.value, 10),
      });
    } else {
      setTempFormData({ ...tempFormData, [e.target.name]: e.target.value });
    }
  };

  const handleShowMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
    setEditMode(false);
    setTempFormData(initialFormData);
  };

  return (
    <SimpleFormStyled
      onSubmit={handleFormSubmit}
      isSending={isSending}
      editMode={editMode}
    >
      {isOpen ? (
        <>
          <span id="cancel" onClick={handleCloseMenu}>
            cancel
          </span>
          <label htmlFor="task">Task:</label>
          <input
            name="task"
            placeholder="Add task name"
            value={tempFormData.task}
            onChange={handleSetFormData}
            autoComplete="off"
          />
          <label htmlFor="description">Description:</label>
          <input
            name="description"
            placeholder="Add description"
            value={tempFormData.description}
            onChange={handleSetFormData}
            autoComplete="off"
          />
          <label htmlFor="importance">Importance:</label>
          <input
            name="importance"
            type="number"
            placeholder="Add number 1 - 100"
            value={tempFormData.importance}
            onChange={handleSetFormData}
            min={0}
            max={100}
            autoComplete="off"
          />
          <label htmlFor="dueDate">Due Date:</label>
          <input
            name="dueDate"
            // type="datetime-local"
            type="date"
            value={tempFormData.dueDate}
            onChange={handleSetFormData}
          />
          <button disabled={isSending}>
            {isSending ? "Sending" : buttonText}
          </button>
        </>
      ) : (
        <button onClick={handleShowMenu} type="button">
          Add Task
        </button>
      )}
    </SimpleFormStyled>
  );
};

export default SimpleForm;
