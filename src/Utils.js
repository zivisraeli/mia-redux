// =============================================================================
// cookie related functions
// =============================================================================
export const getCookie = (name) => {
  // since document.cookie returns all cookie, match would filter out the one I need.
  // the match regex: cookie name should follow an equal sign AND NOT a space of a semi-colon.
  // with 'capturing groups' we get an array with the array[0] is the entire expression value.
  // the rest of the values are the group's value.
  let value = document.cookie.match('(?:^|;)\\s?' + name + '=([^\\s;]*)');
  return value ? value[1] : null;
}

export const setCookie = (name, value, days = 365) => {
  let d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}