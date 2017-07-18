// Action Types
export const ADD_DUMMY: String = "ADD_TODO";

export type IActions = {
  ADD_TODO: { type: typeof ADD_DUMMY, payload: string },
};

export type IAction = IActions[keyof IActions];

// Action Creators
export const actionCreators = {
  addDummy: (payload: string) => ({
    type: ADD_DUMMY as typeof ADD_DUMMY,
    payload,
  }),
};