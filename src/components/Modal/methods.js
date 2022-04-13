
export const checkModalState = (childBool, modalOpen, setModalOpen, fadeTime) => {

  if (childBool) {
    if (!modalOpen) {
      setModalOpen(true)
    }
  } else {
    if (modalOpen) {
      setTimeout(() => {
        setModalOpen(false)
      }, fadeTime)
    }
  }
}

export const toggleModal = (dispatch, modalKey) => {
  dispatch({
    type: 'TOGGLE_MODAL',
    payload: modalKey
  })
}



