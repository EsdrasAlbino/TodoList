//This component is recommended build with other techoonologies like styled-components, because the variations of the title can be more complex and styled-components can help to build this variations in a more organized way.

// Other point to consider is i use spreed operation in props to no repeat prop per prop in h1, h2 and h3 tags.

// Component build with styled-components
/*

export const Title = ({
  variant,
  color,
  textAlign,
  fontWeight,
  children,
  ...props
}) => {
  return (
    <TitleStyled
      variant={variant}
      color={color}
      textAlign={textAlign}
      fontWeight={fontWeight}
      {...props}>
      {children}
    </TitleStyled>
  )
}

export const TitleStyled = styled.h1<TitleProps>`
  ${({ variant, color, fontWeight, textAlign }) => css`
    color: ${color ? color : '#626262'};
    margin: 0;
    text-align: ${textAlign};
    font-weight: ${fontWeight === 'semibold'
      ? theme.font.weight.semiBold
      : theme.font.weight.medium};
    font-family: ${theme.font.family.brand};
    ${variant === 'h1' && h1}
    ${variant === 'h2' && h2}
    ${variant === 'h3' && h3}
  `}
`
*/
export const Title = ({ variant, children, ...props }) => {
  return (
    <>
      {variant === "h1" && <h1 {...props}>{children}</h1>}
      {variant === "h2" && <h2 {...props}>{children}</h2>}
      {variant === "h3" && <h3 {...props}>{children}</h3>}
    </>
  );
};
