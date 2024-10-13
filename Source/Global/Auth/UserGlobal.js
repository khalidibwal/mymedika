import { atom } from 'recoil';

 const userState = atom({
  key: 'userState', // Unique ID for this atom
  default: null,    // Default value (initial value)
});

export {
    userState
}