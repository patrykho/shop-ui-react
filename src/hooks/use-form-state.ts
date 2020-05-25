import { useState, useCallback } from 'react';

const useFormState = (initialState: any) => {
  const [formState, setFormState] = useState(initialState);

  const setState = useCallback(
    (updatedState) => {
      setFormState((previousState: any) => ({
        ...previousState,
        ...updatedState,
      }));
    },
    [setFormState]
  );

  return [formState, setState];
};

export default useFormState;
