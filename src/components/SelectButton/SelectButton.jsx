
const SelectButton = ({ children, selected, onClick }) => {
  
    
    const selectbutton={
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      width:"22%",
    }


  return (
    <span onClick={onClick} style={selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;