import { atom } from 'recoil';

export const complaintState = atom({
  key: 'complaintState',
  default: '',
});

export const allergyState = atom({
  key: 'allergyState',
  default: '',
});

export const doctorDataState = atom({
    key: 'doctorDataState',
    default:{}
})

export const bookTimeSelected = atom({
  key:'bookTimeSelected',
  default:{}
})