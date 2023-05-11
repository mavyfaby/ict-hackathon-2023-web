import { useStore } from "../store";

/**
 * Set page title
 */
export function setTitle(title: string) {
  document.title = `${title === "Landing" ?  "" : title + " | " }MentorMe`;
  useStore().title = title === "Landing" ?  "MentorMe" : title;
}