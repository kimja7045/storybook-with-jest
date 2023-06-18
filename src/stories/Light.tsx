import styled from '@emotion/styled';

type VariantType = 'green' | 'yellow' | 'red';

type Props = {
  variant: VariantType;
};

const Light = ({ variant = 'green' }: Props) => {
  return <Round variant={variant} />;
};

export default Light;

const Round = styled.div<{ variant: VariantType }>`
  background: ${(props) => props.variant};
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
