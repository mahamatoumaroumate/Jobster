# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

-debounce
const debounce = () => {
let timeoutID
return (e) => {
setLocalSearch(e.target.value)
clearTimeout(timeoutID)
timeoutID = setTimeout(() => {
dispatch(handleChange({ name: e.target.name, value: e.target.value }))
}, 1000)
}
}
const optimizedDebounce = useMemo(() => debounce(), [])

-recharts is a library for chart Graphic
