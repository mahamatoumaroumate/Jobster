export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}
export const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null
}
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
}
