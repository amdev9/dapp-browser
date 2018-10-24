import { Feed } from './state';

const initialState: Feed = {
  items: []
};

export default function feed(state: Feed = initialState, action: any) { //@todo refactor: fix action type
  switch (action.type) {
    // case ACTION:

    default:
      return state;
  }
}
