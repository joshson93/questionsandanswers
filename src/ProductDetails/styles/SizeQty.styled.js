import styled from 'styled-components';

const StyledSizeQty = styled.div`
  margin: 0.3em 0 0 7em;

  select, button {
    background-color: #f1f2f6;
    margin-right: 0.5em;
    text-transform: uppercase;
    background-color: var(--bgc-0);
    box-shadow: 0.5px 0.5px 0.5px rgba(0,0,0,0.08);
  }

  select {
    padding: 1em 2em 1em 2.5em;
    -moz-appearance:none;
    -webkit-appearance:none;
    appearance:none;
  }

  select:hover {
    background-color: var(--accent-color);
  }

  p {
    color: red;
    font-size: 14px;
    display: inline-block;
    margin-bottom: 8px;
  }

  button:first-of-type {
    background-color: #2f3640;
    font-weight: 800;
    color: #fff;
    border-radius: 2%;
    transition: background-color 0.3s ease-in
  }

  button:first-of-type:hover {
    background-color: var(--accent-color);
  }

  button {
    margin-top: 8px;
    padding: 1.1em 2.5em 1.1em 2.5em;
  }

  button:last-child {
    padding: 1.1em 1.35em;
  }
`

export default StyledSizeQty;


