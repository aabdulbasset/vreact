module.exports = {
  content: ["./src/*","./src/**/*"],
  theme: {

    extend: {
      colors: {
        'bgblue': '#ece8e1',
        'modelblue': '#364966',
        'pinky': '#dc3d4a',
        'mainbg':'#ece8e1'
      },
      gridTemplateColumns :{
        'flexible':'repeat(auto-fill,minmax(320px, 1fr))'
      }
    },
  },
  plugins: [],
}
