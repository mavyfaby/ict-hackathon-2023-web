import { defineStore } from "pinia";

/*
 * Global store
 */
const useStore = defineStore("global", () => {
  const dark = false;
  const title = "MentorMe";
  const challengeTitle = "";

  return {
    dark, title, challengeTitle
  };
});

export {
  useStore
};