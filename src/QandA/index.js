import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../appState/index.js';
import styled from 'styled-components';
import QAList from './components/QAList';
import QuestionForm from './components/forms/QuestionForm';
import SuccessModal from './components/modals/SuccessModal';

let filteredResultslength;

export default function QAndA() {
  //central API state
  const [state] = useContext(StateContext);
  //state for toggling how many questions get showed and what gets filtered
  const [addMoreQuestionsNoSearch, setAddMoreQuestionsNoSearch] = useState(0);
  const [addQuestionsSearch, setAddQuestionsSearch] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [searchTextThere, setSearchTextThere] = useState(false);
  //state for form inputs
  const [createForm, setCreateForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setAddMoreQuestionsNoSearch(0);
    setAddQuestionsSearch(0);
    setCreateForm(false);
    setSearchText('');
  }, [state.currentProduct]);
  //these functions render 2 questions at a time
  const addQuestionsNoSearchHandler = () => {
    setAddMoreQuestionsNoSearch(addMoreQuestionsNoSearch + 2);
  };

  const addQuestionsSearchHandler = () => {
    setAddQuestionsSearch(addQuestionsSearch + 2);
  };
  //////////////////////////////////////////////////////////////////////////////////////////
  //uses text from search input to filter out results
  const searchTextHandler = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (searchText.trim().length > 1) {
      setSearchTextThere(true);
    } else {
      setSearchTextThere(false);
    }
  };
  ///////////////////////////////////////////////////////////////////////////
  //these functions render out each question & answer and conditionally renders "more answered questions button"
  const renderWhenSearchInput = () => {
    let filteredResults = state.QA.results.map(
      (q) =>
        q.question_body.toLowerCase().indexOf(searchText.toLowerCase()) > -1 && (
          <QAList highlight={searchText} key={q.question_id} q={q} />
        )
    );

    filteredResultslength = filteredResults.filter((val) => val !== false).length;
    let results = filteredResults.filter((val) => val !== false).slice(0, 2 + addQuestionsSearch);
    if (results.length) {
      if (filteredResultslength % 2 !== 0) {
        return <>{results}</>;
      }
      if (filteredResultslength % 2 === 0) {
        return <>{results}</>;
      }
    } else {
      return <NoMatchMessage>No match</NoMatchMessage>;
    }
  };

  const addMoreQuestionsButtonWhenSearchInput = () => {
    if (filteredResultslength % 2 === 0) {
      return (
        filteredResultslength > 2 &&
        addQuestionsSearch + 2 !== filteredResultslength && (
          <MoreAnsweredQuestionsButton onClick={addQuestionsSearchHandler}>
            More Answered Questions
          </MoreAnsweredQuestionsButton>
        )
      );
    }
    if (filteredResultslength % 2 !== 0) {
      return (
        filteredResultslength > 2 &&
        addQuestionsSearch + 1 !== filteredResultslength && (
          <MoreAnsweredQuestionsButton onClick={addQuestionsSearchHandler}>
            More Answered Questions
          </MoreAnsweredQuestionsButton>
        )
      );
    }
  };

  const renderWhenNoSearchInput = () => {
    let results = state.QA.results
      .slice(0, 2 + addMoreQuestionsNoSearch)
      .sort((a, b) => a.helpfulness - b.helpfulness)
      .map((q) => <QAList key={q.question_id} q={q} />);
    return results;
  };

  const addMoreQuestionsButtonWhenNoSearchInput = () => {
    let length = state.QA.results.length;
    if (length % 2 !== 0) {
      return (
        state.QA.results.length > 2 &&
        addMoreQuestionsNoSearch + 1 !== length && (
          <MoreAnsweredQuestionsButton onClick={addQuestionsNoSearchHandler}>
            More Answered Questions
          </MoreAnsweredQuestionsButton>
        )
      );
    }
    if (length % 2 === 0) {
      return (
        state.QA.results.length > 2 &&
        addMoreQuestionsNoSearch + 2 !== length && (
          <MoreAnsweredQuestionsButton onClick={addQuestionsNoSearchHandler}>
            More Answered Questions
          </MoreAnsweredQuestionsButton>
        )
      );
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //functions used for sending post requests for adding a question
  //toggles add question form
  const createQuestionForm = () => {
    setCreateForm(!createForm);
  };

  const backDropHandler = () => {
    setCreateForm(false);
  };

  const backDropSuccessHandler = () => {
    setShowModal(false);
  };

  const success = () => {
    setShowModal(true);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <EntireQuestionsContainer data-testid='QandA'>
      <EntireQuestionsWrapper>
        <QAHeader>Questions & Answers:</QAHeader>
        <SearchBar
          type='search'
          value={searchText}
          onChange={searchTextHandler}
          placeholder='Have a question? Search for answers...'
        />
        <EntireQAndAContainer>
          {/* RENDERS WHEN USER STARTS SEARCHING */}
          {searchTextThere && state.QA && renderWhenSearchInput()}

          {/* IF NOT SEARCH VALUE RENDER BOTTOM */}
          {!searchTextThere && state.QA && renderWhenNoSearchInput()}
          {state.QA.results.length === 0 && (
            <NoMatchMessage>There are no questions here. Add one!</NoMatchMessage>
          )}
        </EntireQAndAContainer>

        {!searchTextThere &&
          state.QA &&
          state.QA.results.length > 2 &&
          addMoreQuestionsButtonWhenNoSearchInput()}
        {searchTextThere && state.QA.results.length > 2 && addMoreQuestionsButtonWhenSearchInput()}
        <AddQuestionButton onClick={createQuestionForm}>Add A Question</AddQuestionButton>
      </EntireQuestionsWrapper>

      {createForm && (
        <BackDrop onClick={backDropHandler}>
          <QuestionForm success={success} showForm={setCreateForm} />
        </BackDrop>
      )}

      {showModal && (
        <BackDrop onClick={backDropSuccessHandler}>
          <SuccessModal />
        </BackDrop>
      )}
    </EntireQuestionsContainer>
  );
}

const QAHeader = styled.h1`
  font-size: var(--fs3);
  color: var(--header-fc);
`;

const SearchBar = styled.input`
  border: 2px solid black;
  display: block;
  margin-top: 25px;
  padding: 15px;
  width: var(--searchBar-width);
  font-size: 20px;
`;

const EntireQuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2em;
  padding-bottom: 4em;
`;

const EntireQAndAContainer = styled.div`
  height: auto;
  max-height: 500px !important;
  overflow: auto;
  position: relative;
`;

const EntireQuestionsWrapper = styled.div`
  display: inline;
  width: var(--module-width);
  padding: 1em;
  background-color: var(--contain-bgc);
`;

const AddQuestionButton = styled.button`
  cursor: pointer;
  margin: 15px;
  float: left;
  font-size: 16px;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  &:active {
    transform: translateY(6px);
  }
  &:hover {
    background-color: #b5b5b5;
    transition: 0.7s ease-in-out;
  }
`;

const MoreAnsweredQuestionsButton = styled.button`
  cursor: pointer;
  margin: 15px;
  float: left;
  font-size: 16px;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  &:active {
    transform: translateY(6px);
  }
  &:hover {
    background-color: #b5b5b5;
    transition: 0.7s ease-in-out;
  }
`;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.75);
`;

const NoMatchMessage = styled.p`
  margin-top: 25px;
  text-align: center;
`;
