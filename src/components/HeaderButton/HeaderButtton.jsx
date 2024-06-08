const HeaderButton = ({
  children,
  type = 'click',
  className,
  handlerClick,
}) => {
  return (
    <button type={type} className={className} onClick={handlerClick}>
      {children}
    </button>
  );
};

export default HeaderButton;
