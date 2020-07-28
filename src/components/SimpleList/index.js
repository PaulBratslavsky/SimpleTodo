import React from "react";
import styled from "styled-components";

const SimpleListStyled = styled.ul`
  .btn-group {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;

    button {
      padding: 0.3rem;
      font-weight: bold;
      color: #504e4e;
    }
  }

  li:first-child {
    background: white;
  }

  li {
    padding: 1rem;
    background: #efefef;
    color: black;
    display: block;
    list-style: none;
    margin-bottom: 1rem;

    p {
      font-size: 1.2rem;
    }
  }
`;
// move to new file
const ButtonStyled = styled.button`
  flex: 1;
`;
const Button = ({ name, onHandleClick, itemID }) => (
  <ButtonStyled onClick={() => onHandleClick(itemID)}>{name}</ButtonStyled>
);

const SimpleList = ({
  list,
  onHandleDeleteById,
  onHandleUpVoteById,
  onHandleDownVoteById,
  onHandleCompletById,
  onHandleSelectEditById,
  completed,
}) =>
  list && list.length > 0 ? (
    <SimpleListStyled>
      {list.map((item) => (
        <li key={item.id}>
          <p>Item ID: {item.id}</p>
          <p>Importance: {item.importance}</p>
          <p>Task: {item.name}</p>
          <p>Item Completed: {item.completed ? 'yes' : 'no'}</p>
          <p>Due Date: {item.dueDate.toLocaleString()}</p>
          <p>Description: {item.description}</p>
          <p>Timestamp: </p>

          {completed ? (
            <div className="btn-group">
              <Button
                name="Delete"
                onHandleClick={onHandleDeleteById}
                itemID={item.id}
              />
            </div>
          ) : (
            <div className="btn-group">
              <Button
                name="Delete"
                onHandleClick={onHandleDeleteById}
                itemID={item.id}
              />
              <Button
                name="Upvote"
                onHandleClick={onHandleUpVoteById}
                itemID={item.id}
              />
              <Button
                name="Downvote"
                onHandleClick={onHandleDownVoteById}
                itemID={item.id}
              />
              <Button
                name="Completed"
                onHandleClick={onHandleCompletById}
                itemID={item.id}
              />
              <Button
                name="Edit"
                onHandleClick={onHandleSelectEditById}
                itemID={item.id}
              />
            </div>
          )}
        </li>
      ))}
    </SimpleListStyled>
  ) : null;

export default SimpleList;
