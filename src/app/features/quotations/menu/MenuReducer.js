import {createSlice} from '@reduxjs/toolkit';

const SLICE_NAME = 'MENU';

const menuSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    name: '',
    quantity: 1,
    price: 0,
    courses: [],
  },
  reducers: {
    cleanData(state) {
      state.name = '';
      state.quantity = 1;
      state.price = 0;
      state.courses = [];
    },
    changeName(state, {payload: name}) {
      state.name = name;
    },
    changeQuantity(state, {payload: quantity}) {
      state.quantity = quantity;
    },
    addCourse(state, {payload: {courseTypeId, dishesIds, position}}) {
      state.courses.push({
        position: position,
        type: {id: courseTypeId},
        dishes: dishesIds.map(id => {
          return {id};
        }),
      });
    },
    removeCourse(state, {payload: {courseTypeId, position}}) {
      const newCourses = state.courses.filter(c => c.type.id !== courseTypeId);
      let decrement = 0;
      state.courses.filter(c => c.type.id === courseTypeId).sort((a, b) => a.position - b.position)
        .forEach(course => {
          if (course.position === position) {
            decrement = 1;
            return;
          }

          newCourses.push({...course, position: course.position - decrement});
        });

      state.courses = newCourses;
    },
    increasePrice(state, {payload: amount}) {
      state.price += amount;
    },
    decreasePrice(state, {payload: amount}) {
      state.price -= amount;
    },
    changeCoursesPosition(state, {payload: newCourses}) {
      const courseTypeId = newCourses[0] ? newCourses[0].type.id : undefined;
      const noSortedCourses = state.courses.filter(c => c.type.id !== courseTypeId);
      state.courses = [...noSortedCourses, ...newCourses];
    },
  },
});

export default menuSlice.reducer;
export const {
  cleanData, changeName, changeQuantity, addCourse, removeCourse, increasePrice, decreasePrice, changeCoursesPosition,
} = menuSlice.actions;